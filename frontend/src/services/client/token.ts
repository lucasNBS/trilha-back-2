import { parseCookies, setCookie } from "nookies"
import { baseAxios } from "src/lib/axios"

export async function tokenRefresh() {
  try {
    const refreshToken = parseCookies(null)['refresh_token']
    const res = await baseAxios.post("/token/", JSON.stringify(refreshToken))
      .then(res => res.data)

    setCookie(null, 'access_token', res.access_token, { maxAge: 20, path: "/" })
  
    return res.access_token
  } catch (err) {
    return null
  }
}