import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";
import { NextResponse } from "next/server";
import { publicRoutes, hybridRoutes, authRequiredRoutes } from "./constant";
import { cookies } from "next/headers";
import { isActiveLink } from "./hooks/isActive-link.hook";
import { getCurrentUser } from "./shared-apis/auth/get-current-user.api";

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "ar",
  localePrefix: "always",
});

export const middleware = async (req: any) => {
  const pathname = req.nextUrl.pathname;
  const cookiesStore = await cookies();
  const lang = cookiesStore.get("NEXT_LOCALE")?.value || "ar";

  const user = await getCurrentUser();
  const isAuth = !!user;

  const isPublicRoute = isActiveLink(pathname, publicRoutes);
  const isHybridRoute = isActiveLink(pathname, hybridRoutes);
  const isAuthRequiredRoute = isActiveLink(pathname, authRequiredRoutes);

  // ✅ الحالة 3: المستخدم مش مسجل ورايح على صفحة بتحتاج auth مخصص
  if (!isAuth && isAuthRequiredRoute) {
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}/login`;
    url.searchParams.set("callbackUrl", pathname); // علشان يرجع بعد التسجيل
    return NextResponse.redirect(url);
  }

  // ✅ الحالة 1: صفحات Hybrid (مفتوحة للجميع)
  if (isHybridRoute) {
    return intlMiddleware(req);
  }

  // ✅ الحالة 2: المستخدم مسجل دخول وبيحاول يدخل صفحة عامة (زي login/register)
  if (isAuth && isPublicRoute) {
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}`;
    url.search = "";
    return NextResponse.redirect(url);
  }

  // ✅ الحالة 4: المستخدم مش مسجل ورايح على صفحة خاصة مش عامة
  if (!isAuth && !isPublicRoute) {
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}/login`;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
};

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
