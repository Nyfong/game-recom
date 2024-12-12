// import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import UnstickyNav from "@/components/common/UnstickyNav";

import "./globals.css";

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
