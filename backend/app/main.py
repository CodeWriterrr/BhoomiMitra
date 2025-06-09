from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import os
import pandas as pd


app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.path.dirname(__file__), 'models', 'productionmodel.pkl')
model = pickle.load(open(model_path, 'rb'))

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



@app.route('/test')
def test():
    return "Backend is working!"


if __name__ == '__main__':
    app.run(debug=True)
