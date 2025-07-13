import localFont from "next/font/local";

export const mainFont = localFont({
  src: "../public/fonts/Frutiger LT Arabic 55 Roman.ttf",
  display: "swap",
  preload: true,
  variable: "--font-frutiger",
});

export const iconFont = localFont({
  src: "../public/fonts/uicons/uicons-regular-rounded.woff",
  variable: "--font-icon",
});
