import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Coach - AI 대화 분석 & 소셜스킬 코칭",
  description: "AI가 카톡, 문자 대화를 분석하고 상황별 답변 제안! 거절하기, 부탁하기 등 실전 커뮤니케이션 스킬을 배워보세요. 소셜스킬 향상, 대화 코칭, 관계 개선을 도와드립니다.",
  keywords: [
    "대화 분석",
    "소셜스킬",
    "커뮤니케이션 코칭",
    "AI 대화 분석",
    "카톡 답장",
    "문자 답변",
    "거절하기",
    "부탁하기",
    "사과하기",
    "대화 스킬",
    "소통 능력",
    "관계 개선",
    "대인관계",
    "말하기 연습",
    "자기계발",
    "커뮤니케이션 향상",
    "소셜 불안",
    "대화 가이드",
    "메시지 코칭",
    "답변 추천"
  ],
  authors: [{ name: "Social Coach" }],
  openGraph: {
    title: "Social Coach - AI 대화 분석 & 소셜스킬 코칭",
    description: "카톡, 문자 대화를 AI가 분석하고 더 나은 답변을 제안해드립니다. 거절하기, 부탁하기 등 상황별 가이드 제공!",
    type: "website",
    locale: "ko_KR",
    siteName: "Social Coach",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Coach - AI 대화 분석",
    description: "AI가 당신의 대화를 분석하고 더 나은 커뮤니케이션을 도와드립니다.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="" />
        <meta name="google-site-verification" content="" />
        <link rel="canonical" href="https://yourdomain.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
