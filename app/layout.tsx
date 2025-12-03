import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import "./globals.css";

const font = Figtree({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wika - The Filipino Language Learning App",
  description: "Wika - Learn the Filipino Languages!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${font.className} antialiased`}>
          <Toaster />
          <ExitModal />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
