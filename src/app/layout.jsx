import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import UnstickyNav from "@/components/common/UnstickyNav";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UnstickyNav />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
