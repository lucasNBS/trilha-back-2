import Head from "next/head";
import { useRouter } from "next/router";
import { ProductForm } from "src/components/organisms/ProductForm/productForm";
import { createProduct } from "src/services/client/products";

export default function NewProduct() {
  const router = useRouter()

  async function submit() {
    const form = document.querySelector("#product-form") as HTMLFormElement
    const formData = new FormData(form)

    const res = await createProduct(formData)

    if (res.id) {
      router.push("/")
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
