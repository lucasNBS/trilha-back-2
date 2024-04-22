import { NextPageContext } from "next";

export function getCookieFromServer(name: string, ctx: NextPageContext) {
  const cookie = ctx.res?.getHeader("set-cookie") as string[]

  let token
  if (cookie != undefined) {
    token = cookie[0].substring(13).split("; ")[0]
  } else {
    token = ctx.req?.headers.cookie
      ?.split("; ")
      .find(item => item.startsWith(name))
      ?.substring(13)
  }

  return token
}