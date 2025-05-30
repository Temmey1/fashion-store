// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MaxyStyles",
  description: "Your one-stop destination for trendy fashion and accessories",
  icons: {
    icon: "/images/maxylogo.jpg",
    apple: "/images/maxylogo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} min-h-full flex flex-col overflow-x-hidden bg-[#F5F5F5]`}
      >
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow w-full relative">
              <div className="w-full">{children}</div>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
