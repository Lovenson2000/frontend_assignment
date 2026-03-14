import CartPanel from "../cart/CartPanel"
import { useGetMenuItemsQuery } from "./menuApi"
import MenuCard from "../../components/MenuCard"

export default function Menu() {
  const {
    data: items = [],
    error,
    isLoading,
    isFetching,
  } = useGetMenuItemsQuery()

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="order-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:order-1">
          <h2 className="text-xl font-semibold text-slate-900">Menu</h2>
          <p className="mt-2 text-sm text-slate-600">Loading menu...</p>
        </section>
        <div className="order-1 lg:order-2">
          <CartPanel />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="order-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:order-1">
          <h2 className="text-xl font-semibold text-slate-900">Menu</h2>
          <p className="mt-2 text-sm text-slate-600">Failed to load menu.</p>
        </section>
        <div className="order-1 lg:order-2">
          <CartPanel />
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="order-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:order-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Menu</h2>
          {isFetching ? (
            <p className="text-sm text-slate-500">Refreshing menu...</p>
          ) : null}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
        <CartPanel />
      </div>
    </div>
  )
}
