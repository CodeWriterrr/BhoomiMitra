import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, r2_score
import pickle

# Load dataset
file_path = "backend/app/datasets/AgrcultureDataset.csv"
df = pd.read_csv(file_path)

# Drop rows with missing or invalid production values
df['Production'] = pd.to_numeric(df['Production'], errors='coerce')
df.dropna(subset=['Production'], inplace=True)

# Select features and target
X = df[['Crop_Year', 'Season', 'Crop', 'Area']]
y = df['Production']

# OneHot encode 'Season' and 'Crop'
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['Season', 'Crop'])
    ],
    remainder='passthrough'
)

# Build pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', LinearRegression())
])

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"✅ Model trained successfully!")
print(f"📈 Mean Absolute Error: {mae:.2f}")
print(f"📊 R² Score: {r2:.4f}")

# Save the trained model to file
with open('backend/app/train/crop_production_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("📦 Model saved to 'crop_production_model.pkl'")
