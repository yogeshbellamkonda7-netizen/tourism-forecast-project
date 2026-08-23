import pandas as pd

# Load your actual dataset
df = pd.read_csv("data/raw/world_tourism_economy_data.csv")

# Get the exact country names used in the dataset
countries = sorted(df["country"].dropna().unique())

with open("ui/src/services/countries.js", "w", encoding="utf-8") as f:
    f.write("export const COUNTRIES = [\n")

    for country in countries:
        escaped = country.replace("\\", "\\\\").replace("'", "\\'")
        f.write(f"  '{escaped}',\n")

    f.write("]\n")

print(f"Created countries.js with {len(countries)} countries.")