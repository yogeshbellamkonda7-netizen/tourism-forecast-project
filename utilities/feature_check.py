import pandas as pd

# Load dataset
file_path = "data/raw/world_tourism_economy_data.csv"
df = pd.read_csv(file_path)

# Same cleaning
df = df.drop(columns=[
    "country_code",
    "tourism_departures",
    "unemployment"
])

# Keep only rows with target
df = df.dropna(subset=["tourism_receipts"])

# Select numeric columns
numeric_columns = [
    "tourism_receipts",
    "tourism_arrivals",
    "tourism_exports",
    "tourism_expenditures",
    "gdp",
    "inflation"
]

# Calculate correlations
correlations = df[numeric_columns].corr()["tourism_receipts"].sort_values(
    ascending=False
)

print("\n--- CORRELATION WITH TOURISM RECEIPTS ---")
print(correlations)