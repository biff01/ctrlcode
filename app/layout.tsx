import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import ThemeProvider, { THEME_INIT_SCRIPT } from "@/components/ThemeProvider";
import MotionProvider from "@/components/MotionProvider";
import LanguageProvider from "@/components/LanguageProvider";
import SkipLink from "@/app/SkipLink";
import NavBar from "@/components/NavBar";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Ctrl Code — From idea to digital reality",
  description:
    "We design and build web platforms, mobile apps, CRM systems and AI products for ambitious companies — fast, reliable and beautifully engineered.",
  openGraph: {
    title: "Ctrl Code — From idea to digital reality",
    description:
      "We design and build web platforms, mobile apps, CRM systems and AI products for ambitious companies — fast, reliable and beautifully engineered.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const lang = (await cookies()).get("lang")?.value ?? "uz";
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <head>
        {/* Sets data-theme from storage before first paint. Without this the page
            paints with the :root (dark) tokens and snaps to light on hydration. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body>
        <SkipLink />
        <ThemeProvider>
          <MotionProvider>
            <LanguageProvider initialLang={lang as 'uz' | 'en' | 'ru'}>
              <ScrollToTop />
              <NavBar />
              {children}
            </LanguageProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
