import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/layout/ClientProviders";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Neerza Amul Ice Cream Parlour | Fresh Dairy & Ice Cream in Jaipur",
  description:
    "Order fresh Amul ice cream, milk, butter, cheese, paneer, ghee and more from Neerza Amul Ice Cream Parlour, Mansarovar, Jaipur. Browse products and order via WhatsApp.",
  keywords:
    "Amul, ice cream, dairy, milk, butter, cheese, paneer, ghee, Jaipur, Mansarovar, Neerza",
  openGraph: {
    title: "Neerza Amul Ice Cream Parlour",
    description: "Fresh Amul dairy products & ice cream in Mansarovar, Jaipur",
    type: "website",
    locale: "en_IN",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ED1C24",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
