import Navbar from "@/components/navbar/NavbarServer";
import Footer from "@/components/footer/footer-component";
import { ClientToaster } from "@/components/toaster/toaster-component";

export function AppShell({
  children,
  locale,
  userName,
  showNavbar = true,
  showFooter = true,
}: {
  children: React.ReactNode;
  locale: string;
  userName: string;
  showNavbar?: boolean;
  showFooter?: boolean;
}) {
  return (
    <>
      {showNavbar && <Navbar userName={userName} />}
      {children}
      <ClientToaster locale={locale} />
      {showFooter && <Footer />}
    </>
  );
}
