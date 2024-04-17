import { UseFormRegister } from "react-hook-form";
import style from "./input.module.css";

type InputProps = {
  text?: string
  type: string
  name: string
  register: UseFormRegister<any>
  error?: string
}

  export function Input({ text, type, name, error, register }: InputProps) {
  return (
    <div className={style['container']}>
      {text && <label className={style['text']}>{text}</label>}
      <input type={type} {...register(name)} className={style['input']} />
      {error && <span className={style['error']}>{error}</span>}
    </div>
  )
}