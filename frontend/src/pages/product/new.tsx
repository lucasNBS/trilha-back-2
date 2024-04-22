import Head from "next/head";
import { useRouter } from "next/router";
import { ProductForm } from "src/components/organisms/ProductForm/productForm";
import { baseAxios } from "src/lib/axios";

export default function NewProduct() {
  const router = useRouter()

  async function submit() {
    const form = document.querySelector("#product-form") as HTMLFormElement
    const formData = new FormData(form)

    try {
      await baseAxios.post("/products/", formData,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
      )

      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CRM - New Product</title>
      </Head>
      <ProductForm submit={submit} />
    </>
  )
}
