import Button from "../../components/Button"
import HistoryItem from "../../components/HistoryItem"
import { useClearOrdersMutation, useGetOrdersQuery } from "../menu/menuApi"

export default function HistoryPanel() {
  const {
    data: orders = [],
    isLoading,
    error,
    isFetching,
  } = useGetOrdersQuery()
  const [clearOrders, { isLoading: isClearing, error: clearOrdersError }] =
    useClearOrdersMutation()

  const handleClearHistory = async () => {
    if (orders.length === 0 || isClearing) {
      return
    }

    try {
      await clearOrders().unwrap()
    } catch {
      // Error state is rendered below.
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mt-2 text-sm text-slate-600">Loading orders...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mt-2 text-sm text-slate-600">
          Failed to load order history.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        {isFetching ? (
          <p className="text-sm text-slate-500">Refreshing orders...</p>
        ) : null}
      </div>

      {clearOrdersError ? (
        <p className="mt-4 text-sm text-red-600">
          Failed to clear history. Please try again.
        </p>
      ) : null}

      {orders.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600">
          No orders yet. Submitted orders will appear here.
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          {orders.map(order => (
            <article
              key={order.id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {order.items.map(item => (
                  <HistoryItem
                    key={`${order.id}-${item.menuItemId}`}
                    item={item}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <p className="text-sm font-semibold text-slate-900">Total</p>
                <p className="text-sm font-semibold text-slate-900">
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </article>
          ))}

          <div className="flex justify-end pt-2">
            <Button
              buttonProps={{
                bgColor: "red-50",
                hoverBgColor: "red-100",
                textColor: "red-600",
                text: isClearing ? "Clearing..." : "Clear History",
                borderColor: "border-red-200",
                disabled: isClearing,
                onClick: handleClearHistory,
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
