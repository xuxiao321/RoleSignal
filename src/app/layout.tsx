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
  metadataBase: new URL("https://rolesignal.example"),
  title: {
    default: "RoleSignal | Job Posting Gaps and Employee Reports",
    template: "%s",
  },
  description:
    "Compare what job postings disclose, what they leave out, and what employees report about compensation, WLB, hours, on-call, benefits, and promotion.",
  applicationName: "RoleSignal",
  openGraph: {
    siteName: "RoleSignal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
