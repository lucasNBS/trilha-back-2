import style from "./input.module.css";

type InputProps = {
  text: string
  type: string
  styleType?: 'image'
}

export function Input({ text, type, styleType }: InputProps) {
  return (
    <div className={style['container']}>
      <label className={style['text']}>{text}</label>
      <input className={`${style['input']} ${styleType && style[styleType]}`} type={type} />
    </div>
  )
}