import { Compass } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t-4 border-accent bg-white">

      {/* Footer content */}
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2">

          {/* Project */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                <Compass size={20} />
              </span>

              <h3 className="font-display text-xl font-bold text-ink">
                TourSight AI
              </h3>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
              A tourism demand forecasting system built using machine learning,
              FastAPI, and React.
            </p>
          </div>

          {/* Project Team */}
          <div>
            <h3 className="font-display text-base font-bold text-ink">
              Project Team
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
              <div>
                <p className="font-semibold text-ink"> Yogesh </p>
                <p className="text-sm text-ink-soft">
                  Data Collection & Deployment
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink"> Navya Sri </p>
                <p className="text-sm text-ink-soft">
                  Data Preprocessing
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink"> Bhargavi </p>
                <p className="text-sm text-ink-soft">
                  ML Models
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink"> Sarayu </p>
                <p className="text-sm text-ink-soft">
                  UI / Frontend
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-7 border-t-2 border-border pt-5 text-center">
          <p className="text-sm text-ink-faint">
            © 2026 TourSight AI · Tourism Demand Prediction System
          </p>
        </div>
      </div>

      {/* Thick bottom line */}
      <div className="h-2 bg-accent" />

    </footer>
  )
}