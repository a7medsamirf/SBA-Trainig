export const publicRoutes = [
  "/login" ,
  "/register", 
  "/otp",
  "/training" ,
  "/about" ,
  "/contact",
  "/events" ,
  "/dashboard" ,
  "/profile" , 
  "/favourite" ,
  "/bills",
  "/courses",
  "/initiatives" ].flatMap((route) => [

  `/ar${route}`,
  `/en${route}`,
]);

export const hybridRoutes = [""].flatMap((route) => [
  `/ar${route}`,
  `/en${route}`,
]);
