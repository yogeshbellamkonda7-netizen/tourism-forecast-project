/**
 * mockData.js
 * ---------------------------------------------------------------
 * TEMPORARY placeholder data used only while the ML/data team's
 * final dataset and model are still being finalized.
 *
 * Everything in this file must be replaced with real values once:
 *   - Yogesh's data collection pipeline is finalized, and
 *   - Bhargavi's trained model is deployed behind /predict
 *
 * Nothing in this file should ever be presented as a real
 * accuracy score, metric, or feature-importance value in the
 * final submission.
 * ---------------------------------------------------------------
 */

export const DESTINATIONS = [
  'Goa',
  'Manali',
  'Jaipur',
  'Ooty',
  'Darjeeling',
  'Rishikesh',
  'Munnar',
  'Andaman Islands',
]

export const SEASONS = ['Winter', 'Summer', 'Monsoon', 'Autumn']

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Historical monthly tourist visits for the selected destination.
// Shape: { month, visits }
export const MOCK_HISTORICAL_TREND = [
  { month: 'Jan', visits: 41200 },
  { month: 'Feb', visits: 38900 },
  { month: 'Mar', visits: 44700 },
  { month: 'Apr', visits: 52300 },
  { month: 'May', visits: 61800 },
  { month: 'Jun', visits: 58100 },
  { month: 'Jul', visits: 49500 },
  { month: 'Aug', visits: 47200 },
  { month: 'Sep', visits: 53600 },
  { month: 'Oct', visits: 66400 },
  { month: 'Nov', visits: 72900 },
  { month: 'Dec', visits: 84300 },
]

// Held-out evaluation window comparing actual counts to what the
// model predicted for the same period. Used only to illustrate
// the chart — replace with the real evaluation split.
export const MOCK_ACTUAL_VS_PREDICTED = [
  { month: 'Jul', actual: 49500, predicted: 47800 },
  { month: 'Aug', actual: 47200, predicted: 48600 },
  { month: 'Sep', actual: 53600, predicted: 51900 },
  { month: 'Oct', actual: 66400, predicted: 63200 },
  { month: 'Nov', actual: 72900, predicted: 70100 },
  { month: 'Dec', actual: 84300, predicted: 81950 },
]

// Placeholder feature importance — this must come from the
// trained model (e.g. XGBoost .feature_importances_) once available.
export const MOCK_FEATURE_IMPORTANCE = [
  { feature: 'Seasonality', importance: 0.31 },
  { feature: 'Historical Visits', importance: 0.27 },
  { feature: 'Temperature', importance: 0.16 },
  { feature: 'Food Rating', importance: 0.12 },
  { feature: 'Rainfall', importance: 0.09 },
  { feature: 'Humidity', importance: 0.05 },
]
