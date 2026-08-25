import { useState } from 'react'
import {
  MapPin,
  Loader2,
  Sparkles,
  AlertCircle,
} from 'lucide-react'
import { COUNTRIES } from '../services/countries'

export default function PredictionForm({ onSubmit, isLoading }) {
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!country) {
      setError('Please select a country.')
      return
    }

    // Make sure the typed country is actually in the country list
    if (!COUNTRIES.includes(country)) {
      setError('Please select a valid country from the list.')
      return
    }

    setError('')

    onSubmit({
      country,
    })
  }

  return (
    <div className="soft-card p-6 sm:p-7">
      <h2 className="font-display text-lg font-semibold text-ink">
        Tourism Demand Prediction
      </h2>

      <p className="mt-1 text-sm text-ink-soft">
        Select or type a country to generate a tourism receipts forecast.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6"
      >
        <label
          htmlFor="country"
          className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink"
        >
          <MapPin
            size={14}
            className="text-accent"
            strokeWidth={2.2}
          />

          Country

          <span className="text-signal-high">*</span>
        </label>

        <input
          id="country"
          name="country"
          type="text"
          list="country-options"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value)
            setError('')
          }}
          placeholder="Type or select a country"
          autoComplete="off"
          className={[
            'w-full rounded-xl border bg-canvas px-3.5 py-3 text-sm text-ink outline-none transition-colors',
            'focus:border-accent',
            error ? 'border-signal-high' : 'border-border',
          ].join(' ')}
        />

        <datalist id="country-options">
          {COUNTRIES.map((countryName) => (
            <option
              key={countryName}
              value={countryName}
            />
          ))}
        </datalist>

        {error && (
          <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-signal-high">
            <AlertCircle size={12} />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2
                size={16}
                className="animate-spin"
              />
              Analyzing tourism patterns...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Predict Tourism Demand
            </>
          )}
        </button>
      </form>
    </div>
  )
}