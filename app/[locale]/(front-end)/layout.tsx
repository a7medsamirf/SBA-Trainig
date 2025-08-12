import { AppShell } from "@/app/components/layout/AppShell";
import { getCurrentUser } from "@/shared-apis";

export default async function FrontEndLayout({
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
