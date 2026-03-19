import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from "@vercel/speed-insights/next"
import ThemeRegistry from "@/components/ThemeRegistry";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Project Mood - AI Powered",
  description: "An AI-powered journaling app that tracks your emotional well-being over time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${inter.className} bg-white dark:bg-zinc-950 transition-colors duration-300`}>
          <ThemeRegistry>
            {children}
            <SpeedInsights />
          </ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
