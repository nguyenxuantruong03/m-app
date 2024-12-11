/**
 * An array of routes that are accessuble to the public
 * These routes donot require authentication
 * @type  {string[]}
 */
export const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-verification",
  "/auth/new-password",
  "/auth/error",
  "/auth/errorban",
  "/auth/errorbanforever",
  "/cart",
  "/category[0-11]+/.+",
  "/checkoutcash",
  "/enterprise",
  "/guarantee",
  "/home",
  "/home-product",
  "/listproduct",
  "/payment-fail",
  "/payment-success",
  "/policy",
  "/post/*",
  "/preorder",
  "/product[0-11]+/.+",
  "/promotional-code",
  "/search",
  "/tags/*",
  "/utility",
  "/warehouse/package-product",
  "/api/*"
];

/**
 * An array of routes that are accessuble to the public
 * These routes will redirect logged in users to /setings
 * @type  {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/auth/errorban",
  "/auth/errorbanforever",
  "auth/new-verification"
];

/**
 * An array of routes that are accessuble to the public
 * Routes that start with this prefix are used for API authentication purposes
 * @type  {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

export const DEFAULT_LOGIN_REDIRECT_USER_or_GUEST = "/home-product"
