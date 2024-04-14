import style from "./button.module.css";

type ButtonProps = {
  text: string
  onClick?: () => void
}

export function Button({ text, onClick }: ButtonProps) {
  return (
    <button onClick={onClick ? onClick : undefined} className={style['container']}>{text}</button>
  )
}