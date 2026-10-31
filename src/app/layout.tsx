import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AppToaster from "@/components/AppToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookNook | A Small Online Library",
  description: "Borrow, read, and return books easily with BookNook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <AppToaster />
        </Providers>
      </body>
    </html>
  );
}