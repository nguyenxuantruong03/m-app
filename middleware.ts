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

export default auth(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    // const isLoggedIn = !!req.auth;
    // console.log("ROUTE", req.nextUrl.pathname);
    // console.log("Is LOGGEDIN: ", isLoggedIn);

    // Đây là chức năng phần mềm trung gian chính. Nó kiểm tra xem tuyến hiện tại là tuyến xác thực API, tuyến xác thực hay tuyến công cộng.
    // Dựa trên những lần kiểm tra này, nó sẽ quyết định chuyển hướng người dùng sang một tuyến đường khác hay cho phép tiếp tục yêu cầu.
    // const { nextUrl } = req;
    // const isLoggedIn = !!req.auth;

    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // if (isApiAuthRoute) {
    //   return;
    // }

    // const isBanned = true;
    // if (isAuthRoute && !isBanned) {
    //   if (isLoggedIn) {
    //     // Redirect to the default login redirect path
    //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //   }
    //   // Allow unauthenticated users to access auth routes
    //   return;
    // }

    // if (!isLoggedIn && !isPublicRoute) {
    //   let callbackUrl = nextUrl.pathname;
    //   if (nextUrl.search) {
    //     const params = new URLSearchParams(nextUrl.search);
    //     // Kiểm tra xem tham số callbackUrl đã tồn tại trong URL chưa
    //     if (!params.has('callbackUrl')) {
    //       callbackUrl += nextUrl.search;
    //     }
    //   }
    
    //   const endcodeedCallbackUrl = encodeURIComponent(callbackUrl);
    //   return Response.redirect(
    //     new URL(`/auth/login?callbackUrl=${endcodeedCallbackUrl}`, nextUrl)
    //   );
    // }
    // return;
  }
);

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/auth/login","/auth/register"],
// }

// Cấu hình này chỉ định các đường dẫn mà phần mềm trung gian sẽ được gọi. Trong trường hợp này, nó sử dụng trình
// so khớp biểu thức chính quy để loại trừ các đường dẫn có phần mở rộng tệp và những đường dẫn bắt đầu bằng "_next"
// (có thể là nội bộ Next.js), cho phép phần mềm trung gian được áp dụng cho các đường dẫn khác.
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
