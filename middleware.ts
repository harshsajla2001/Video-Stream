import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import path from "path"

export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname)
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const { pathname } = req.nextUrl

                if (
                    pathname.startsWith("/api/auth") ||
                    pathname == "/login" ||
                    pathname == "/register"
                ) {
                    return true
                }

                if(pathname == "/" || pathname.startsWith("/api/videos")) {
                    return true
                }

                return !!token //this converts the token to boolean
            },
        },
    }
)

export const config = { matcher: ["/dashboard", "/profile"] }