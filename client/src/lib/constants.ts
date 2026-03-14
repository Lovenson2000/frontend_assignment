import { View } from "./types"

export const navItems: Array<{ key: View; label: string }> = [
  { key: "menu", label: "Menu" },
  { key: "history", label: "History" },
]

export const viewContent: Record<View, { title: string; description: string }> =
  {
    menu: {
      title: "Menu",
      description: "Browse available menu items",
    },
    history: {
      title: "History",
      description: "Past orders will appear here.",
    },
  }
