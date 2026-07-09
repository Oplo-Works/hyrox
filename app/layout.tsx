import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// 빌드 브리프 12.2 타이포그래피
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-ko",
  weight: ["400", "500", "700"],
  display: "swap",
});

// 빌드 브리프 16.1 메타데이터
// TODO: 실제 도메인 확정 후 metadataBase URL 교체
export const metadata: Metadata = {
  metadataBase: new URL("https://nynj-hybrid-race-club.vercel.app"),
  title: "NY/NJ Hybrid Race Club | HYROX, 5K & Half Marathon Training",
  description:
    "NY/NJ community for HYROX, Mini HYROX, 5K, and Half Marathon training. All levels welcome. Join through Kakao OpenChat. HYROX, Mini HYROX, 5K, Half Marathon을 함께 준비하는 NY/NJ 운동 커뮤니티입니다. 초보자 환영.",
  keywords: [
    "HYROX",
    "Mini HYROX",
    "5K",
    "Half Marathon",
    "NY",
    "NJ",
    "New York",
    "New Jersey",
    "running club",
    "hybrid fitness",
    "training group",
    "Korean community",
    "뉴욕 러닝",
    "뉴저지 러닝",
    "하이록스",
  ],
  authors: [{ name: "NY/NJ Hybrid Race Club" }],
  openGraph: {
    title: "NY/NJ Hybrid Race Club | HYROX, 5K & Half Marathon Training",
    description:
      "Train together. Race together. All levels welcome. NY/NJ community for HYROX, Mini HYROX, 5K, and Half Marathon training.",
    type: "website",
    locale: "en_US",
    siteName: "NY/NJ Hybrid Race Club",
    // TODO: OG 이미지 1200x630 제작 후 경로 교체
    images: [
      {
        url: "/images/og-placeholder.png",
        width: 1200,
        height: 630,
        alt: "NY/NJ Hybrid Race Club — HYROX, Mini HYROX, 5K, Half Marathon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NY/NJ Hybrid Race Club | HYROX, 5K & Half Marathon Training",
    description:
      "Train together. Race together. All levels welcome. NY/NJ community for HYROX, Mini HYROX, 5K, and Half Marathon training.",
    images: ["/images/og-placeholder.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080A0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${notoSansKR.variable}`}
    >
      <body className="bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}