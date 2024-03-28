import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "solana Antd demo",
  description: "create solana next app with antd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
