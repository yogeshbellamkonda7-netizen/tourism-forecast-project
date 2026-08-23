import {
  AlertTriangle,
  MapPinned,
  Loader2,
  BarChart3,
  Users,
  Wallet,
  Building2,
  Palmtree,
} from 'lucide-react'

export default function PredictionResult({ status, result, error }) {
  return (
    <div className="relative flex min-h-[520px] h-full flex-col overflow-hidden soft-card p-6 sm:p-7">

  <Palmtree
    size={120}
    className="pointer-events-none absolute -right-8 -top-8 opacity-[0.04]"
  />

      <h3 className="font-display text-lg font-semibold text-ink">
        Prediction Result
      </h3>

      <div className="mt-5 flex flex-1 flex-col items-center justify-center text-center">

        {/* IDLE */}
        {status === 'idle' && (
          <div className="flex flex-col items-center gap-3 py-8 text-ink-faint">
            <MapPinned size={30} strokeWidth={1.5} />

            <p className="max-w-[220px] text-sm">
              Select a country and generate a prediction.
            </p>
          </div>
        )}

        {/* LOADING */}
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2
              size={28}
              className="animate-spin text-accent"
            />

            <p className="text-sm font-medium text-ink-soft">
              Analyzing tourism data...
            </p>
          </div>
        )}

        {/* ERROR */}
        {status === 'error' && (
          <div className="flex flex-col items-center gap-3 py-8 text-signal-high">

            <AlertTriangle
              size={28}
              strokeWidth={1.75}
            />

            <p className="max-w-[240px] text-sm font-medium">
              {error || 'Something went wrong while generating the prediction.'}
            </p>

            <p className="text-xs text-ink-faint">
              Please try again.
            </p>

          </div>
        )}

        {/* SUCCESS */}
        {status === 'success' && result && (
          <div className="flex w-full flex-col items-center gap-4 py-2">

            {/* Prediction */}
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-faint">
              <BarChart3 size={13} />
              Predicted Tourism Receipts
            </span>

            <span className="num-display text-5xl font-semibold text-ink sm:text-6xl">
              {(Number(result.predictedReceipts) / 1_000_000).toLocaleString(
                'en-IN',
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}{' '}
              M
            </span>

            <span className="-mt-2 text-xs text-ink-faint">
              tourism receipts
            </span>

            {/* Model */}
            <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Model: {result.model}
            </span>

            {/* Country Information */}
            <div className="mt-4 w-full border-t border-border pt-5">

              <h4 className="mb-3 text-left text-sm font-semibold text-ink">
                Country Information
              </h4>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                {/* Tourist Arrivals */}
                <div className="rounded-xl bg-canvas p-3 text-left">
                  <p className="text-xs text-ink-faint">
                    Annual Tourist Arrivals
                  </p>

                  <p className="mt-1 text-lg font-semibold text-ink">
                    {Number(result.tourismArrivals).toLocaleString(
                      'en-IN',
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                  </p>
                </div>

                {/* Tourism Expenditure */}
                <div className="rounded-xl bg-canvas p-3 text-left">
                  <p className="text-xs text-ink-faint">
                    Tourism Expenditure
                  </p>

                  <p className="mt-1 text-lg font-semibold text-ink">
                    {Number(result.tourismExpenditures).toLocaleString(
                      'en-IN',
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                  </p>
                </div>

                {/* GDP */}
                <div className="rounded-xl bg-canvas p-3 text-left">
                  <p className="text-xs text-ink-faint">
                    GDP
                  </p>

                  <p className="mt-1 text-lg font-semibold text-ink">
                    {(Number(result.gdp) / 1_000_000_000_000).toLocaleString(
                      'en-IN',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{' '}
                    T
                  </p>
                </div>

              </div>

              {/* Data year */}
              <p className="mt-3 text-xs text-ink-faint">
                Based on latest available data: {result.year_used}
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}