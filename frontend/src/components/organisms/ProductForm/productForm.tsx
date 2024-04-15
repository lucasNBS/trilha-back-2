import { Input } from "src/components/atoms/Input/input";
import style from "./productForm.module.css";
import Image from "next/image";
import { Button } from "src/components/atoms/Button/button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

export type ProductForm = {
  image?: any;
  title: string;
  price: number;
  quantity_in_stock: number;
  quantity_sold: number;
  description: string;
}

const ProductFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("This field is required")
    .max(100, "Too long"),
  price: Yup.number()
    .typeError("This field is required")
    .required("This field is required")
    .min(0, "Price cannot be negative"),
  quantity_in_stock: Yup.number()
    .typeError("This field is required")
    .required("This field is required")
    .min(0, "Quantity in stock cannot be negative"),
  quantity_sold: Yup.number()
    .typeError("This field is required")
    .required("This field is required")
    .min(0, "Quantity sold cannot be negative"),
  description: Yup.string()
    .required("This field is required"),
  image: Yup.mixed()
})

function handleChangeImage(image: File) {
  const reader = new FileReader()

  reader.onloadend = () => {
    const value = reader.result

    if (value) {
      document.getElementById("preview-image")?.setAttribute("src", value.toString())
      document.getElementById("preview-image")?.setAttribute("srcset", value.toString())
    }
  }

  reader.readAsDataURL(image)
}

export function ProductForm() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ProductForm>({
    resolver: yupResolver(ProductFormSchema)
  })
  const router = useRouter()

  async function submit() {
    const form = document.querySelector("#product-form") as HTMLFormElement
    const formData = new FormData(form)

    try {
      await fetch("http://127.0.0.1:8000/products/", {
        method: 'POST',
        body: formData
      })

      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1 className={style['title']}>New Product</h1>
      <form
        id="product-form"
        method="post"
        encType="multipart/form-data"
        className={style['form-container']}
        onSubmit={handleSubmit(submit)}
      >
        <div className={style['form-image']}>
          <label className={style['label']}>Image</label>
          <div className={style['image-container']}>
            <Image
              id="preview-image"
              src="/images/no-image.jpg"
              alt="Product image"
              className={style['image']}
              loading="eager"
              fill
              priority
            />
            <input
              type="file"
              {...register("image")}
              onChange={(e) => e.target.files && handleChangeImage(e.target.files[0])}
              className={style['image-input']}
            />
            {errors.image?.message && (
              <span className={style['error']}>{errors.image.message as string}</span>
            )}
          </div>
        </div>
        <div className={style['form-fields']}>
          <Input
            text="Title"
            type="text"
            register={register}
            name="title"
            error={errors.title?.message as string}
          />
          <Input
            text="Price"
            type="number"
            register={register}
            name="price"
            error={errors.price?.message as string}
          />
          <Input
            text="Stock"
            type="number"
            register={register}
            name="quantity_in_stock"
            error={errors.quantity_in_stock?.message as string}
          />
          <Input
            text="Sold"
            type="number"
            register={register}
            name="quantity_sold"
            error={errors.quantity_sold?.message as string}
          />
          <div className={style['form-description']}>
            <label className={style['label']}>Description</label>
            <textarea {...register("description")} className={style['textarea']}></textarea>
            {errors.description?.message && (
              <span className={style['error']}>{errors.description.message as string}</span>
            )}
          </div>
          <Button isLink={false} text="Save" onClick={() => {}} />
        </div>
      </form>
    </>
  )
}