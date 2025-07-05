export interface MenuItem {
  key: string; // translation key
  href?: string;
  submenu?: MenuItem[];
}

export const NAVBAR_MENU: MenuItem[] = [
/*   {
    key: "home",
    href: "/",
  }, */
  {
    key: "about",
    href: "/about",
    submenu: [
      { key: "goals", href: "/about#goals" },
      { key: "message", href: "/about#ceo-message" },
      { key: "vision", href: "/about#vnm" },
    ],
  },
  {
    key: "products",
    submenu: [
      { key: "training", href: "/training" },
      { key: "initiatives", href: "/initiatives" },
    ],
  },
  {
    key: "services",
    submenu: [
      { key: "obtainCertificate", href: "/obtain-certificate" },
      { key: "verifyCertificate", href: "/verify-certificate" },
    ],
  },
  {
    key: "news",
    href: "/events",
  },
  {
    key: "contact",
    href: "/contact",
  },
];

export { NAVBAR_MENU as desktopMenuData };
