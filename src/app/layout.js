import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fable - Ebook Sharing Platform",
  description: "Discover, purchase, and read original ebooks from independent writers",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        {/* navbar */}
        <Navbar></Navbar>

        {/* main content */}
        <main>{children}</main>

        {/* footer */}
        <Footer></Footer>

        {/* toast notifications */}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
