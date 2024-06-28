import prismadb from "@/lib/prismadb";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import FormSuccess from "@/components/form-success";
import { WheelSpinColumn } from "./components/column";
import SalaryStaffClient from "./components/client";
import { UserRole } from "@prisma/client";

const SalaryStaff = async () => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const user = await prismadb.wheelSpin.findMany({
    include: {
      user: true,
    },
  });
  
  const formattedWheelSpin: WheelSpinColumn[] = user.map((item => ({
    id: item.id,
    name: item.user.name,
    coin: item.coin,
    rotation:  item.rotation,
    email: item.user.email,
    createdAt: item.createdAt,
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
