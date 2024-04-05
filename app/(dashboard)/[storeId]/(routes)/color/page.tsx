import prismadb from "@/lib/prismadb";
import ColorClient from "./components/client";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showColorRole = isRole;
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColor: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt
    ? format(
        utcToZonedTime(
          new Date(new Date(item.createdAt)),
          vietnamTimeZone
        ),
        "E '-' dd/MM/yyyy '-' HH:mm:ss a",
        { locale: viLocale }
      )
    : null
  }));
  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showColorRole}`}>
        {showColorRole && <ColorClient data={formattedColor} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ColorPage;
