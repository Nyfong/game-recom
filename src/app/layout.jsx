// import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import UnstickyNav from "@/components/common/UnstickyNav";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <UnstickyNav />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
