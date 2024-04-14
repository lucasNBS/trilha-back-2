import { getOverview, getProducts } from "src/types/products";

export async function getOverview(): Promise<getOverview> {
  try {
    const data = await fetch("http://127.0.0.1:8000/product/overview/").then(res => res.json())

    return data
  } catch (err) {
    return {
      total: 0,
      quantity_in_stock: 0,
      quantity_sold: 0,
    }
  }
}

export async function getProducts(page: number): Promise<getProducts> {
  try {
    const data = await fetch(`http://127.0.0.1:8000/products/?page=${page}`).then(res => res.json())
  
    return data
  } catch (err) {
    return {
      count: 0,
      previous: `http://127.0.0.1:8000/products/?page=${page - 1 || 1}`,
      next: null,
      results: [],
    }
  }
}