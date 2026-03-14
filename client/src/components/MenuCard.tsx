import { useAppDispatch } from "../app/hooks"
import { addToCart } from "../features/cart/cartSlice"
import { MenuItem } from "../lib/types"
import { formatCategory } from "../utils/utils"
import Button from "./Button"

export default function MenuCard({ item }: { item: MenuItem }) {
  const dispatch = useAppDispatch()

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
            bgColor: "orange-400",
            textColor: "white",
            text: "Add to Cart",
            onClick: () =>
              dispatch(
                addToCart({
                  menuItemId: item.id,
                  unitPrice: item.price,
                  name: item.name,
                  photoUrl: item.photoUrl,
                }),
              ),
          }}
        />
      </div>
    </article>
  )
}
