import Head from "next/head";
import { useState } from "react";
import { DashboardOverview } from "src/components/molecules/DashboardOverview/dashboardOverview";
import { ManagmentModal } from "src/components/molecules/ManagmentModal/managmentModal";
import { Gallery } from "src/components/organisms/Gallery/gallery";
import { getOverview, getProducts } from "src/services/products";
import { Product, getProducts as getProductsType } from "src/types/products";

export type ModalOptionsType = {
  product: Product;
  type: "Stock" | "Sell" | null;
}

type HomeProps = {
  stock: number
  sold: number
  productsData: getProductsType
}

export default function Home({ stock, sold, productsData }: HomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalOptions, setModalOptions] = useState<ModalOptionsType>({
    product: {} as Product,
    type: null as "Stock" | "Sell" | null
  })
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CRM - Home</title>
      </Head>
      <DashboardOverview initialStock={stock} initialSold={sold} />
      <Gallery
        initialProducts={productsData.results}
        maxPage={Math.ceil(productsData.count / 5)}
        setModalOptions={setModalOptions}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && (
        <ManagmentModal
          setIsOpen={setIsModalOpen}
          options={modalOptions}
        />)
      }
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