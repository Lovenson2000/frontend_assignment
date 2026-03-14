import { ButtonProps } from "../lib/types"

const backgroundClasses: Record<ButtonProps["bgColor"], string> = {
  white: "bg-white",
  "orange-400": "bg-orange-400",
  "orange-400/25": "bg-orange-400/25",
  "slate-800": "bg-slate-800",
  "red-50": "bg-red-50",
}

const hoverBackgroundClasses: Record<NonNullable<ButtonProps["hoverBgColor"]>, string> =
  {
    "slate-200": "hover:bg-slate-200",
    "slate-600": "hover:bg-slate-600",
    "red-100": "hover:bg-red-100",
  }

const borderClasses: Record<NonNullable<ButtonProps["borderColor"]>, string> = {
  "border-slate-200": "border border-slate-200",
  "border-red-200": "border border-red-200",
}

const textClasses: Record<ButtonProps["textColor"], string> = {
  white: "text-white",
  "orange-500": "text-orange-500",
  "slate-800": "text-slate-800",
  "red-600": "text-red-600",
}

export default function Button({ buttonProps }: { buttonProps: ButtonProps }) {
  const className = [
    buttonProps.className,
    "rounded-md px-4 py-1.5 text-sm font-medium transition",
    backgroundClasses[buttonProps.bgColor],
    textClasses[buttonProps.textColor],
    buttonProps.borderColor ? borderClasses[buttonProps.borderColor] : "",
    buttonProps.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    buttonProps.hoverBgColor && !buttonProps.disabled
      ? hoverBackgroundClasses[buttonProps.hoverBgColor]
      : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={className}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
    >
      {buttonProps.text}
    </button>
  )
}
