import Navbar from "@/components/navbar/NavbarServer";
import Footer from "@/components/footer/footer-component";

export function AppShell({
  children,
  userName,
  showNavbar = true,
  showFooter = true,
  avatar,
}: {
  children: React.ReactNode;
  locale: string;
  userName: string;
  showNavbar?: boolean;
  showFooter?: boolean;
  avatar: string;
}) {
  return (
    <>
      {showNavbar && <Navbar userName={userName} avatar={avatar} />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}
