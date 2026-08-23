import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv("data/raw/world_tourism_economy_data.csv")

# -------------------------------
# 1. Basic Dataset Information
# -------------------------------

print("\n--- Dataset Shape ---")
print(df.shape)

print("\n--- Columns ---")
print(df.columns.tolist())

print("\n--- First 5 Rows ---")
print(df.head())

print("\n--- Dataset Information ---")
print(df.info())

print("\n--- Statistical Summary ---")
print(df.describe())

# -------------------------------
# 2. Missing Values
# -------------------------------

print("\n--- Missing Values ---")
print(df.isnull().sum())

# -------------------------------
# 3. Duplicate Values
# -------------------------------

print("\n--- Duplicate Rows ---")
print(df.duplicated().sum())

# -------------------------------
# 4. Tourism Receipts Distribution
# -------------------------------

# -------------------------------
# 4. Tourism Receipts Distribution
# -------------------------------

plt.figure(figsize=(8, 5))

sns.histplot(
    df["tourism_receipts"].dropna(),
    kde=True
)

plt.title("Distribution of Tourism Receipts")
plt.xlabel("Tourism Receipts")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()


# -------------------------------
# 5. Tourism Arrivals vs Receipts
# -------------------------------

plt.figure(figsize=(8, 5))

sns.scatterplot(
    data=df,
    x="tourism_arrivals",
    y="tourism_receipts"
)

plt.title("Tourism Arrivals vs Tourism Receipts")
plt.xlabel("Tourism Arrivals")
plt.ylabel("Tourism Receipts")
plt.tight_layout()
plt.show()


# -------------------------------
# 6. Tourism Expenditures vs Receipts
# -------------------------------

plt.figure(figsize=(8, 5))

sns.scatterplot(
    data=df,
    x="tourism_expenditures",
    y="tourism_receipts"
)

plt.title("Tourism Expenditures vs Tourism Receipts")
plt.xlabel("Tourism Expenditures")
plt.ylabel("Tourism Receipts")
plt.tight_layout()
plt.show()


# -------------------------------
# 7. GDP vs Tourism Receipts
# -------------------------------

plt.figure(figsize=(8, 5))

sns.scatterplot(
    data=df,
    x="gdp",
    y="tourism_receipts"
)

plt.title("GDP vs Tourism Receipts")
plt.xlabel("GDP")
plt.ylabel("Tourism Receipts")
plt.tight_layout()
plt.show()


# -------------------------------
# 8. Correlation Heatmap
# -------------------------------

numeric_df = df.select_dtypes(include="number")

plt.figure(figsize=(10, 7))

sns.heatmap(
    numeric_df.corr(),
    annot=True,
    cmap="coolwarm",
    fmt=".2f"
)

plt.title("Correlation Heatmap")
plt.tight_layout()
plt.show()