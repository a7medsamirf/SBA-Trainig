import { AppShell } from "../../components/layout/AppShell";
import { auth } from "@/auth";

export default async function DashboardLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;
  const session = await auth();
  const userName = session?.user?.name || "مستخدم";

  return (
      <>
      <AppShell locale={locale} userName={userName}>
        {children}
      </AppShell>
    </>
  );
}
