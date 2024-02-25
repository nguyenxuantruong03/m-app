import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";
import StoreSwitcher from "./store-switcher";
import MainNav from "./main-nav";
import { ThemeToggleDrakorLight } from "../ui/theme-toggle";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { Settings,LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import LogoutButton from "../auth/logout-button";

const Navbar = async () => {
    const userId = await currentUser();
    const imageCredentials = userId?.imageCredential || [];
// Lấy một số ngẫu nhiên từ 0 đến chiều dài của mảng
const randomIndex = Math.floor(Math.random() * imageCredentials.length);
// Lấy phần tử ngẫu nhiên từ mảng
const randomImage = imageCredentials[randomIndex];

  if (!userId) {
    redirect("/auth/login");
  }

  const store = await prismadb.store.findMany({
    where: {
      userId: {
        equals: UserRole.USER,
      },
    },
  });
  return (
    <div className="border-b">
      <div className="items-center px-4 my-4">
        <StoreSwitcher items={store} />
        <MainNav className="mx-6" />

        <div className="flex items-center space-x-4 mt-2 justify-center">
        <Avatar>
          {userId?.image || randomImage ? (
            <AvatarImage src={userId?.image || randomImage} />
          ) : (
            <AvatarFallback className="bg-sky-500">
              <User className="text-white" />
            </AvatarFallback>
          )}
        </Avatar>
        
          <ThemeToggleDrakorLight />

          <Link href={`${process.env.NEXT_PUBLIC_URL}/settings`}>
          <div className="bg-white hover:bg-gray-100 cursor-pointer p-2.5 rounded-lg">
          <Settings className="w-5 h-5"/>
          </div>
          </Link>

          <LogoutButton>
          <div className="bg-white hover:bg-gray-100 cursor-pointer p-2.5 rounded-lg">
          <LogOut className="w-5 h-5"/>
          </div>
          </LogoutButton>
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
