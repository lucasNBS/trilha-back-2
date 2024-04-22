import { NextPageContext } from "next"
import { parseCookies, setCookie } from "nookies"
import { serverAxios } from "src/lib/axios"

export async function tokenRefresh(ctx: NextPageContext) {
  try {
    const refreshToken = parseCookies(ctx)['refresh_token']
    const res = await serverAxios.post("/token/", JSON.stringify(refreshToken))
      .then(res => res.data)
  
    setCookie(ctx, 'access_token', res.access_token, { maxAge: 20, path: "/" })
  
    return res.access_token
  } catch (err) {
    return null
  }
}