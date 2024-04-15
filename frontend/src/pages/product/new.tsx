import Head from "next/head";
import { ProductForm } from "src/components/organisms/ProductForm/productForm";

export default function New() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CRM - New Product</title>
      </Head>
      <ProductForm />
    </>
  )
}
