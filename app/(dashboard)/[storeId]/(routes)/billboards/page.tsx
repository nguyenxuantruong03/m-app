import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; 

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardRole = isRole;
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    include:{
      imagebillboard: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    imagebillboard:item.imagebillboard.map((item) =>item.url),
    createdAt: item.createdAt
    ? format(
        utcToZonedTime(
          new Date(new Date(item.createdAt)),
          vietnamTimeZone
        ),
        "E '-' dd/MM/yyyy '-' HH:mm:ss a",
        { locale: viLocale }
      )
    : null,
  }));

  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardRole}`}>
        {showBillboardRole && <BillboardClient data={formattedBillboards} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default BillboardsPage;
