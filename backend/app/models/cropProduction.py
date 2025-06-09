import pandas as pd
import numpy as np
import os
import pickle

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OneHotEncoder
from category_encoders.target_encoder import TargetEncoder

# Load dataset
csv_path = os.path.join(os.path.dirname(__file__), '../datasets/Crop Prediction dataset.csv')
df = pd.read_csv(csv_path)

# Clean data
df.dropna(inplace=True)
df = df[df['Production'] > 0]

# Remove outliers using IQR
Q1 = df['Production'].quantile(0.25)
Q3 = df['Production'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
df = df[(df['Production'] >= lower_bound) & (df['Production'] <= upper_bound)]

print(f"✅ Cleaned dataset shape: {df.shape}")
print(f"Production range: {df['Production'].min():.2f} to {df['Production'].max():.2f}")

# Features and target
X = df[['Area', 'Crop', 'State_Name', 'District_Name', 'Season']]
y = df['Production'] / df['Area']  # Yield per hectare

categorical_cols = ['Crop', 'State_Name', 'District_Name', 'Season']
numeric_cols = ['Area']

# Preprocessor using Target Encoding
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', TargetEncoder(), categorical_cols),
        ('num', StandardScaler(), numeric_cols)
    ]
)

# Pipeline with optimized Random Forest
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(
        n_estimators=50,
        max_depth=15,
        max_features='sqrt',
        n_jobs=-1,
        random_state=42
    ))
])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("\n✅ Model Performance:")
print(f"Mean Absolute Error: {mae:.2f}")
print(f"R² Score: {r2:.4f}")

# Negative predictions check
negative_preds = y_pred[y_pred < 0]
print(f"Number of negative predictions: {len(negative_preds)}")

# Save model
model_path = os.path.join(os.path.dirname(__file__), 'productionmodel.pkl')
pickle.dump(pipeline, open(model_path, 'wb'))
print("✅ Model saved as 'productionmodel.pkl'")

# Wrapper for safe prediction
class ProductionPredictor:
    def __init__(self, model):
        self.model = model
    
    def predict(self, X):
        predictions = self.model.predict(X)
        return np.maximum(predictions, 0)
    
    def predict_single(self, area, crop, state, district, season):
        input_data = pd.DataFrame({
            'Area': [area],
            'Crop': [crop],
            'State_Name': [state],
            'District_Name': [district],
            'Season': [season]
        })
        yield_per_hectare = self.predict(input_data)[0]
        total_production = yield_per_hectare * area
        return max(0, yield_per_hectare), max(0, total_production)

# Save predictor wrapper
predictor = ProductionPredictor(pipeline)
predictor_path = os.path.join(os.path.dirname(__file__), 'production_predictor.pkl')
pickle.dump(predictor, open(predictor_path, 'wb'))
print("✅ Wrapper saved as 'production_predictor.pkl'")

# Example predictions
print("\n=== Example Predictions ===")
sample_data = X_test.head(5)
raw_predictions = pipeline.predict(sample_data)
constrained_predictions = predictor.predict(sample_data)

for i in range(len(raw_predictions)):
    print(f"\nSample {i+1}:")
    print(f"  Raw prediction: {raw_predictions[i]:.2f}")
    print(f"  Constrained prediction: {constrained_predictions[i]:.2f}")
    print(f"  Actual value: {y_test.iloc[i]:.2f}")
