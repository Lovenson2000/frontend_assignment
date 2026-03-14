import { useState } from "react"
import NavBar from "./components/NavBar"
import HistoryPanel from "./features/history/HistoryPanel"
import Menu from "./features/menu/menu"
import { View } from "./lib/types"
import { viewContent } from "./lib/constants"

export const App = () => {
  const [activeView, setActiveView] = useState<View>("menu")
  const activeContent = viewContent[activeView]

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar activeView={activeView} onViewChange={setActiveView} />

      <main className="mx-auto max-w-[90%] px-4 py-8">
        <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            {activeContent.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {activeContent.description}
          </p>
        </section>

        {activeView === "menu" ? <Menu /> : null}
        {activeView === "history" ? <HistoryPanel /> : null}
      </main>
    </div>
  )
}
