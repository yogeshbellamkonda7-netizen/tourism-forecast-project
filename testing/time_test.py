import pandas as pd

from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


# ==========================================
# 1. LOAD DATA
# ==========================================

file_path = "data/raw/world_tourism_economy_data.csv"
df = pd.read_csv(file_path)


# ==========================================
# 2. SAME CLEANING
# ==========================================

df = df.drop(columns=[
    "country_code",
    "tourism_departures",
    "unemployment"
])

df = df.dropna(subset=["tourism_receipts"])


# ==========================================
# 3. TIME-BASED SPLIT
# ==========================================

# Training: up to 2016
# Testing: 2017 onwards

train_df = df[df["year"] <= 2016].copy()
test_df = df[df["year"] >= 2017].copy()

print("\n--- TIME-BASED SPLIT ---")
print("Training years:", train_df["year"].min(), "to", train_df["year"].max())
print("Testing years:", test_df["year"].min(), "to", test_df["year"].max())
print("Training rows:", len(train_df))
print("Testing rows:", len(test_df))


# ==========================================
# 4. FEATURES AND TARGET
# ==========================================

X_train = train_df.drop(columns=["tourism_receipts"])
y_train = train_df["tourism_receipts"]

X_test = test_df.drop(columns=["tourism_receipts"])
y_test = test_df["tourism_receipts"]


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


print("\n--- ENCODED DATA ---")
print("X_train:", X_train_encoded.shape)
print("X_test:", X_test_encoded.shape)


# ==========================================
# 7. TRAIN RANDOM FOREST
# ==========================================

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

print("\n--- TRAINING RANDOM FOREST ---")

model.fit(X_train_encoded, y_train)


# ==========================================
# 8. PREDICTIONS
# ==========================================

predictions = model.predict(X_test_encoded)


# ==========================================
# 9. EVALUATION
# ==========================================

mae = mean_absolute_error(y_test, predictions)

rmse = mean_squared_error(
    y_test,
    predictions
) ** 0.5

r2 = r2_score(y_test, predictions)


print("\n==========================================")
print("TIME-BASED MODEL EVALUATION")
print("==========================================")

print(f"MAE : {mae:,.2f}")
print(f"RMSE: {rmse:,.2f}")
print(f"R²  : {r2:.4f}")