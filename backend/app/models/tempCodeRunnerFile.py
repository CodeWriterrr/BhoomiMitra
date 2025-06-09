import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import numpy as np
import pickle
import os

# Load the dataset
csv_path = os.path.join(os.path.dirname(__file__), '../datasets/Crop Prediction dataset.csv')
df = pd.read_csv(csv_path)

# Drop missing values
df.dropna(inplace=True)

# Remove outliers (optional but recommended)
# Remove rows where Production is 0 or negative (if any)
df = df[df['Production'] > 0]

# Remove extreme outliers using IQR method
Q1 = df['Production'].quantile(0.25)
Q3 = df['Production'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
df = df[(df['Production'] >= lower_bound) & (df['Production'] <= upper_bound)]

print(f"Dataset shape after cleaning: {df.shape}")
print(f"Production range: {df['Production'].min():.2f} to {df['Production'].max():.2f}")

# Select features and target
X = df[['Area', 'Crop', 'State_Name', 'District_Name', 'Season']]
y = df['Production']

# Identify categorical and numerical columns
categorical_cols = ['Crop', 'State_Name', 'District_Name', 'Season']
numeric_cols = ['Area']

# Define column transformer with scaling for numeric features
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols),
        ('num', StandardScaler(), numeric_cols)  # Scale numeric features
    ]
)

# Create pipeline
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', LinearRegression())
])

# Split data for evaluation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
pipeline.fit(X_train, y_train)

# Evaluate the model
y_pred = pipeline.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Model Performance:")
print(f"Mean Absolute Error: {mae:.2f}")
print(f"R² Score: {r2:.4f}")

# Check for negative predictions
negative_preds = y_pred[y_pred < 0]
print(f"Number of negative predictions: {len(negative_preds)}")
if len(negative_preds) > 0:
    print(f"Range of negative predictions: {negative_preds.min():.2f} to {negative_preds.max():.2f}")

# Save the model
model_path = os.path.join(os.path.dirname(__file__), 'productionmodel.pkl')
pickle.dump(pipeline, open(model_path, 'wb'))

print("✅ Model trained and saved successfully!")

# Custom prediction function that ensures non-negative results
class ProductionPredictor:
    def __init__(self, model):
        self.model = model
    
    def predict(self, X):
        predictions = self.model.predict(X)
        # Ensure predictions are non-negative
        return np.maximum(predictions, 0)  # Replace negative values with 0
    
    def predict_single(self, area, crop, state, district, season):
        """Predict production for a single input"""
        input_data = pd.DataFrame({
            'Area': [area],
            'Crop': [crop],
            'State_Name': [state],
            'District_Name': [district],
            'Season': [season]
        })
        prediction = self.predict(input_data)[0]
        return max(0, prediction)  # Ensure non-negative

# Create and save the wrapper
predictor = ProductionPredictor(pipeline)
predictor_path = os.path.join(os.path.dirname(__file__), 'production_predictor.pkl')
pickle.dump(predictor, open(predictor_path, 'wb'))

print("✅ Production predictor with non-negative constraints saved!")

# Example usage
print("\n=== Example Predictions ===")
sample_data = X_test.head(5)
raw_predictions = pipeline.predict(sample_data)
constrained_predictions = predictor.predict(sample_data)

for i in range(len(raw_predictions)):
    print(f"Sample {i+1}:")
    print(f"  Raw prediction: {raw_predictions[i]:.2f}")
    print(f"  Constrained prediction: {constrained_predictions[i]:.2f}")
    print(f"  Actual value: {y_test.iloc[i]:.2f}")
    print()