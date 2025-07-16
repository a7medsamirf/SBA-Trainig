import Navbar from "@/components/navbar/NavbarServer";
import Footer from "@/components/footer/footer-component";

export function AppShell({
  children,
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
      {showFooter && <Footer />}
    </>
  );
}
