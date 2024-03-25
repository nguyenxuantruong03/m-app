import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import { SalaryStaffsColumn } from "./components/column";
import SalaryStaffClient from "./components/client";
import { formatter } from "@/lib/utils";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const SalaryStaff = async () => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const user = await prismadb.caculateSalary.findMany({
    include: {
      user: true,
      eventcalendar: true,
    },
  });

  const formattedUser: SalaryStaffsColumn[] = user.map((item) => {
    const totalSalary =
      (item.salaryday ? item.salaryday.toNumber() : 0) +
      (item.bonus ? item.bonus : 0);
    return {
      id: item.id,
      bonus: item.bonus ? formatter.format(item.bonus) : null,
      salaryday: item.salaryday
        ? formatter.format(item.salaryday.toNumber())
        : null,
      salarytotal: totalSalary ? formatter.format(totalSalary) : null, // Gán tổng cho salarytotal
      name: item.user.name,
      email: item.user.email,
      isSent: item.isSent,
      isPaid: item.isPaid,
      degree: item.user.degree,
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
      updatedAt: item.updatedAt
        ? format(
            utcToZonedTime(
              new Date(new Date(item.updatedAt)),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
    };
  });

  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showOrderRole}`}>
        {showOrderRole && <SalaryStaffClient data={formattedUser} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default SalaryStaff;
