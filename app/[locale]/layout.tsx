import type { Metadata } from "next";
import { locales } from "@/i18n";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "@/components/bootstrap/BootstrapClient";
import "./globals.css";
import "@/styles/main.scss";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { AppProviders } from "../components/layout/AppProviders";
import { getMessages } from "@/i18n/getMessages";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ClientToaster } from "@/components/toaster/toaster-component";

const mainFont = localFont({
  src: "../../public/fonts/Frutiger LT Arabic 55 Roman.ttf",
  display: "swap",
  preload: true,
  variable: "--font-frutiger",
});

const iconFont = localFont({
  src: "../../public/fonts/uicons/uicons-regular-rounded.woff",
  variable: "--font-icon",
});

export const metadata: Metadata = {
  title: "SBA Training Academy",
  description: "SBA Training Academy",
  icons: {
    icon: "/images/favicon.png",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  if (!routing.locales.includes(locale as "en" | "ar")) notFound();

  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning={true}>
      <body
        className={`${mainFont.className} ${mainFont.variable} ${iconFont.variable}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders>
            {children}
            <BootstrapClient />
            <ClientToaster locale={locale} />
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
