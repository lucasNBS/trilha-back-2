import { Input } from "src/components/atoms/Input/input";
import style from "./productForm.module.css";
import Image from "next/image";
import { Button } from "src/components/atoms/Button/button";

export function ProductForm() {
  return (
    <>
      <h1 className={style['title']}>New Product</h1>
      <form className={style['form-container']}>
        <div className={style['form-image']}>
          <label className={style['label']}>Image</label>
          <div className={style['image-container']}>
            <Image
              src="/images/no-image.jpg"
              sizes="(max-width: 768px) 50vw, 15vw"
              alt="Product image"
              className={style['image']}
              loading="eager"
              fill
              priority
            />
            <input type="file" className={style['image-input']} />
          </div>
        </div>
        <div className={style['form-fields']}>
          <Input text="Title" type="text" />
          <Input text="Price" type="number" />
          <Input text="Stock" type="number" />
          <Input text="Sold" type="number" />
          <div className={style['form-description']}>
            <label className={style['label']}>Description</label>
            <textarea className={style['textarea']}></textarea>
          </div>
          <Button isLink={false} text="Save" onClick={() => {}} />
        </div>
      </form>
    </>
  )
}