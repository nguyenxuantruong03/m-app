import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_REDIRECT_USER_or_GUEST,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { Session } from "next-auth";
import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from './i18n';

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}


// Middleware for i18n
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale: "vi",
});

export default async function middleware(req: NextRequest & { auth: Session | null }): Promise<Response | void> {
  const i18nResponse = intlMiddleware(req);
  if (i18nResponse) {
    return i18nResponse;
  }

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Default redirect path
  let redirectPath = DEFAULT_LOGIN_REDIRECT;

  // Update redirect path based on role
  if (isLoggedIn) {
    const userRole = req.auth?.user?.role;
    if (userRole === "USER" || userRole === "GUEST") {
      redirectPath = DEFAULT_LOGIN_REDIRECT_USER_or_GUEST;
    }
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect based on the role
      return Response.redirect(new URL(redirectPath, nextUrl));
    }
    // Allow unauthenticated users to access auth routes
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  return;
}

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/auth/login","/auth/register"],
// }

// Cấu hình này chỉ định các đường dẫn mà phần mềm trung gian sẽ được gọi. Trong trường hợp này, nó sử dụng trình
// so khớp biểu thức chính quy để loại trừ các đường dẫn có phần mở rộng tệp và những đường dẫn bắt đầu bằng "_next"
// (có thể là nội bộ Next.js), cho phép phần mềm trung gian được áp dụng cho các đường dẫn khác.
export const config = {
  matcher: [
    "/((?!api/.*|.+\\.[\\w]+$|_next|/).*)",
    "/game",
    "/conversations",
    "/list-users",
    "/(vi|en)/:path*",
    "/(trpc)(.*)"
  ],
};
