import Head from "next/head";
import { DashboardOverview } from "src/components/molecules/DashboardOverview/dashboardOverview";
import { Gallery } from "src/components/organisms/Gallery/gallery";
import { getOverview, getProducts } from "src/services/products";
import { getProducts as getProductsType } from "src/types/products";

type HomeProps = {
  stock: number
  sold: number
  productsData: getProductsType
}

export default function Home({ stock, sold, productsData }: HomeProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CRM - Home</title>
      </Head>
      <DashboardOverview stock={stock} sold={sold} />
      <Gallery
        previous={productsData.previous}
        next={productsData.next}
        initialProducts={productsData.results}
        maxPage={Math.ceil(productsData.count / 5)}
      />
    </>
  );
}

export async function getServerSideProps() {
  const overview = await getOverview()
  const productsData = await getProducts(1)

  return {
    props: {
      stock: overview.quantity_in_stock,
      sold: overview.quantity_sold,
      productsData
    }
  }
}