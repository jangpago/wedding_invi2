import type { Metadata, Viewport } from "next";
import { Noto_Serif_KR, Cormorant_Garamond, IBM_Plex_Mono, Nanum_Myeongjo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { weddingData } from "@/config/wedding";

const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum",
  display: "swap",
});

export const metadata: Metadata = {
  title: weddingData.meta.title,
  description: weddingData.meta.description,
  openGraph: {
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    images: [{ url: '/images/og-image.jpg', width: 800, height: 1200 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    images: [{ url: '/images/og-image.jpg', width: 800, height: 1200 }],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className={`${notoSerifKR.variable} ${cormorantGaramond.variable} ${ibmPlexMono.variable} ${nanumMyeongjo.variable} antialiased`}>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4kyatih8vCpeYf4q"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <main className="min-h-screen max-w-[430px] mx-auto bg-[var(--color-bg)] shadow-xl">
          {children}
        </main>
      </body>
    </html>
  );
}
