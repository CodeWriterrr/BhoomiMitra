
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
    prediction = model.predict(input_df)[0]
    predicted_value = model.predict(input_df)[0]
    predicted_value = max(predicted_value, 0.0)


    return jsonify({'predicted_production': round(predicted_value, 2)})

