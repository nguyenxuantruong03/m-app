import prismadb from "@/lib/prismadb";
import { format, subHours } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import { SystemsColumn } from "./components/column";
import SystemClient from "./components/client";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

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
    banforever:item.banforever.map((item) => item),
    isbanforever: item.isbanforever,
    type: item.type,
    user: item.user,
    timebanforever: item.timebanforever
    ? format(
        utcToZonedTime(new Date(new Date(item.timebanforever).getTime() - (7 * 60 * 60 * 1000)), vietnamTimeZone),
        "E '-' dd/MM/yyyy '-' HH:mm:ss a",
        { locale: viLocale }
      )
    : null,
    createdAt: item.createdAt
      ? format(
          utcToZonedTime(new Date(new Date(item.createdAt).getTime() - (7 * 60 * 60 * 1000)), vietnamTimeZone),
          "E '-' dd/MM/yyyy '-' HH:mm:ss a",
          { locale: viLocale }
        )
      : null,
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
