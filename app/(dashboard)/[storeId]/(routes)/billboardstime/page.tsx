import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardTimeColumn } from "./components/columns";
import { format } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

const BillboardsTimePage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardsTimeRole = isRole;
  const billboardstime = await prismadb.billboardTime.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  function formatTimeout(seconds:any) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  const formattedBillboardsTime: BillboardTimeColumn[] = billboardstime.map((item) => {
      const endTimestamp = new Date(new Date(item.createdAt).getTime() + item.timeout * 1000); // Tính thời gian kết thúc bằng cách thêm giây timeout vào thời gian tạo
      const end = format(
        utcToZonedTime(endTimestamp, vietnamTimeZone),
        "E '-' dd/MM/yyyy '-' HH:mm:ss a",
        { locale: viLocale }
      );
      return {
        id: item.id,
        label: item.label,
        timeout: formatTimeout(item.timeout),
        end: end,
        isTimeout: item.isTimeout,
        createdAt: item.createdAt
          ? format(
              utcToZonedTime(new Date(new Date(item.createdAt)), vietnamTimeZone),
              "E '-' dd/MM/yyyy '-' HH:mm:ss a",
              { locale: viLocale }
            )
          : null,
        updatedAt: item.updatedAt
          ? format(
              utcToZonedTime(new Date(new Date(item.updatedAt)), vietnamTimeZone),
              "E '-' dd/MM/yyyy '-' HH:mm:ss a",
              { locale: viLocale }
            )
          : null,
      };
    }
  );
  
  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardsTimeRole}`}>
        {showBillboardsTimeRole && (
          <BillboardClient data={formattedBillboardsTime} />
        )}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default BillboardsTimePage;
