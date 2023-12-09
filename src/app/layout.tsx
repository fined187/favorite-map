import "@/styles/globals.css";
import { NextProvider, NextLayout } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite NextMap",
  description: "Nextjs 13"
}

export default function RootLayout({
  children
}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <NextProvider>
          <NextLayout>
            {children}
          </NextLayout>
        </NextProvider>
      </body>
    </html>
  );
} 