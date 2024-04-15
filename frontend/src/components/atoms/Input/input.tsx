import { UseFormRegister } from "react-hook-form";
import { ProductForm } from "src/components/organisms/ProductForm/productForm";
import style from "./input.module.css";

type InputProps = {
  text: string
  type: string
  name: keyof ProductForm
  register: UseFormRegister<ProductForm>
  error?: string
}

  export function Input({ text, type, name, error, register }: InputProps) {
  return (
    <div className={style['container']}>
      <label className={style['text']}>{text}</label>
      <input type={type} {...register(name)} className={style['input']} />
      {error && <span className={style['error']}>{error}</span>}
    </div>
  )
}