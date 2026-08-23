import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor


# ==========================================
# 1. LOAD DATA
# ==========================================

file_path = "data/raw/world_tourism_economy_data.csv"
df = pd.read_csv(file_path)


# ==========================================
# 2. CLEAN DATA
# ==========================================

df = df.drop(columns=[
    "country_code",
    "tourism_departures",
    "unemployment"
])

df = df.dropna(subset=["tourism_receipts"])


# ==========================================
# 3. FEATURES AND TARGET
# ==========================================

X = df.drop(columns=["tourism_receipts"])
y = df["tourism_receipts"]


# ==========================================
# 4. TRAIN / TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# ==========================================
# 5. MISSING VALUES
# ==========================================

numeric_columns = [
    "tourism_arrivals",
    "tourism_exports",
    "tourism_expenditures",
    "gdp",
    "inflation"
]

for column in numeric_columns:

    median_value = X_train[column].median()

    X_train[column] = X_train[column].fillna(median_value)
    X_test[column] = X_test[column].fillna(median_value)


# ==========================================
# 6. COUNTRY ENCODING
# ==========================================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "country",
            OneHotEncoder(handle_unknown="ignore"),
            ["country"]
        )
    ],
    remainder="passthrough"
)


X_train_encoded = preprocessor.fit_transform(X_train)


# ==========================================
# 7. TRAIN RANDOM FOREST
# ==========================================

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train_encoded, y_train)


# ==========================================
# 8. SAVE MODEL AND PREPROCESSOR
# ==========================================

joblib.dump(model, "models/best_model.pkl")
joblib.dump(preprocessor, "models/preprocessor.pkl")

print("\n==========================================")
print("MODEL SAVED SUCCESSFULLY")
print("==========================================")

print("Model: models/best_model.pkl")
print("Preprocessor: models/preprocessor.pkl")