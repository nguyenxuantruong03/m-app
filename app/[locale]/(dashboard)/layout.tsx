import Navbar from "@/components/navbar/navbar";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import GetLocalStorage from "@/localStorage/getLocalStorage-currentView";
import DropMenuHint from "@/components/(client)/dropmenu-hint";
import ScrollButton from "@/components/(client)/backtotop/backToTop";
import BoxchatSystem from "@/components/boxchat-dashboard";

export default async function SetupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const user = await currentUser();
  const locale = user?.language || "vi";

  if (!user) {
    redirect(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${locale}/auth/login`);
  }

  if (user?.ban === true) {
    redirect(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${locale}/auth/login`);
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

  if(!checkRole){
    redirect(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${locale}/home-product`);
  }

  return (
    <>
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
      <ScrollButton />
      <DropMenuHint />
      <BoxchatSystem />
    </>
  );
}
