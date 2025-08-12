import { auth } from "@/auth";
import { DashboardSidebarComponents } from "./components/DashboardSidebar-components";
import { AppShell } from "../../components/layout/AppShell";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from 'next-intl/server';
import { getMessages } from "@/i18n/getMessages";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { AppProviders } from "../../components/layout/AppProviders";
import { getCurrentUser } from "@/shared-apis";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) notFound();

  const messages = await getMessages(locale);
  const user = await getCurrentUser();
  const userName = user?.name || "مستخدم";

  const userId = user?.id || "";
  const avatar = user?.avatar || "";
  
   const t = await getTranslations('trans.profile');
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppProviders>
        <AppShell locale={locale} userName={userName} avatar={avatar}>
          <div className="p-5 mx-auto container-fluid">
            <div className="mb-4 d-flex justify-content-between align-items-center">
              <h4 className="fw-bold color-gray-900">  {t("profile-title")} </h4>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <DashboardSidebarComponents
                  userName={userName}
                  userId={userId}
                  avatar={avatar}
                />
              </div>
              <div className="col-lg-9">
                <div className="content custom-border custom-border-radius h-100">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </AppShell>
      </AppProviders>
    </NextIntlClientProvider>
  );
}
