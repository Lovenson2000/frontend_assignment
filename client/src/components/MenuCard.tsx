import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addToCart } from "../features/cart/cartSlice"
import { MenuItem } from "../lib/types"
import { formatCategory } from "../utils/utils"
import Button from "./Button"

export default function MenuCard({
  item,
  onItemAdded,
}: {
  item: MenuItem
  onItemAdded?: (itemName: string) => void
}) {
  const dispatch = useAppDispatch()
  const isInCart = useAppSelector(state =>
    state.cart.items.some(cartItem => cartItem.menuItemId === item.id),
  )

  const handleAddToCart = () => {
    if (isInCart) {
      return
    }

    dispatch(
      addToCart({
        menuItemId: item.id,
        unitPrice: item.price,
        name: item.name,
        photoUrl: item.photoUrl,
      }),
    )
    onItemAdded?.(item.name)
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
      <img
        src={item.photoUrl}
        alt={item.name}
        className="h-44 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg capitalize font-semibold text-slate-900">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full border border-slate-200 px-2 py-1 text-xs capitalize font-medium text-slate-700">
            {formatCategory(item.category)}
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm text-slate-600">
          {item.description || ""}
        </p>

        <div className="my-3 flex items-center justify-between">
          <p className="text-base font-semibold text-slate-900">
            ${item.price.toFixed(2)}
          </p>
        </div>

        <Button
          buttonProps={{
            bgColor: isInCart ? "orange-400/25" : "orange-400",
            borderColor: isInCart ? "border-slate-200" : undefined,
            textColor: isInCart ? "orange-500" : "white",
            text: isInCart ? "Added to Cart" : "Add to Cart",
            disabled: isInCart,
            onClick: handleAddToCart,
          }}
        />
      </div>
    </article>
  )
}
