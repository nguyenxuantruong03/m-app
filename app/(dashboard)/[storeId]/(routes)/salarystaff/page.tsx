import prismadb from "@/lib/prismadb";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { SalaryStaffsColumn } from "./components/column";
import SalaryStaffClient from "./components/client";
import { formatter } from "@/lib/utils";

const SalaryStaff = async () => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const caculateSalary = await prismadb.caculateSalary.findMany({
    include: {
      user: true,
      eventcalendar: true,
    },
  });

  const formattedUser: SalaryStaffsColumn[] = caculateSalary.map((item) => {
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
      createdAt: item.createdAt,
    };
  });

  return (
    <RoleGate allowedRole={[UserRole.ADMIN]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showOrderRole}`}>
          {showOrderRole && <SalaryStaffClient data={formattedUser} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default SalaryStaff;
