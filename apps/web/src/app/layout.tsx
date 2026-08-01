import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnimatedBackground from "@/components/cinematic/AnimatedBackground";
import MagneticCursor from "@/components/cinematic/MagneticCursor";
import FloatingNav from "@/components/cinematic/FloatingNav";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VerseCV",
  description: "Your career across alternate realities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased selection:bg-primary/30`}>
        <QueryProvider>
          <AnimatedBackground />
          <MagneticCursor />
          <FloatingNav />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
