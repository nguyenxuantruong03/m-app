import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const Navbar = dynamic(() => import("@/components/(client)/navbar/navbar"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} bg-white h-full text-slate-900`}>
      <Navbar />
      <div className="pt-28 mx-auto md:max-w-3xl lg:max-w-7xl pb-28 md:pb-5">
      {children}
      </div>
    </div>
  );
}
