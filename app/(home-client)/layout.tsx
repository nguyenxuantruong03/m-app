import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const Navbar = dynamic(() => import("@/components/(client)/navbar/navbar"), {
  ssr: false,
});
const ScrollButton = dynamic(() => import("@/components/(client)/backtotop/backToTop"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/(client)/footer/footer"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata & { image: string } = {
  title: "VLXD Xuân Trường",
  description: "Vật liệu xây dựng Xuân Trường",
  image: "/images/Home.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} bg-white text-slate-900`}>
      <Navbar />
      {children}
      <ScrollButton />
      <Footer />
    </div>
  );
}
