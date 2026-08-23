
# TourSight AI – Tourism Receipts Prediction

TourSight AI is a machine learning-based web application that predicts **tourism receipts of a country** using historical tourism and economic data.

The project combines machine learning, a FastAPI backend, and a React frontend to provide an easy-to-use tourism prediction dashboard.

## 🎯 Problem Statement

Tourism contributes significantly to the economy of many countries. However, understanding and estimating tourism receipts can be difficult using historical data alone.

TourSight AI aims to use historical tourism and economic information to predict tourism receipts and present the result through a simple web application.

## 💡 Solution

A machine learning model is trained using historical tourism and economic data.

The trained model is connected to a FastAPI backend, which provides predictions to a React-based frontend.

```text
Tourism & Economic Data
          ↓
     Preprocessing
          ↓
   Machine Learning
          ↓
    Trained Model
          ↓
    FastAPI Backend
          ↓
     React Frontend
          ↓
   Tourism Receipts
     Prediction
````

## 📊 Dataset

The project uses historical country-level tourism and economic data.

The dataset contains information related to tourism activity and economic indicators used for predicting tourism receipts.

The data covers the years **2019–2023**.

## 🔍 EDA

Exploratory Data Analysis was performed to:

* Understand the dataset
* Check missing values
* Study relationships between features
* Analyze tourism and economic trends
* Identify useful features for prediction

EDA graphs are available in:

```text
analysis/graphs/
```

## ⚙️ Preprocessing

The data was prepared before training by:

* Cleaning the dataset
* Handling missing values
* Selecting relevant features
* Converting data into suitable formats
* Splitting the data into training and testing sets

Preprocessing code is available in:

```text
preprocessing/
```

## 🤖 Machine Learning

Different machine learning models were trained and compared to identify a suitable model for tourism receipts prediction.

The trained models and training code are maintained in:

```text
training/
models/
```

The selected model is used by the backend to generate predictions.

## 🌐 Application Features

* Country selection
* Tourism receipts prediction
* Prediction result display
* Prediction history
* Country comparison
* Model information
* Responsive tourism-themed dashboard
* FastAPI backend integration

## 🛠️ Technologies

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib

### Backend

* FastAPI
* Uvicorn

### Frontend

* React
* Vite
* Tailwind CSS
* JavaScript
* Lucide React

## 📁 Project Structure

```text
tourism-forecast-project/
│
├── analysis/
│   ├── graphs/
│   └── eda.py
│
├── backend/
│   └── app.py
│
├── data/
│   └── raw/
│
├── models/
│
├── preprocessing/
│   └── preprocessing.py
│
├── testing/
│
├── training/
│   └── train.py
│
├── ui/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── utilities/
├── requirements.txt
└── README.md
```

## 🚀 How to Run

### Backend

From the project root:

```bash
pip install -r requirements.txt
```

Then start the FastAPI server:

```bash
uvicorn backend.app:app --reload
```

The backend will normally run at:

```text
http://localhost:8000
```

### Frontend

Open another terminal:

```bash
cd ui
npm install
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```
## 👥 Project Team

This project was developed as a team project by:

- **Yogesh** – Frontend & Project Integration
- **Bhargavi** – Machine Learning
- **Navya Sri** – Data Preprocessing & Analysis
- **Sargayu** – UI / Frontend Design