import { useEffect, useState } from "react"
import { MenuCategory, MenuItem } from "../lib/types"
import { formatCategory } from "../utils/utils"
import MenuCard from "./MenuCard"

const ALL_CATEGORIES = "all"
const TOAST_DURATION_MS = 2500

export default function MenuItemsContainer({
  menuItems,
}: {
  menuItems: MenuItem[]
}) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">(
    ALL_CATEGORIES,
  )
  const [toastMessage, setToastMessage] = useState("")

  const allCategories = [...new Set(menuItems.map(item => item.category))]

  const filteredMenuItems =
    activeCategory === ALL_CATEGORIES
      ? menuItems
      : menuItems.filter(item => item.category === activeCategory)

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage("")
    }, TOAST_DURATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  return (
    <div>
      {toastMessage ? (
        <div className="toast-slide-in fixed right-6 bottom-6 z-50 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toastMessage}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <CategoryFilter
          category={ALL_CATEGORIES}
          isActive={activeCategory === ALL_CATEGORIES}
          onClick={() => setActiveCategory(ALL_CATEGORIES)}
        />
        {allCategories.map(category => (
          <CategoryFilter
            key={category}
            category={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredMenuItems.map(item => (
          <MenuCard
            key={item.id}
            item={item}
            onItemAdded={itemName => setToastMessage(`${itemName} added to cart`)}
          />
        ))}
      </div>
    </div>
  )
}

function CategoryFilter({
  category,
  isActive,
  onClick,
}: {
  category: MenuCategory | "all"
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
        isActive
          ? "border-orange-400 bg-orange-400 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-500"
      }`}
    >
      {formatCategory(category)}
    </button>
  )
}
