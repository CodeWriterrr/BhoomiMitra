from flask import Flask, request, render_template, jsonify
import base64
#from fastapi import FastAPI, UploadFile, File, HTTPException
import pickle
import numpy as np
from flask_cors import CORS
import os
import pandas as pd
import requests
from dotenv import load_dotenv



load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY_CHAT = os.getenv("API_KEY_CHAT")
API_URL_CHAT = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={API_KEY_CHAT}"


API_KEY = os.getenv("API_KEY")

KINDWISE_URL = "https://insect.kindwise.com/api/v1/identification?details=url,common_names"

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

model_path = os.path.join(os.path.dirname(__file__), 'models', 'productionmodel.pkl')
model = pickle.load(open(model_path, 'rb'))


def call_gemini_api(input_text):
    headers = { "Content-Type": "application/json" }
    body = {
        "contents": [ { "parts": [ { "text": input_text } ] } ]
    }

    try:
        response = requests.post(API_URL_CHAT, headers=headers, json=body)
        response.raise_for_status()
        data = response.json()
        if "candidates" in data and data["candidates"]:
            return data["candidates"][0]["content"]["parts"][0]["text"].strip()
        else:
            return "No response from Gemini API"
    except requests.exceptions.RequestException as e:
        print("Error calling Gemini API:", e)
        return "Error communicating with Gemini API"
    

@app.route("/ask-gemini", methods=["POST"])
def ask_gemini():
    data = request.get_json()
    if not data or "prompt" not in data:
        return jsonify({"error": "Missing 'prompt' in request body"}), 400

    prompt = data["prompt"]
    result = call_gemini_api(prompt)
    return jsonify({"response": result})



@app.route('/identify', methods=['POST'])
def identify_insect():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        image = request.files['image']
        b64_image = base64.b64encode(image.read()).decode("utf-8")

        payload = {
            "images": [b64_image],
            "similar_images": True
        }

        headers = {
            "Content-Type": "application/json",
            "Api-Key": API_KEY
        }

        response = requests.post(KINDWISE_URL, headers=headers, json=payload)

        if response.status_code != 200:
            return response.text, response.status_code  # No jsonify, pass as is

        # ✅ Directly return the parsed JSON response without nesting
        return response.json(), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.route('/weather')
def get_weather():
    city = request.args.get('location', 'Bareilly')
    api_key = "3582913f081af70564f5d6932d35d496"
    current_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"

    try:
        current_data = requests.get(current_url).json()
        forecast_data = requests.get(forecast_url).json()

        # Group forecast by date
        from collections import defaultdict
        from datetime import datetime

        daily = defaultdict(list)
        for item in forecast_data['list']:
            date = item['dt_txt'].split(' ')[0]
            daily[date].append(item)

        forecast = []
        for i, (date, items) in enumerate(daily.items()):
            if i == 5: break  # limit to 5 days
            temps = [entry['main']['temp'] for entry in items]
            conditions = [entry['weather'][0]['description'] for entry in items]
            icons = [entry['weather'][0]['main'].lower().replace(" ", "-") for entry in items]
            rain = [entry.get('pop', 0) * 100 for entry in items]

            forecast.append({
                "day": datetime.strptime(date, "%Y-%m-%d").strftime("%A"),
                "high": max(temps),
                "low": min(temps),
                "condition": max(set(conditions), key=conditions.count),
                "icon": max(set(icons), key=icons.count),
                "precipitation": round(sum(rain) / len(rain), 2)
            })

        return jsonify({
            "location": f"{current_data['name']}, {current_data['sys']['country']}",
            "current": {
                "temperature": current_data["main"]["temp"],
                "humidity": current_data["main"]["humidity"],
                "windSpeed": current_data["wind"]["speed"],
                "visibility": current_data.get("visibility", 0) / 1000,
                "pressure": current_data["main"]["pressure"],
                "condition": current_data["weather"][0]["description"].capitalize(),
                "icon": current_data["weather"][0]["main"].lower().replace(" ", "-")
            },
            "forecast": forecast
        })

    except Exception as e:
        return jsonify({"error": str(e)})






@app.route('/alerts')
def get_alerts():
    return jsonify([
        {
            "id": 1,
            "type": "severe",
            "title": "Rainfall Advisory",
            "description": "Heavy rainfall expected in the area.",
            "timestamp": "1 hour ago",
            "duration": "Next 6 hours",
            "impact": "Delays in agricultural activities likely"
        },
        {
            "id": 2,
            "type": "moderate",
            "title": "High Humidity",
            "description": "Humidity levels above 85%",
            "timestamp": "3 hours ago",
            "duration": "Next 24 hours",
            "impact": "Possible fungal risk to crops"
        }
    ])



@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Extract values from JSON
    input_dict = {
        'Area': [float(data['area'])],
        'Crop': [data['crop']],
        'State_Name': [data['state']],
        'District_Name': [data['district']],
        'Season': [data['season']]
    }

    # Convert to DataFrame (with correct column names)
    input_df = pd.DataFrame(input_dict)

    # Predict using model
    yield_per_hectare = model.predict(input_df)[0] * 10
    total_production = yield_per_hectare * float(data['area'])


    return jsonify({
        'predicted_production': round(yield_per_hectare, 2),
        'total_production': round(total_production, 2)
    })


@app.route('/predictprice', methods=['POST'])
def predict_crop_production():
    try:
        data = request.get_json()
        
        

        # Format input for prediction
        input_df = pd.DataFrame([{
    'Crop_Year': data['Crop_Year'],
    'Crop': data['Crop'],
    'Season': data['Season'],
    'Area': data['Area'],
    'State_Name': data['State_Name'],
    'District_Name': data['District_Name']
}])


        # Predict
        prediction = model.predict(input_df)[0]
        return jsonify({
            'predicted_production': round(prediction, 2)
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/test')
def test():
    return "Backend is working!"


if __name__ == '__main__':
    app.run(debug=True)
