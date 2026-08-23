import joblib
import pandas as pd

# Load saved model and preprocessor
model = joblib.load("models/best_model.pkl")
preprocessor = joblib.load("models/preprocessor.pkl")

# Example input
sample = pd.DataFrame([{
    "country": "India",
    "year": 2020,
    "tourism_arrivals": 5000000,
    "tourism_exports": 10.0,
    "tourism_expenditures": 8.0,
    "gdp": 2.6e12,
    "inflation": 6.0
}])

# Transform input
sample_encoded = preprocessor.transform(sample)

# Predict
prediction = model.predict(sample_encoded)

print("\n==========================================")
print("MODEL TEST")
print("==========================================")
print("Predicted Tourism Receipts:", prediction[0])