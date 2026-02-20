import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import LayoutContent from "./layout-content";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adventure Together",
  description: "Rejoignez une nouvelle communauté de voyageurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${plusJakartaSans.className} antialiased`}>
      <LayoutContent>{children}</LayoutContent>
    </main>
  );
}
