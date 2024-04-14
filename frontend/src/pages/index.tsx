import Head from "next/head";
import { DashboardOverview } from "src/components/molecules/DashboardOverview/dashboardOverview";

type HomeProps = {
  stock: number
  sold: number
}

export default function Home({ stock, sold }: HomeProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <DashboardOverview stock={stock} sold={sold} />
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://127.0.0.1:8000/product/overview/").then(res => res.json())

  return {
    props: {
      stock: data.quantity_in_stock,
      sold: data.quantity_sold,
    }
  }
}