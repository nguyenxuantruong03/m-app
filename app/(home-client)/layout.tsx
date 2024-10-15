import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const Navbar = dynamic(() => import("@/components/(client)/navbar/navbar"), {
  ssr: false,
});
const ScrollButton = dynamic(
  () => import("@/components/(client)/backtotop/backToTop"),
  {
    ssr: false,
  }
);
const Footer = dynamic(() => import("@/components/(client)/footer/footer"), {
  ssr: false,
});
import type { Metadata } from "next";

export const metadata: Metadata & { image: string } = {
  title: "VLXD Xuân Trường",
  description: "Vật liệu xây dựng Xuân Trường",
  image: "/images/Home.png",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} text-slate-900`}>
      <Navbar />
      {children}
      <ScrollButton />
      <Footer />
    </div>
  );
}
