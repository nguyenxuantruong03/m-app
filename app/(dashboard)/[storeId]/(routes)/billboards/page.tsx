import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardRole = isRole;
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      imagebillboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    description: item.description,
    imagebillboard: item.imagebillboard.map((item) => item.url),
    imagebillboardpatch: item.imagebillboard,
    createdAt: item.createdAt,
    language: user?.language || "vi"
  }));

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardRole}`}>
          {showBillboardRole && <BillboardClient data={formattedBillboards} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default BillboardsPage;
