"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { FormUploadImage } from "@/components/ui/form-upload-image-avatar";
import { Home, Server, Settings, User } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_URL;
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rouned-xl w-[600px] shadow-sm">
      <div className="flex gap-x-1">
        <Button
          asChild
          variant={pathname === "/" ? "default" : "outline"}
          onClick={() => router.refresh()}
        >
          <Link href="/" className="flex items-center justify-center">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href={`${url}/client`} className="flex items-center justify-center">
            <User className="w-4 h-4 mr-1" />
            Client
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href={`${url}/server`} className="flex items-center justify-center">
            <Server className="w-4 h-4 mr-1" />
            Server
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/infouser" ? "default" : "outline"}
        >
          <Link href={`${url}/infouser`} className="flex items-center justify-center">
            <Settings className="w-4 h-4 mr-1" />
            Setting
          </Link>
        </Button>
        {/* Đây là thay đổi hình nền */}
        <FormUploadImage />
      </div>
      {/* Đây là ảnh đại diện */}
      <UserButton />
    </nav>
  );
};
