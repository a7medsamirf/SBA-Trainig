export const authRequiredRoutes = [
  "/cart",
  "/dashboard",
  "/profile",
  "/favourite",
  "/course-request",
  "/certificates",
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
  "/terms",
  "/Privacy",
].flatMap((route) => [`/ar${route}`, `/en${route}`]);
