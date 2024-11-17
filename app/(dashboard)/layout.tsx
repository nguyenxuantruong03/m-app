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

  // Only check roles that are allowed to view the Navbar
  const allowedRoles: UserRole[] = [
    UserRole.ADMIN,
    UserRole.STAFF,
    UserRole.MARKETING,
    UserRole.SHIPPER,
  ];

  const checkRole = allowedRoles.includes(user.role as UserRole);

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
