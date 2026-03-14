import { useAppDispatch } from "../app/hooks"
import { decreaseQuantity, increaseQuantity } from "../features/cart/cartSlice"
import { CartItemType } from "../lib/types"

export default function CardItem({ item }: { item: CartItemType }) {
  const dispatch = useAppDispatch()

  return (
    <div
      key={item.menuItemId}
      className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            ${item.unitPrice.toFixed(2)} each
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-100"
            aria-label={`Decrease quantity for ${item.name}`}
            onClick={() => dispatch(decreaseQuantity(item.menuItemId))}
          >
            -
          </button>
          <span className="min-w-6 text-center text-sm font-medium text-slate-900">
            {item.quantity}
          </span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-100"
            aria-label={`Increase quantity for ${item.name}`}
            onClick={() => dispatch(increaseQuantity(item.menuItemId))}
          >
            +
          </button>
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-600">
        Line total: ${(item.unitPrice * item.quantity).toFixed(2)}
      </p>
    </div>
  )
}
