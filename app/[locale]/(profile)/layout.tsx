import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import React from "react";
import { locales } from "@/i18n";
import { routing } from "@/i18n/routing";
import { DialogLayoutProvider } from "../../components";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar.component";
import Footer from "@/components/footer/footer-component";
import { ToggleLayoutProvider } from "@/context";
import localFont from "next/font/local";
import { ClientToaster } from "@/components/toaster/toaster-component";
import { DashboardSidebarComponents } from "./components/DashboardSidebar-components";

const mainFont = localFont({
  src: "../../../public/fonts/Frutiger LT Arabic 55 Roman.ttf",
  display: "swap",
  preload: true,
  variable: "--font-frutiger",
});

const iconFont = localFont({
  src: "../../../public/fonts/uicons/uicons-regular-rounded.woff",
  variable: "--font-icon",
});

async function getMessages(locale: string) {
  try {
    return (await import(`../../../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages(locale);

  const isAuth = await auth();

  // Check if the user is authenticated
  // const user = !!isAuth ? await getCurrentUser() : null;
 
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning={true}>
      <body
        className={`${mainFont.className} ${mainFont.variable} ${iconFont.variable}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToggleLayoutProvider>
            <SessionProvider>
              <DialogLayoutProvider>
                <Navbar />
                <div className="container-fluid mx-auto p-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                          <h4 className="fw-bold color-gray-900">  الملف الشخصي </h4>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                      <DashboardSidebarComponents />
                      </div>
                      <div className="col-lg-9">
                        {children}
                      </div>
                    </div>
                </div>
                <ClientToaster locale={locale} />
                <Footer />
              </DialogLayoutProvider>
            </SessionProvider>
          </ToggleLayoutProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
