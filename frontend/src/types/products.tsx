export type Product = {
  id: number
  title: string
  description: string
  image: string
  price: number
  quantity_in_stock: number
  quantity_sold: number
}

export type getOverview = {
  total: number
  quantity_in_stock: number
  quantity_sold: number
}

export type getProducts = {
  count: number
  previous: string | null
  next: string | null
  results: Product[],
}