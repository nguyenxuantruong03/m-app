import prismadb from "@/lib/prismadb";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole, currentUser } from "@/lib/auth";
import { WheelSpinColumn } from "./components/column";
import SalaryStaffClient from "./components/client";
import { UserRole } from "@prisma/client";

const SalaryStaff = async () => {
  const currentuser = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const user = await prismadb.user.findMany({
    include: {
      WheelSpin: true,
    },
  });

  const formattedWheelSpin: WheelSpinColumn[] = user.map((item) => ({
    id: item.id,
    name: item.name,
    coin: item.WheelSpin.map((item) => item.coin),
    rotation: item.WheelSpin.map((item) => item.rotation),
    email: item.email,
    updatedAt: item.updatedAt,
    createdAt: item.createdAt,
    language: currentuser?.language || "vi"
  }));

  return (
    <RoleGate allowedRole={[UserRole.ADMIN]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showOrderRole}`}>
          {showOrderRole && <SalaryStaffClient data={formattedWheelSpin} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default SalaryStaff;
