import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


# ==========================================
# 1. LOAD DATA
# ==========================================

file_path = "data/raw/world_tourism_economy_data.csv"
df = pd.read_csv(file_path)


# ==========================================
# 2. SAME PREPROCESSING AS preprocessing.py
# ==========================================

df = df.drop(columns=[
    "country_code",
    "tourism_departures",
    "unemployment"
])

df = df.dropna(subset=["tourism_receipts"])


# ==========================================
# 3. SEPARATE FEATURES AND TARGET
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
# 5. HANDLE MISSING VALUES
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
# 6. ENCODE COUNTRY
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
X_test_encoded = preprocessor.transform(X_test)


print("\n--- DATA READY FOR TRAINING ---")
print("X_train:", X_train_encoded.shape)
print("X_test:", X_test_encoded.shape)


# ==========================================
# 7. CREATE MODELS
# ==========================================

models = {
    "Linear Regression": LinearRegression(),
    "Random Forest": RandomForestRegressor(
        n_estimators=100,
        random_state=42,
        n_jobs=-1
    ),
    "Gradient Boosting": GradientBoostingRegressor(
        n_estimators=100,
        random_state=42
    )
}


# ==========================================
# 8. TRAIN AND EVALUATE MODELS
# ==========================================

results = {}

for name, model in models.items():

    print(f"\n--- TRAINING {name} ---")

    model.fit(X_train_encoded, y_train)

    predictions = model.predict(X_test_encoded)

    mae = mean_absolute_error(y_test, predictions)
    rmse = mean_squared_error(
        y_test,
        predictions
    ) ** 0.5
    r2 = r2_score(y_test, predictions)

    results[name] = {
        "MAE": mae,
        "RMSE": rmse,
        "R2": r2
    }

    print("MAE :", mae)
    print("RMSE:", rmse)
    print("R²  :", r2)


# ==========================================
# 9. COMPARE MODELS
# ==========================================

print("\n==========================================")
print("MODEL COMPARISON")
print("==========================================")

for name, metrics in results.items():

    print(f"\n{name}")
    print(f"MAE : {metrics['MAE']:.2f}")
    print(f"RMSE: {metrics['RMSE']:.2f}")
    print(f"R²  : {metrics['R2']:.4f}")