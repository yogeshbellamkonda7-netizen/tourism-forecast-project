import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import PredictionForm from '../components/PredictionForm'
import PredictionResult from '../components/PredictionResult'
import {
  predictTourismDemand,
  getCountryHistory,
  getTopCountries,
  API_BASE_URL,
} from '../services/api'
import { History, Trash2, ArrowLeftRight } from 'lucide-react'
import { COUNTRIES } from '../services/countries'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const HISTORY_KEY = 'tourism_prediction_history'

export default function Dashboard() {
  const [countryA, setCountryA] = useState('')
  const [countryB, setCountryB] = useState('')
  const [compareLoading, setCompareLoading] = useState(false)
  const [compareError, setCompareError] = useState('')
  const [comparison, setComparison] = useState(null)
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [countryHistory, setCountryHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState('')
  const [topCountries, setTopCountries] = useState([])
  const [topCountriesLoading, setTopCountriesLoading] = useState(false)
  const [topCountriesError, setTopCountriesError] = useState('')

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  useEffect(() => {
  getTopCountries().then((data) => {
    setTopCountries(data.rankings || [])
  })
}, [])

  const handlePredict = async (payload) => {
    setStatus('loading')
    setError(null)

    try {
      const response = await predictTourismDemand(payload)

      if (response.error) {
        throw new Error(response.error)
      }

      setResult(response)
      setStatus('success')
      setHistoryLoading(true)
setHistoryError('')

try {
  const historicalData = await getCountryHistory(payload.country)
  setCountryHistory(historicalData.history || [])
} catch (err) {
  setHistoryError(err.message)
  setCountryHistory([])
} finally {
  setHistoryLoading(false)
}

setTopCountriesLoading(true)
setTopCountriesError('')

try {
  const rankingData = await getTopCountries()
  setTopCountries(rankingData.rankings || [])
} catch (err) {
  setTopCountriesError(err.message)
  setTopCountries([])
} finally {
  setTopCountriesLoading(false)
}

      const historyItem = {
        id: Date.now(),
        country: payload.country,
        prediction: response.predictedReceipts,
        year: response.year_used,
        model: response.model,
        date: new Date().toLocaleString(),
      }

      setHistory((previous) => [historyItem, ...previous].slice(0, 10))
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  const handleCompare = async () => {
    if (!countryA || !countryB) {
      setCompareError('Please select both countries.')
      return
    }

    if (countryA === countryB) {
      setCompareError('Please select two different countries.')
      return
    }

    setCompareLoading(true)
    setCompareError('')
    setComparison(null)

    try {
      const response = await fetch(`${API_BASE_URL}/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country_a: countryA,
          country_b: countryB,
        }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Comparison failed.')
      }

      setComparison(data)
    } catch (err) {
      setCompareError(err.message)
    } finally {
      setCompareLoading(false)
    }
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }

  return (
    <main>
      <Hero />

      {/* Prediction */}
      <section
        id="prediction"
        className="section-photo prediction-photo mx-auto max-w-6xl px-5 py-6 sm:px-8"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <PredictionForm
              onSubmit={handlePredict}
              isLoading={status === 'loading'}
            />
          </div>

          <div className="lg:col-span-2">
            <PredictionResult
              status={status}
              result={result}
              error={error}
            />
          </div>
        </div>
            </section>

      {/* Country Historical Analytics */}
      {status === 'success' && (
        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <div className="mb-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
              Country Historical Analytics
            </h2>

            <p className="mt-1 text-sm text-ink-soft">
              Historical tourism trends for {result?.country}
            </p>
          </div>

          {historyLoading ? (
            <div className="rounded-card border border-border bg-surface p-8 text-center shadow-soft">
              <p className="text-sm text-ink-soft">
                Loading historical data...
              </p>
            </div>
          ) : historyError ? (
            <div className="rounded-card border border-border bg-surface p-8 text-center shadow-soft">
              <p className="text-sm text-signal-high">
                {historyError}
              </p>
            </div>
          ) : countryHistory.length === 0 ? (
            <div className="rounded-card border border-border bg-surface p-8 text-center shadow-soft">
              <p className="text-sm text-ink-soft">
                No historical data available for this country.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* Tourism Receipts Chart */}
              <div className="rounded-card border border-border bg-surface p-6 shadow-soft">
                <h3 className="mb-4 text-base font-semibold text-ink">
                  Tourism Receipts
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={countryHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="tourism_receipts"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Tourism Arrivals Chart */}
              <div className="rounded-card border border-border bg-surface p-6 shadow-soft">
                <h3 className="mb-4 text-base font-semibold text-ink">
                  Tourism Arrivals
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={countryHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="tourism_arrivals"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Tourism Expenditure Chart */}
              <div className="rounded-card border border-border bg-surface p-6 shadow-soft">
                <h3 className="mb-4 text-base font-semibold text-ink">
                  Tourism Expenditure
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={countryHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="tourism_expenditures"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>
          )}
        </section>
      )}

      {/* Prediction History */}
      <section
  id="history"
  className="section-photo history-photo mx-auto max-w-6xl px-5 py-8 sm:px-8"
>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={20} className="text-accent" />

            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
              Prediction History
            </h2>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-xs font-medium text-ink-faint transition-colors hover:text-signal-high"
            >
              <Trash2 size={14} />
              Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="rounded-card border border-border bg-surface p-8 text-center shadow-soft">
            <History
              size={28}
              className="mx-auto mb-3 text-ink-faint"
              strokeWidth={1.5}
            />

            <p className="text-sm text-ink-soft">
              Your previous predictions will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-card border border-border bg-surface p-5 shadow-soft"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {item.country}
                    </h3>

                    <p className="mt-1 text-xs text-ink-faint">
                      Prediction year: {item.year}
                    </p>
                  </div>

                  <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                    {item.model}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-ink-faint">
                    Predicted Tourism Receipts
                  </p>

                  <p className="num-display mt-1 text-3xl font-semibold text-ink">
                    {(Number(item.prediction) / 1_000_000).toLocaleString(
                      'en-IN',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{' '}
                    M
                  </p>
                </div>

                <p className="mt-3 text-xs text-ink-faint">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
            

      {/* Top 3 Predicted Countries */}
        <section
  id="top-countries"
  className="mx-auto max-w-6xl px-5 py-8 sm:px-8"
>
          <div className="mb-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
              Top 3 Predicted Countries
            </h2>

            <p className="mt-1 text-sm text-ink-soft">
              Countries ranked by predicted tourism receipts
            </p>
          </div>

          {topCountriesLoading ? (
            <div className="rounded-card border border-border bg-surface p-8 text-center shadow-soft">
              <p className="text-sm text-ink-soft">
                Calculating rankings...
              </p>
            </div>
          ) : topCountriesError ? (
            <div className="rounded-card border border-border bg-surface p-8 text-center shadow-soft">
              <p className="text-sm text-signal-high">
                {topCountriesError}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {topCountries.map((item) => (
                <div
                  key={item.rank}
                  className="rounded-card border border-border bg-surface p-6 text-center shadow-soft"
                >
                  <div className="text-3xl">
                    {item.rank === 1
                      ? '🥇'
                      : item.rank === 2
                      ? '🥈'
                      : '🥉'}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-ink">
                    {item.country}
                  </h3>

                  <p className="mt-2 text-sm text-ink-soft">
                    Predicted Tourism Receipts
                  </p>

                  <p className="mt-1 text-xl font-semibold text-ink">
                    {(Number(item.predictedReceipts) / 1_000_000).toLocaleString(
                        'en-IN',
                          {
                                  minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                             }
                     )}{' '}
                         M
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      

      <section  id="compare"
        className="section-photo compare-photo mx-auto max-w-6xl px-5 py-8 sm:px-8"
      >
        <div className="mb-5 flex items-center gap-2">
          <ArrowLeftRight size={20} className="text-accent" />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
            Country Comparison
          </h2>
        </div>

        <div className="rounded-card border border-border bg-surface p-6 shadow-soft">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Country 1
              </label>

              <select
                value={countryA}
                onChange={(e) => setCountryA(e.target.value)}
                className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent"
              >
                <option value="">Select country</option>

                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Country 2
              </label>

              <select
                value={countryB}
                onChange={(e) => setCountryB(e.target.value)}
                className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent"
              >
                <option value="">Select country</option>

                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={handleCompare}
              disabled={
                !countryA ||
                !countryB ||
                countryA === countryB ||
                compareLoading
              }
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {compareLoading ? 'Comparing...' : 'Compare Countries'}
            </button>
          </div>

          {compareError && (
            <p className="mt-4 text-center text-sm font-medium text-signal-high">
              {compareError}
            </p>
          )}

          {comparison && (
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* Country A */}
                <div className="rounded-xl border border-border bg-canvas p-5">
                  <h3 className="text-xl font-semibold text-ink">
                    {comparison.country_a.country}
                  </h3>

                  <p className="mt-4 text-xs uppercase tracking-wide text-ink-faint">
                    Predicted Tourism Receipts
                  </p>

                  <p className="num-display mt-1 text-3xl font-semibold text-ink">
                    {(
                      Number(comparison.country_a.predictedReceipts) /
                      1_000_000
                    ).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    M
                  </p>

                  <p className="mt-2 text-xs text-ink-faint">
                    Data year: {comparison.country_a.year_used}
                  </p>
                </div>

                {/* Country B */}
                <div className="rounded-xl border border-border bg-canvas p-5">
                  <h3 className="text-xl font-semibold text-ink">
                    {comparison.country_b.country}
                  </h3>

                  <p className="mt-4 text-xs uppercase tracking-wide text-ink-faint">
                    Predicted Tourism Receipts
                  </p>

                  <p className="num-display mt-1 text-3xl font-semibold text-ink">
                    {(
                      Number(comparison.country_b.predictedReceipts) /
                      1_000_000
                    ).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    M
                  </p>

                  <p className="mt-2 text-xs text-ink-faint">
                    Data year: {comparison.country_b.year_used}
                  </p>
                </div>

              </div>

              <div className="mt-4 rounded-xl border border-accent/20 bg-accent/5 p-4 text-center">
                <p className="text-sm font-semibold text-ink">
                  {comparison.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Model Information */}
      <section
        id="model"
        className="section-photo model-photo mx-auto max-w-6xl px-5 py-8 sm:px-8"
      >
        <div className="mb-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
            Model Information
          </h2>
        </div>

        <div className="rounded-card border border-border bg-surface p-6 shadow-soft">

          {/* Best Model */}
          <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-5">
            <p className="text-xs uppercase tracking-wide text-ink-faint">
              Currently Deployed Model
            </p>

            <p className="mt-2 text-2xl font-semibold text-ink">
              Random Forest Regressor
            </p>

            <p className="mt-1 text-sm text-ink-soft">
              Used by the prediction engine
            </p>
          </div>

          {/* All trained models */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-ink">
              Trained Models
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl bg-canvas p-4">
                <p className="text-xs text-ink-faint">
                  Model 1
                </p>

                <p className="mt-2 font-semibold text-ink">
                  Linear Regression
                </p>

                <p className="mt-1 text-xs text-ink-faint">
                  Regression model
                </p>
              </div>

              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                <p className="text-xs text-ink-faint">
                  Model 2
                </p>

                <p className="mt-2 font-semibold text-ink">
                  Random Forest Regressor
                </p>

                <p className="mt-1 text-xs font-medium text-accent">
                  Current deployed model
                </p>
              </div>

              <div className="rounded-xl bg-canvas p-4">
                <p className="text-xs text-ink-faint">
                  Model 3
                </p>

                <p className="mt-2 font-semibold text-ink">
                  Gradient Boosting Regressor
                </p>

                <p className="mt-1 text-xs text-ink-faint">
                  Regression model
                </p>
              </div>
                <div className="rounded-xl bg-canvas p-4">
                <p className="text-xs text-ink-faint">
                    Model 4
                </p>

                <p className="mt-2 font-semibold text-ink">
                      Artificial Neural Network
                 </p>

                <p className="mt-1 text-xs text-ink-faint">
                    Deep learning model
                 </p>
                 </div>

            </div>
          </div>

          {/* Model type */}
          <div className="mt-5 border-t border-border pt-4">
            <p className="text-sm text-ink-soft">
              The models were trained and compared to identify a suitable
              regression model for tourism prediction.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}