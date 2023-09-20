import { NextResponse } from "next/server";

export default function middleware(request) {
  const role = request.cookies.get('role')
  const isLoggedIn = request.cookies.get('isLoggedIn')
  const newURL = request.nextUrl.clone()
  if (request.nextUrl.pathname.startsWith('/layout')) return NextResponse.json({ role: role?.value ? role.value : 'user' })
  if (request.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    newURL.pathname = "/login"
    return NextResponse.redirect(newURL)
  } else if (request.nextUrl.pathname.startsWith('/admin') && isLoggedIn && role?.value === 'user') {
    newURL.pathname = "/"
    return NextResponse.redirect(newURL)
  } else if (request.nextUrl.pathname.startsWith('/admin') && isLoggedIn && role?.value === 'admin') {
    return NextResponse.rewrite(newURL)
  }
}

export const config = {
  matcher: ["/admin/:path*", "/layout/:path*",],
};