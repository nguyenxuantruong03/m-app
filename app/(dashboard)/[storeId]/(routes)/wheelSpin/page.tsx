import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import FormSuccess from "@/components/form-success";
import { WheelSpinColumn } from "./components/column";
import SalaryStaffClient from "./components/client";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
import { UserRole } from "@prisma/client";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const SalaryStaff = async () => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const user = await prismadb.user.findMany({
    include: {
      WheelSpin: true,
    },
  });

  
  const formattedWheelSpin: WheelSpinColumn[] = user.map((item => ({
    id: item.id,
    name: item.name,
    coin: item.WheelSpin.map((item)=> item.coin),
    rotation:  item.WheelSpin.map((item)=> item.rotation),
    email: item.email,
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
  })));

  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showOrderRole}`}>
        {showOrderRole && <SalaryStaffClient data={formattedWheelSpin} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default SalaryStaff;
