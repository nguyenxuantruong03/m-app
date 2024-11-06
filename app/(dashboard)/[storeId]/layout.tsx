import Navbar from "@/components/navbar/navbar";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import GetLocalStorage from "@/localStorage/getLocalStorage-currentView";

export default async function SetupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const user = await currentUser();
  let checkRole = false;

  if (!user) {
    redirect("/auth/login");
  }
  if (user?.ban === true) {
    redirect("/auth/login");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    redirect("/");
  }

  if (
    user.role === UserRole.ADMIN ||
    user.role === UserRole.STAFF ||
    user.role === UserRole.MARKETING ||
    user.role === UserRole.SHIPPER
  ) {
    checkRole = true;
  }

  return (
    <GetLocalStorage>
      <div className="flex">
        {checkRole && (
          <div>
            <Navbar />
          </div>
        )}
        <div className="w-full">{children}</div>
      </div>
    </GetLocalStorage>
  );
}
