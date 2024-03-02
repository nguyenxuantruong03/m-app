import Navbar from "@/components/navbar/navbar";
import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import {toast} from "react-hot-toast";

export default async function SetupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const user = await currentUser();
  const userId = await prismadb.user.findFirst({ where: { id: user?.id } });
  if (!userId || !user) {
    redirect("/auth/login");
  }
  if (userId?.ban === true) {
    redirect("/auth/login");
  }
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: {
        equals: UserRole.USER,
      },
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div className="flex">
        <div className="w-[280px] h-full bg-red-300 rounded-md bg-opacity-50">
          <Navbar />
        </div>
        {children}
      </div>
    </>
  );
}
