import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import UnstickyNav from "@/components/common/UnstickyNav";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Your Page Title</title>
        <meta
          name="nigga"
          content="A short description of your page's content"
        />
        <meta property="og:title" content="Your Page Title" />
        <meta
          property="og:description"
          content="A detailed description of your page's content"
        />
        <meta
          property="og:image"
          content="https://wallpapers.com/images/featured/minecraft-s2kxfahyg30sob8q.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <UnstickyNav />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
