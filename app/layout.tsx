import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Disney+ Clone",
  description: "For educations purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="bg-[#1A1C29]">
          <Header /> 
          
          {children}
        </body>
    </html>
  );
}