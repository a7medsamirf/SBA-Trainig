import type { Metadata } from "next";

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
  return children;
}
