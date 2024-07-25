import prismadb from "@/lib/prismadb";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import { SystemsColumn } from "./components/column";
import SystemClient from "./components/client";

const System = async () => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const system = await prismadb.system.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  const formattedSystem: SystemsColumn[] = system.map((item) => ({
    id: item.id,
    newChange: item.newChange.map((item) => item),
    oldChange: item.oldChange.map((item) => item),
    delete: item.delete.map((item) => item),
    type: item.type,
    user: item.user,
    createdAt: item.createdAt,
  }));

  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showOrderRole}`}>
        {showOrderRole && <SystemClient data={formattedSystem} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default System;
