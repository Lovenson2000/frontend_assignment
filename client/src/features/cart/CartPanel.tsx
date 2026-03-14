import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Button from "../../components/Button"
import CartItem from "../../components/CartItem"
import { CartItemType } from "../../lib/types"
import { usePlaceOrderMutation } from "../menu/menuApi"
import { findTotalItems, findTotalPrice } from "../../utils/utils"
import { clearCart } from "./cartSlice"

export default function CartPanel() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(state => state.cart.items)
  const [placeOrder, { isLoading: isSubmitting, error: placeOrderError }] =
    usePlaceOrderMutation()

  const totalItems = findTotalItems(items)
  const totalPrice = findTotalPrice(items)

  const handlePlaceOrder = async () => {
    if (items.length === 0 || isSubmitting) {
      return
    }

    try {
      await placeOrder({ items }).unwrap()
      dispatch(clearCart())
    } catch {}
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Cart</h2>
        <p className="text-sm text-slate-500">
          {totalItems} item{totalItems === 1 ? "" : "s"}
        </p>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600">
          Your Cart is empty. Add items from the menu to place an order
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          {items.map(item => (
            <CartItem key={item.menuItemId} item={item as CartItemType} />
          ))}

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Total</p>
              <p className="text-sm font-semibold text-slate-900">
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            {placeOrderError ? (
              <p className="text-sm text-red-600">
                Failed to place order. Please try again.
              </p>
            ) : null}

            <div className="w-full flex gap-3">
              <Button
                buttonProps={{
                  className: "w-1/2",
                  bgColor: "white",
                  hoverBgColor: "slate-200",
                  text: "Clear",
                  textColor: "slate-800",
                  borderColor: "border-slate-200",
                  onClick: () => dispatch(clearCart()),
                }}
              />
              <Button
                buttonProps={{
                  className: "w-1/2",
                  bgColor: "slate-800",
                  hoverBgColor: "slate-600",
                  text: isSubmitting ? "Submitting..." : "Submit Order",
                  textColor: "white",
                  disabled: isSubmitting,
                  onClick: handlePlaceOrder,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
