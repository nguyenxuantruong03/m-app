import prismadb from "@/lib/prismadb";
import SentEmailUserClient from "./components/client";
import { SentEmailUserColumn } from "./components/columns";
import { format } from "date-fns";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const SentEmailUserPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showSentEmailUserRole = isRole;
  const product = await prismadb.sentEmailUser.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
    user: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSentEmailUser: SentEmailUserColumn[] = product.map((item) => ({
    id: item.id,
    subject: item.subject,
    description: item.description,
    user: item.user.email,
    isSent: item.isSent,
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
  }));
  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showSentEmailUserRole}`}>
        {showSentEmailUserRole && <SentEmailUserClient data={formattedSentEmailUser} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default SentEmailUserPage;
