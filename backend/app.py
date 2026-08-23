from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import os


# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI(
    title="Tourism Prediction API",
    description="API for predicting tourism receipts",
    version="1.0.0"
)


# ==========================================
# ENABLE CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# PATHS
# ==========================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "best_model.pkl"
)

PREPROCESSOR_PATH = os.path.join(
    BASE_DIR,
    "models",
    "preprocessor.pkl"
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "raw",
    "world_tourism_economy_data.csv"
)


# ==========================================
# LOAD MODEL AND PREPROCESSOR
# ==========================================

model = joblib.load(MODEL_PATH)
preprocessor = joblib.load(PREPROCESSOR_PATH)


# ==========================================
# LOAD DATASET
# ==========================================

df = pd.read_csv(DATA_PATH)


# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():
    return {
        "message": "Tourism Prediction API is running"
    }


# ==========================================
# HELPER FUNCTION
# ==========================================

def get_country_prediction(country):

    country_data = df[
        df["country"] == country
    ].copy()

    if country_data.empty:
        return None

    # Sort by year
    country_data = country_data.sort_values("year")

    # Get latest available record
    latest = country_data.iloc[-1]

    # Create model input
    input_data = pd.DataFrame([{
        "country": country,
        "year": latest["year"],
        "tourism_arrivals": latest["tourism_arrivals"],
        "tourism_exports": latest["tourism_exports"],
        "tourism_expenditures": latest["tourism_expenditures"],
        "gdp": latest["gdp"],
        "inflation": latest["inflation"]
    }])

    # Numerical columns
    numeric_columns = [
        "tourism_arrivals",
        "tourism_exports",
        "tourism_expenditures",
        "gdp",
        "inflation"
    ]

    # Fill missing values
    for column in numeric_columns:

        if pd.isna(input_data.loc[0, column]):

            input_data.loc[0, column] = df[
                column
            ].median()

    # Apply preprocessing
    input_encoded = preprocessor.transform(
        input_data
    )

    # Make prediction
    prediction = model.predict(
        input_encoded
    )[0]

    return {
    "country": country,
    "year_used": int(latest["year"]),
    "predictedReceipts": float(prediction),

    "tourismArrivals": float(input_data.loc[0, "tourism_arrivals"]),
    "tourismExpenditures": float(input_data.loc[0, "tourism_expenditures"]),
    "gdp": float(input_data.loc[0, "gdp"]),

    "model": "Random Forest"
}

# ==========================================
# PREDICTION
# ==========================================

@app.post("/predict")
def predict(data: dict):

    country = data["country"]

    result = get_country_prediction(
        country
    )

    if result is None:

        return {
            "error": f"No data available for {country}"
        }

    return result


# ==========================================
# COUNTRY COMPARISON
# ==========================================

@app.post("/compare")
def compare(data: dict):

    country_a = data["country_a"]
    country_b = data["country_b"]

    # Get predictions
    result_a = get_country_prediction(
        country_a
    )

    result_b = get_country_prediction(
        country_b
    )

    # Check country A
    if result_a is None:

        return {
            "error": f"No data available for {country_a}"
        }

    # Check country B
    if result_b is None:

        return {
            "error": f"No data available for {country_b}"
        }

    # Compare predictions
    if (
        result_a["predictedReceipts"]
        > result_b["predictedReceipts"]
    ):

        summary = (
            f"{country_a} has the higher "
            "predicted tourism receipts."
        )

    elif (
        result_b["predictedReceipts"]
        > result_a["predictedReceipts"]
    ):

        summary = (
            f"{country_b} has the higher "
            "predicted tourism receipts."
        )

    else:

        summary = (
            "Both countries have the same "
            "predicted tourism receipts."
        )

    return {
    "country_a": result_a,
    "country_b": result_b,
    "summary": summary,
    "model": "Random Forest"
}