import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

# ==========================================
# 1. LOAD RAW DATASET
# ==========================================

file_path = "data/raw/world_tourism_economy_data.csv"
df = pd.read_csv(file_path)

print("\n--- RAW DATASET ---")
print("Shape:", df.shape)
print("Columns:", df.columns.tolist())


# ==========================================
# 2. REMOVE UNNECESSARY / HIGHLY INCOMPLETE COLUMNS
# ==========================================

df = df.drop(columns=["country_code", "tourism_departures", "unemployment"])

print("\n--- AFTER COLUMN REMOVAL ---")
print("Shape:", df.shape)
print("Columns:", df.columns.tolist())


# ==========================================
# 3. REMOVE ROWS WHERE TARGET IS MISSING
# ==========================================

df = df.dropna(subset=["tourism_receipts"])

print("\n--- AFTER REMOVING MISSING TARGET ---")
print("Shape:", df.shape)
print("Missing tourism_receipts:", df["tourism_receipts"].isnull().sum())


# ==========================================
# 4. SEPARATE FEATURES AND TARGET
# ==========================================

X = df.drop(columns=["tourism_receipts"])
y = df["tourism_receipts"]

print("\n--- FEATURES AND TARGET ---")
print("Features:", X.columns.tolist())
print("Target:", y.name)
print("X shape:", X.shape)
print("y shape:", y.shape)


# ==========================================
# 5. TRAIN / TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("\n--- TRAIN / TEST SPLIT ---")
print("X_train:", X_train.shape)
print("X_test:", X_test.shape)
print("y_train:", y_train.shape)
print("y_test:", y_test.shape)


# ==========================================
# 6. HANDLE MISSING NUMERICAL FEATURES
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

print("\n--- MISSING VALUES AFTER IMPUTATION ---")
print("X_train:")
print(X_train.isnull().sum())

print("\nX_test:")
print(X_test.isnull().sum())


# ==========================================
# 7. BASIC CHECK
# ==========================================

print("\n--- FINAL TRAINING DATA ---")
print(X_train.head())

print("\n--- FINAL TESTING DATA ---")
print(X_test.head())

# ==========================================
# 8. ENCODE COUNTRY
# ==========================================

categorical_columns = ["country"]

preprocessor = ColumnTransformer(
    transformers=[
        ("country", OneHotEncoder(handle_unknown="ignore"), categorical_columns)
    ],
    remainder="passthrough"
)

# Fit encoder only on training data
X_train_encoded = preprocessor.fit_transform(X_train)

# Transform test data using the same encoder
X_test_encoded = preprocessor.transform(X_test)

print("\n--- AFTER COUNTRY ENCODING ---")
print("X_train encoded shape:", X_train_encoded.shape)
print("X_test encoded shape:", X_test_encoded.shape)