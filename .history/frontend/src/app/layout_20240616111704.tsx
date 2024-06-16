import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import { Providers } from "@/redux-toolkit/Provider";
import { Cedarville_Cursive } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] , variable: '--font-inter' });
const cedarville = Cedarville_Cursive({subsets: ['latin'] ,weight: '400' , style: ['normal'] , variable: '--font-cedarville'});

export const metadata: Metadata = {
  title: "Codeitup",
  description: "The Only Platform You Need To Master DSA!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
        </body>
    </html>
  );
}
