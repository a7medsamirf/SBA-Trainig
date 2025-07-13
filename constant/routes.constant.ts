export const authRequiredRoutes = [
  "/cart",
  "/dashboard",
  "/profile",
  "/favourite",
  "/invoices",
  "/courses",
  "/qualifications",
].flatMap((route) => [`/ar${route}`, `/en${route}`]);

export const publicRoutes = ["/login", "/register", "/otp"].flatMap((route) => [
  `/ar${route}`,
  `/en${route}`,
]);

export const hybridRoutes = [
  "/",
  "/training",
  "/about",
  "/contact",
  "/events",
  "/initiatives",
].flatMap((route) => [`/ar${route}`, `/en${route}`]);
