/**
 * api.js
 * ---------------------------------------------------------------
 * Handles communication with the real tourism prediction backend.
 * ---------------------------------------------------------------
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

/**
 * Sends tourism data to the backend and returns the prediction.
 *
 * @param {Object} payload
 * @param {string} payload.country
 * @param {number} payload.year
 * @param {number} payload.tourism_arrivals
 * @param {number} payload.tourism_exports
 * @param {number} payload.tourism_expenditures
 * @param {number} payload.gdp
 * @param {number} payload.inflation
 * @returns {Promise<Object>}
 */
export async function predictTourismDemand(payload) {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let message = 'The prediction service returned an error.'

    try {
      const errorData = await response.json()
      if (errorData.detail) {
        message = errorData.detail
      }
    } catch {
      // Keep default error message
    }

    throw new Error(message)
  }

  return response.json()
}
/**
 * Fetches historical tourism data for a selected country.
 *
 * @param {string} country
 * @returns {Promise<Array>}
 */
export async function getCountryHistory(country) {
  const response = await fetch(
    `${API_BASE_URL}/country-history/${encodeURIComponent(country)}`
  )

  if (!response.ok) {
    let message = 'Unable to fetch country history.'

    try {
      const errorData = await response.json()
      if (errorData.detail) {
        message = errorData.detail
      }
    } catch {
      // Keep default error message
    }

    throw new Error(message)
  }

  return response.json()
}
/**
 * Fetches the top 3 countries based on predicted tourism receipts.
 *
 * @returns {Promise<Object>}
 */
export async function getTopCountries() {
  const response = await fetch(
    `${API_BASE_URL}/top-countries`
  )

  if (!response.ok) {
    let message = 'Unable to fetch top predicted countries.'

    try {
      const errorData = await response.json()

      if (errorData.detail) {
        message = errorData.detail
      }
    } catch {
      // Keep default error message
    }

    throw new Error(message)
  }

  return response.json()
}