import { NextPageContext } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { ProductForm } from "src/components/organisms/ProductForm/productForm"
import { editProduct } from "src/services/client/products"
import { getProduct } from "src/services/server/products"
import { Product } from "src/types/products"
import { getCookieFromServer } from "src/utils/getCookieFromServer"

type ProductEditProps = {
  product: Product
}

export default function ProductEdit({ product }: ProductEditProps) {
  const router = useRouter()

  async function submit() {
    const form = document.querySelector("#product-form") as HTMLFormElement
    const formData = new FormData(form)

    const res = await editProduct(product.id, formData)

    if (res.id) {
      router.push("/")
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CRM - {product.title}</title>
      </Head>
      <ProductForm submit={submit} initialValues={product} />
    </>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const id = Number(ctx.query.id)
  const token = getCookieFromServer("access_token", ctx)

  const product = await getProduct(id, token as string)

  if (product.id != id) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      }
    }
  }

  return {
    props: {
      product
    }
  }
}