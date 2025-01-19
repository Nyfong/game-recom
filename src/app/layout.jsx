// app/layout.jsx

// Metadata configuration (JavaScript-compatible)
export const metadata = {
  metadataBase: new URL("https://yourdomain.com"), // Replace with your actual domain
  title: {
    template: "%s | SAYBA",
    default: "SAYBA | Free Game Recommendations", // Default title for pages without a specific title
  },
  description:
    "SAYBA - Your ultimate destination for free game recommendations. Get daily updates on free game giveaways, deals, and recommendations for PC, console, and mobile gaming.",
  keywords: [
    "SAYBA",
    "free games",
    "game recommendations",
    "free to play",
    "gaming deals",
    "video games",
    "PC games",
    "console games",
    "mobile games",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com", // Replace with your actual domain
    siteName: "SAYBA",
    title: "SAYBA | Free Game Recommendations",
    description:
      "SAYBA - Your ultimate destination for free game recommendations. Get daily updates on free game giveaways and deals.",
    images: [
      {
        url: "https://static.vecteezy.com/system/resources/previews/030/649/902/non_2x/a-poster-for-a-video-game-called-the-video-game-free-photo.jpg",
        width: 1200,
        height: 630,
        alt: "SAYBA - Free Game Recommendations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAYBA | Free Game Recommendations",
    description:
      "SAYBA - Your ultimate destination for free game recommendations. Get daily updates on free game giveaways and deals.",
    images: [
      {
        url: "https://static.vecteezy.com/system/resources/previews/030/649/902/non_2x/a-poster-for-a-video-game-called-the-video-game-free-photo.jpg",
        alt: "SAYBA - Free Game Recommendations",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with your Google Search Console verification code
    facebook: "your-facebook-verification-code", // Replace with your Facebook Domain Verification code
  },
};

// Client Components
import ClientLayout from "./client-layout";

// Server Component Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />{" "}
        {/* Replace with your favicon path */}
        <link rel="canonical" href="https://yourdomain.com" />{" "}
        {/* Add canonical URL */}
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
