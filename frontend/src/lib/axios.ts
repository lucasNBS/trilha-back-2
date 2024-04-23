import axios from "axios";
import { parseCookies } from "nookies";
import { tokenRefresh } from "src/services/client/token";

let isRefreshing = false

export const serverAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true
})

export const baseAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${parseCookies()["access_token"]}`,
  },
})

baseAxios.interceptors.request.use(async (req) => {
  req.headers.Authorization = `Bearer ${parseCookies()["access_token"]}`
  return req
})

baseAxios.interceptors.response.use(
  (response) => {
    return response
  },
  async (err) => {
    if (err.response.status === 401) {
      const originalConfig = err.config

      if (!isRefreshing) {
        isRefreshing = true

        try {
          const token = await tokenRefresh()

          baseAxios.defaults.headers.common = {
            Authorization: `Bearer ${parseCookies()["access_token"]}`,
          }
          originalConfig.headers["Authorization"] = `Bearer ${token}`
          isRefreshing = false

          return baseAxios(originalConfig)
        } catch (error) {
          console.log(error)
        }

        isRefreshing = false
      }
    }
  }
)
