import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import { CurrentViewProvider } from "@/localStorage/useLocalStorage-currentView";
import { DeviceProvider } from "@/providers/device-info-provider";
import ActiveStatus from "@/components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Xuân Trường",
  description: "Quản lý và theo dõi các hoạt động bán hàng vật liệu xây dựng, thống kê đơn hàng, và hiệu suất kinh doanh vật liệu xây dựng.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <CurrentViewProvider>
        <DeviceProvider>
          <html lang="en" className="light">
            <body
              className={`${inter.className} dark:bg-gradient-to-r from-slate-800 to-slate-900 bg-white`}
            >
              <ActiveStatus />
              <Image
                src="/background-image/bg-dark.png"
                alt="404"
                fill
                className="z-[-1] bg-image"
              />
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <ModalProvider />
                <ToasterProvider />
                {children}
              </ThemeProvider>
            </body>
          </html>
        </DeviceProvider>
      </CurrentViewProvider>
    </SessionProvider>
  );
}
