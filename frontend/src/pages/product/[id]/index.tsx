import Head from "next/head";
import { getProduct } from "src/services/client/products";
import { Product } from "src/types/products";
import { Button } from "src/components/atoms/Button/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { baseAxios } from "src/lib/axios";
import style from "src/styles/product.module.css";
import { getCookieFromServer } from "src/utils/getCookieFromServer";
import { NextPageContext } from "next";

type ProductProps = {
  product: Product
}

export default function Product({ product }: ProductProps) {
  const router = useRouter()

  async function handleDeleteProduct() {
    try {
      await baseAxios.delete(`/products/${product.id}/`)
      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CRM - Product</title>
      </Head>
      <h1 className={style['title']}>{product.title}</h1>
      <section className={style['container']}>
        <div className={style['product-data']}>
          <div className={style['product-image-container']}>
            <Image
              src={product.image}
              sizes="(max-width: 768px) 50vw, 20vw"
              alt="Product image"
              className={style['image']}
              loading="eager"
              priority
              fill
            />
          </div>
          <div className={style['product-details-container']}>
            <span className={style['product-detail']}>
              <strong>Price:</strong> {product.price} R$
            </span>
            <span className={style['product-detail']}>
              <strong>Stock:</strong> {product.quantity_in_stock}
            </span>
            <span className={style['product-detail']}>
              <strong>Sold:</strong> {product.quantity_sold}
            </span>
          </div>
        </div>
        <div className={style['product-info']}>
          <p className={style['product-description']}>{product.description}</p>
          <div className={style['actions-container']}>
            <Button isLink={true} text="Edit" href={`/product/${product.id}/edit`} />
            <Button isLink={false} text="Delete" onClick={handleDeleteProduct} type="delete" />
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const id = Number(ctx.query.id)
  const token = getCookieFromServer("access_token", ctx)

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