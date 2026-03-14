import { navItems } from "../lib/constants"
import { View } from "../lib/types"

export default function NavBar({
  activeView,
  onViewChange,
}: {
  activeView: View
  onViewChange: (view: View) => void
}) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <button
          type="button"
          className="flex items-center gap-2 text-left"
          onClick={() => onViewChange("menu")}
          aria-label="Go to menu"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-sm font-semibold text-white">
            F
          </span>
          <span className="flex flex-col">
            <strong className="text-sm font-semibold text-slate-900">
              Foody
            </strong>
            <small className="text-xs text-slate-500">Dashboard</small>
          </span>
        </button>

        <nav className="flex items-center gap-2" aria-label="Primary">
          {navItems.map(item => (
            <button
              key={item.key}
              type="button"
              className={
                item.key === activeView
                  ? "rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                  : "rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              }
              onClick={() => onViewChange(item.key)}
              aria-current={item.key === activeView ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
