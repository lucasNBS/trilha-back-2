import { Card } from "src/components/atoms/Card/card";
import style from "./dashboardOverview.module.css";

type DashboardOverviewProps = {
  stock: number
  sold: number
}

export function DashboardOverview({ stock, sold }: DashboardOverviewProps) {
  return (
    <section className={style['container']}>
      <Card title="Total Stock" content={stock} />
      <Card title="Total Sold" content={sold} />
    </section>
  )
}