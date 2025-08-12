import { getCurrentUser } from "@/shared-apis";
import { AppShell } from "../../components/layout/AppShell";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await getCurrentUser();
  const userName = user?.name || "مستخدم";

  return (
    <>
      <AppShell locale={locale} userName={userName} avatar={user?.avatar}>
        {children}
      </AppShell>
    </>
  );
}
