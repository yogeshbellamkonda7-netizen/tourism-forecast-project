from preprocessing.preprocessing import (
    X_train_encoded,
    X_test_encoded,
    y_train,
    y_test
)

from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input


# ==========================================
# 1. CONVERT ENCODED DATA
# ==========================================

X_train = X_train_encoded.toarray()
X_test = X_test_encoded.toarray()


# ==========================================
# 2. SCALE INPUT FEATURES
# ==========================================

X_scaler = StandardScaler()

X_train = X_scaler.fit_transform(X_train)
X_test = X_scaler.transform(X_test)


# ==========================================
# 3. SCALE TARGET
# ==========================================

y_scaler = StandardScaler()

y_train_scaled = y_scaler.fit_transform(
    y_train.to_numpy().reshape(-1, 1)
)

y_test_scaled = y_scaler.transform(
    y_test.to_numpy().reshape(-1, 1)
).ravel()


# ==========================================
# 4. CREATE SIMPLER DNN
# ==========================================

model = Sequential([
    Input(shape=(X_train.shape[1],)),
    Dense(32, activation="relu"),
    Dense(16, activation="relu"),
    Dense(1)
])


# ==========================================
# 5. COMPILE
# ==========================================

model.compile(
    optimizer="adam",
    loss="mse",
    metrics=["mae"]
)


# ==========================================
# 6. TRAIN DNN
# ==========================================

print("\n--- TRAINING ANN / DNN ---")

model.fit(
    X_train,
    y_train_scaled,
    epochs=15,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)


# ==========================================
# 7. PREDICT
# ==========================================

predictions_scaled = model.predict(X_test).flatten()

predictions = y_scaler.inverse_transform(
    predictions_scaled.reshape(-1, 1)
).flatten()


# ==========================================
# 8. EVALUATE
# ==========================================

mae = mean_absolute_error(
    y_test,
    predictions
)

rmse = mean_squared_error(
    y_test,
    predictions
) ** 0.5

r2 = r2_score(
    y_test,
    predictions
)


# ==========================================
# 9. RESULTS
# ==========================================

print("\n==========================================")
print("ANN / DNN RESULTS")
print("==========================================")

print(f"MAE : {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"R²  : {r2:.4f}")


# ==========================================
# 10. SAVE MODEL
# ==========================================

model.save("models/ann_model.keras")

print("\nANN model saved as models/ann_model.keras")