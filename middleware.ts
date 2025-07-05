import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";
import { NextResponse } from "next/server";
import { publicRoutes } from "./constant";
import { cookies } from "next/headers";
import { hybridRoutes } from "./constant";
import { isActiveLink } from "./hooks/isActive-link.hook";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: "ar",

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: "always",
});

export const middleware = async (req: any) => {
  const pathname = req.nextUrl.pathname;
  const cookiesStore = await cookies();
  const lang = cookiesStore.get("NEXT_LOCALE")?.value || "ar";

  const user = false;

  const isAuth = !!user;
  
/*   const isPublicRoute = publicRoutes.includes(pathname); */
  const isPublicRoute = isActiveLink(pathname , publicRoutes);
  const isHybridRoute = hybridRoutes.includes(pathname);

  if (isHybridRoute) {
    return intlMiddleware(req);
  }

  // CASE 2: Regular auth handling for other users
  if (isAuth && isPublicRoute) {
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}`;
    url.search = "";
    return NextResponse.redirect(url);
  }

  // CASE 3: If not authenticated and not a public route
  if (!isAuth && !isPublicRoute) {
    // Redirect to login regardless of remember cookie
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}/login`;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
};

export const config = {
  // Skip all paths that should not be internationalized
/*   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"], */
  matcher: ['/', '/(ar|en)/:path*']
};
