import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {ModalProvider} from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Xuân Trường",
  description: "Ban hang admin",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
    <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ModalProvider />
              <ToasterProvider />
              {children}
          </ThemeProvider>
        </body>
    </html>
    </SessionProvider>
  );
}
