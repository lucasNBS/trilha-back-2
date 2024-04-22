import { serverAxios } from "src/lib/axios";
import { Product, getOverview, getProducts } from "src/types/products";

export async function getOverview(): Promise<getOverview> {
  try {
    const res = await serverAxios.get("/product/overview/").then(res => res.data)

    return res
  } catch (err) {
    return {
      total: 0,
      quantity_in_stock: 0,
      quantity_sold: 0,
    }
  }
}

export async function getProducts(page: number, cookie: string): Promise<getProducts> {
  try {
    const res = await serverAxios.get(`/products/?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      }
    ).then(res => res.data)
  
    return res
  } catch (err) {
    return {
      count: 0,
      previous: `http://127.0.0.1:8000/products/?page=${page - 1 || 1}`,
      next: null,
      results: [],
    }
  }
}

export async function getProduct(id: number, cookie: string): Promise<Product> {
  try {
    const res = await serverAxios.get(`/products/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      }
    ).then(res => res.data)
  
    return res
  } catch (err) {
    return {} as Product
  }
}