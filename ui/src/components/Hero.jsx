import { SlidersHorizontal, Sparkles, TrendingUp, BarChart3, MapPin, ArrowDown } from 'lucide-react'

export default function Hero() {
  const steps = [
    [SlidersHorizontal, 'Choose a country', 'Select'],
    [Sparkles, 'AI analyzes patterns', 'Analyze'],
    [TrendingUp, 'Forecast receipts', 'Predict'],
    [BarChart3, 'Explore insights', 'Understand'],
  ]

  return (
    <section id="top" className="relative overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 scale-[1.02] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=85')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,18,31,.82),rgba(4,18,31,.55)_48%,rgba(4,18,31,.38)),linear-gradient(0deg,rgba(4,18,31,.62),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(48,196,184,.20),transparent_24rem)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="hero-content max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            College ML Project · Team of 4
          </div>

          <div className="mt-6 rounded-[28px] border border-white/15 bg-slate-950/20 p-6 backdrop-blur-[2px] sm:p-8">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-teal-200">
              <MapPin size={14} /> Tourism intelligence
            </p>
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
              Predict Tourism
              <span className="block text-teal-200">Receipts with AI</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Estimate tourism receipts using historical tourism and economic data with machine learning — presented through a simple, decision-ready dashboard.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#prediction" className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-accent-light hover:shadow-xl">
                Start Prediction <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <a href="#model" className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15">
                View model details
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-white/[.08] backdrop-blur-md sm:grid-cols-4">
          {steps.map(([Icon, title, small], i) => (
            <div key={title} className={`group flex items-center gap-3 p-4 transition-colors hover:bg-white/[.08] ${i ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-100 transition-transform group-hover:scale-105">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{small}</p>
                <p className="mt-0.5 text-xs font-semibold text-white sm:text-sm">{i + 1}. {title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
