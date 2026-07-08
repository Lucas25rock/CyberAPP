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
  title: "CyberKYD — Music Gallery",
  description:
    "Explora la música de CyberKYD. Álbumes, canciones y más.",
  openGraph: {
    title: "CyberKYD — Music Gallery",
    description:
      "Explora la música de CyberKYD. Álbumes, canciones y más.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cyber-black text-cyber-white selection:bg-cyber-green selection:text-cyber-black">
        {children}
      </body>
    </html>
  );
}
