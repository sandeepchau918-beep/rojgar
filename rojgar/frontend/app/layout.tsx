import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";

// 🔥 1. YAHAN SCRIPT IMPORT KARNA ZAROORI HAI
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// =================================================================
// 🔥 GOOGLE SITE NAME FIX (openGraph.siteName lagana zaroori hai)
// =================================================================
// =================================================================
// 🔥 SEO PRO LEVEL: Sarkari Result & Naukri Keywords Added
// =================================================================
export const metadata: Metadata = {
  title: "Rojgar Safar | Sarkari Result, Latest Govt Jobs, Admit Card & Sarkari Naukri",
  description: "Get the latest Sarkari Result, Sarkari Naukri updates, Upcoming Govt Jobs, Admit Cards, Answer Keys, and Exam Syllabus directly at Rojgar Safar.",
  
  // 👇 YEH HAI ASLI SEO GAME CHANGER (Keywords)
  keywords: [
    "Sarkari Result", 
    "Sarkari Naukri", 
    "Sarkari Result 2026", 
    "Sarkari Exam", 
    "Latest Govt Jobs", 
    "Rojgar Safar", 
    "Free Job Alert", 
    "RRB NTPC", 
    "SSC CGL", 
    "Admit Card Download"
  ],
  
  metadataBase: new URL("https://www.rojgarsafar.com"),
  icons: {
    icon: "/loge.png", // (Apni logo file ka naam match kar lena, logo ya loge)
  },
  openGraph: {
    siteName: "Rojgar Safar",
    type: "website",
    locale: "en_IN",
    title: "Rojgar Safar | Sarkari Result & Latest Jobs",
    description: "Check the latest Sarkari Result, Sarkari Naukri, and download admit cards instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      {/* =================================================================
          🔥 2. YAHAN GOOGLE ADSENSE KA SCRIPT LAGA DIYA HAI
         ================================================================= */}
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3474575499230510"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">

        {/* =================================================================
            🔥 GOOGLE OFFICIAL WEBSITE SCHEMA (URL ke upar wala Brand Name)
           ================================================================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Rojgar Safar",
              "alternateName": ["RojgarSafar", "Rojgar Safar Portal"],
              "url": "https://www.rojgarsafar.com/"
            }),
          }}
        />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}