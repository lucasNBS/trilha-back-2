import { Card } from "src/components/atoms/Card/card";
import style from "./dashboardOverview.module.css";
import { useContext, useEffect } from "react";
import { ManagmentContext } from "src/contexts/managmentContext";

type DashboardOverviewProps = {
  initialStock: number
  initialSold: number
  initialSales: number | null
}

export function DashboardOverview({
  initialStock,
  initialSold,
  initialSales
}: DashboardOverviewProps) {
  const { stock, setStock, sold, setSold, sales, setSales } = useContext(ManagmentContext)

  useEffect(() => {
    setStock(initialStock)
    setSold(initialSold)

    if (initialSales) {
      setSales(initialSales)
    }
  }, [])

  return (
    <section className={style['container']}>
      <Card title="Total Stock" content={stock} />
      <Card title="Total Sold" content={sold} />
      {initialSales && <Card title="Sales Total" content={sales} />}
    </section>
  )
}