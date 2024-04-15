import { Card } from "src/components/atoms/Card/card";
import style from "./dashboardOverview.module.css";
import { Product } from "src/types/products";

type DashboardOverviewProps = {
  stock: number
  sold: number
  removedProducts: Product[]
}

export function DashboardOverview({ stock, sold, removedProducts }: DashboardOverviewProps) {
  const totalStock = stock - removedProducts.reduce((previous, current) => {
    return previous += current.quantity_in_stock
  }, 0)

  const totalSold = sold - removedProducts.reduce((previous, current) => {
    return previous += current.quantity_sold
  }, 0)
  
  return (
    <section className={style['container']}>
      <Card title="Total Stock" content={totalStock} />
      <Card title="Total Sold" content={totalSold} />
    </section>
  )
}