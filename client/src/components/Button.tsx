import { ButtonProps } from "../lib/types"

export default function Button({ buttonProps }: { buttonProps: ButtonProps }) {
  return (
    <button
      type="button"
      className={`${buttonProps.className || ""} rounded-md bg-${buttonProps.bgColor} ${buttonProps.borderColor ? `border ${buttonProps.borderColor}` : ""} px-4 py-1.5 text-sm font-medium text-${buttonProps.textColor} cursor-pointer transition hover:bg-${buttonProps.hoverBgColor}`}
      onClick={() => buttonProps.onClick()}
    >
      {buttonProps.text}
    </button>
  )
}
