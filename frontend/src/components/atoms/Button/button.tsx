import Link from "next/link";
import style from "./button.module.css";

type ButtonBaseProps = {
  text: string
  type?: "delete" | "manage"
}

type ButtonLinkProps = {
  isLink: true
  href: string
} & ButtonBaseProps

type ButtonButtonProps = {
  isLink: false
  onClick: () => void
} & ButtonBaseProps

type ButtonProps = ButtonButtonProps | ButtonLinkProps

export function Button(props: ButtonProps) {
  if (props.isLink) {
    return (
      <Link
        href={props.href}
        prefetch={false}
        className={`${style['container']} ${props.type && style[props.type]}`}
      >
        {props.text}
      </Link>
    )
  }
  
  return (
    <button
      onClick={props.onClick ? props.onClick : undefined}
      className={`${style['container']} ${props.type && style[props.type]}`}
    >
      {props.text}
    </button>
  )
}