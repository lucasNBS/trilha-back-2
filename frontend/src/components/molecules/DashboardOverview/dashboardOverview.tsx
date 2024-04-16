import { Card } from "src/components/atoms/Card/card";
import style from "./dashboardOverview.module.css";
import { useContext, useEffect } from "react";
import { ManagmentContext } from "src/contexts/managmentContext";

type DashboardOverviewProps = {
  initialStock: number
  initialSold: number
}

export function DashboardOverview({ initialStock, initialSold }: DashboardOverviewProps) {
  const { stock, setStock, sold, setSold } = useContext(ManagmentContext)

  useEffect(() => {
    setStock(initialStock)
    setSold(initialSold)
  }, [])

  return (
    <section className={style['container']}>
      <Card title="Total Stock" content={stock} />
      <Card title="Total Sold" content={sold} />
    </section>
  )
}