import { NextPageContext } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { ProductForm } from "src/components/organisms/ProductForm/productForm"
import { baseAxios } from "src/lib/axios"
import { getProduct } from "src/services/client/products"
import { Product } from "src/types/products"

type ProductEditProps = {
  product: Product
}

export default function ProductEdit({ product }: ProductEditProps) {
  const router = useRouter()

  async function submit() {
    const form = document.querySelector("#product-form") as HTMLFormElement
    const formData = new FormData(form)

    try {
      await baseAxios.patch(`/products/${product.id}/`, formData,
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
        <title>CRM - {product.title}</title>
      </Head>
      <ProductForm submit={submit} initialValues={product} />
    </>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const id = Number(ctx.query.id)

  const product = await getProduct(id)

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