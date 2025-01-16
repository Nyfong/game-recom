"use client"; // Add this at the top

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import UnstickyNav from "@/components/common/UnstickyNav";

import "./globals.css"; // Import once

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Conditionally render Navbar and Footer only if not on /signin, /signup, or /live-chat
  const shouldHideNavAndFooter =
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/live-chat";

  return (
    <html lang="en">
      <body>
        {/* Conditionally render UnstickyNav */}
        {!shouldHideNavAndFooter && <UnstickyNav />}

        {/* Conditionally render Navbar */}
        {!shouldHideNavAndFooter && <Navbar />}

        {/* Main content */}
        <main>{children}</main>

        {/* Conditionally render Footer */}
        {!shouldHideNavAndFooter && <Footer />}
      </body>
    </html>
  );
}
