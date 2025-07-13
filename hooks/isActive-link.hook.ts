import { usePathname } from "@/i18n/routing";

export const useActiveLink = (path: string) => {
  const pathname = usePathname();

  return (
    pathname.startsWith(path) || (path.includes(pathname) && pathname !== "/")
  );
};

export const isActiveLink = (pathname: string, routes: string[]) => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
 
  return routes.some((route) => {
    const normalizedRoute = route.replace(/\/+$/, "") || "/";
 
    if (normalizedRoute === "/") {
      return normalizedPath === "/";
    }
 
    return (
      normalizedPath === normalizedRoute ||
      normalizedPath.startsWith(normalizedRoute + "/")
    );
  });
};

/* export const isActiveLink = (pathname: string, path: string[]) => {
  return path.some(
    (p) => pathname.startsWith(p) || (p.includes(pathname) && pathname !== "/")
  );
};
 */