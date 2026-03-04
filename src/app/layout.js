import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "GREE BUKHARA | Официальный дилер Gree в Бухаре",
    template: "%s | GREE BUKHARA"
  },
  description: "Официальный дилер Gree в Бухаре. Продажа премиальных кондиционеров. Профессиональный монтаж, гарантия качества, сервисное обслуживание. Лучшие цены на сплит-системы в Бухаре.",
  keywords: [
    "кондиционеры бухара",
    "gree бухара",
    "сплит системы бухара",
    "установка кондиционеров бухара",
    "официальный дилер gree",
    "климатическая техника бухара",
    "gree официальный дилер",
    "премиальные кондиционеры",
    "монтаж кондиционеров бухара"
  ],
  authors: [{ name: "GREE BUKHARA" }],
  creator: "GREE BUKHARA",
  publisher: "GREE BUKHARA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://greebukhara.uz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GREE BUKHARA - Официальный дилер премиальных кондиционеров",
    description: "Купить кондиционер Gree в Бухаре. Официальная гарантия, профессиональная установка и сервисное обслуживание.",
    url: "https://greebukhara.uz",
    siteName: "GREE BUKHARA",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "GREE BUKHARA - Официальный дилер в Бухаре",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GREE BUKHARA - Официальный дилер Gree",
    description: "Премиальные кондиционеры Gree в Бухаре. Официальная гарантия и профессиональный монтаж.",
    images: ["/images/logo.jpg"],
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
    google: "ваш_google_verification_code", // Добавьте код верификации Google Search Console
    yandex: "ваш_yandex_verification_code", // Добавьте код верификации Яндекс.Вебмастер
  },
  category: "климатическая техника",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/images/logo.jpg" />
        <link rel="icon" href="/images/logo.jpg" />
        <link rel="apple-touch-icon" href="/images/logo.jpg" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no, address=no, email=no" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
};