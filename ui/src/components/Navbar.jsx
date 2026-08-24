import { Compass } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Predict', href: '#prediction' },
    { label: 'History', href: '#history' },
  { label: 'Top 3', href: '#top-countries' },
  { label: 'Comparison', href: '#compare' },
  { label: 'Model', href: '#model' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 glass-nav shadow-[0_4px_20px_-18px_rgba(15,27,52,.45)]">
      <div className="mx-auto flex w-full items-center px-8 py-3 sm:pl-12 sm:pr-2 lg:pl-16 lg:pr-2">
        <a href="#top" className="group flex items-center gap-3" aria-label="TourSight AI home">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-white shadow-soft transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
            <Compass size={22} strokeWidth={2.2} />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-300" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-bold tracking-tight text-ink">TourSight AI</span>
            <span className="mt-0.5 text-[11px] font-medium tracking-wide text-ink-faint">Tourism Demand Prediction</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-3 sm:flex">
  {NAV_LINKS.map((link) => (
    <a
      key={link.label}
      href={link.href}
      className="
        rounded-xl
        border-2
        border-accent
        bg-white
        px-4
        py-2
        text-sm
        font-semibold
        text-ink
        transition-all
        duration-200
        hover:bg-accent
        hover:text-white
      "
    >
      {link.label}
    </a>
  ))}
</nav>
        <a href="#prediction" className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-all hover:bg-accent sm:hidden">Predict</a>
      </div>
    </header>
  )
}
