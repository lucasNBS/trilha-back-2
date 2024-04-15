import Head from "next/head";
import { getProduct } from "src/services/products";
import { Product } from "src/types/products";
import style from "src/styles/product.module.css";
import { Button } from "src/components/atoms/Button/button";
import Image from "next/image";

type ProductPage = {
  product: Product
}

export default function Product({ product }: ProductPage) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CRM - Product</title>
      </Head>
      <h2 className={style['title']}>{product.title}</h2>
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
            <Button isLink={true} text="Edit" href="/" />
            <Button isLink={false} text="Delete" onClick={() => {}} type="delete" />
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(request: any) {
  const id = request.query.id

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