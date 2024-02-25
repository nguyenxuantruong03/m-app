import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { Session } from "next-auth";
import { NextRequest } from "next/server";

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest & { auth: Session | null }): Response | void => {
  // const isLoggedIn = !!req.auth;
  // console.log("ROUTE", req.nextUrl.pathname);
  // console.log("Is LOGGEDIN: ", isLoggedIn);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if(nextUrl.search){
      callbackUrl += nextUrl.search
    }

    const endcodeedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(`/auth/login?callbackUrl=${endcodeedCallbackUrl}`, nextUrl));
  }
  return
});

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/auth/login","/auth/register"],
// }

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
