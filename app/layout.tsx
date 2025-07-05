import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import "@/styles/main.scss";
import BootstrapClient from "@/components/bootstrap/BootstrapClient";

export const metadata: Metadata = {
  title: "SBA Training Academy",
  description: "SBA Training Academy",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
