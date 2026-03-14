import { ButtonProps } from "../lib/types"

export default function Button({ buttonProps }: { buttonProps: ButtonProps }) {
  return (
    <button
      type="button"
      className={`${buttonProps.className || ""} rounded-md bg-${buttonProps.bgColor} ${buttonProps.borderColor ? `border ${buttonProps.borderColor}` : ""} px-4 py-1.5 text-sm font-medium text-${buttonProps.textColor} transition ${buttonProps.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"} ${buttonProps.hoverBgColor && !buttonProps.disabled ? `hover:bg-${buttonProps.hoverBgColor}` : ""}`}
      disabled={buttonProps.disabled}
      onClick={() => buttonProps.onClick()}
    >
      {buttonProps.text}
    </button>
  )
}
