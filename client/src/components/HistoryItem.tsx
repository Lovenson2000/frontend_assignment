import { OrderItem } from "../lib/types"

export default function HistoryItem({ item }: { item: OrderItem }) {
  return (
    <div className="w-full max-w-sm rounded-md bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <img
            src={item.photoUrl}
            alt={item.name}
            className="h-16 w-16 shrink-0 rounded-md object-cover"
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
            <p className="mt-1 text-sm text-slate-500">
              ${item.unitPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-900">
            Quantity: {item.quantity}
          </p>

          <p className="text-sm text-slate-600">
            Total: ${item.lineTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
