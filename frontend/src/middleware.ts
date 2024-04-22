import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  if (pathname === "/" || pathname.startsWith("/product")) {
    const accessToken = request.cookies.get("access_token")
    const refreshToken = request.cookies.get("refresh_token")
  
    if (!(accessToken?.value)) {
      try {
        const res = await fetch("http://127.0.0.1:8000/token/", {
          method: "POST",
          body: JSON.stringify(refreshToken?.value)
        })
          .then(res => res.json())
  
        const response = NextResponse.rewrite(new URL(request.nextUrl.pathname, request.url))
        response.cookies.set({ name: "access_token", value: res.access_token, maxAge: 20 })
  
        return response
      } catch (err) {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    }
  }
}