import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import AdminSidebar from "@/components/admin-panel/admin-sidebar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel - Adventure Together",
  description: "Administration panel for Adventure Together platform",
};

export default function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${plusJakartaSans.className} antialiased`}>
      <AdminSidebar />
      <main className="lg:ml-24 transition-all duration-300 bg-second-50">{children}</main>
    </div>
  );
}
