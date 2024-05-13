import prismadb from "@/lib/prismadb";
import { format, subHours } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { Account, UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import { SettingUsersColumn } from "./components/column";
import SettingUserClient from "./components/client";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const SettingUser = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const user = await prismadb.user.findMany({
    include: {
      accounts: true,
      twoFactorConfirmation: true,
      password: true
    },
    orderBy: [
      {
        emailVerified: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const system = await prismadb.system.findMany();

  const formattedUser: SettingUsersColumn[] = user.map((item) => {
    // Thêm thông tin từ system vào mỗi người dùng
    const systemInfo = system.find(sys => sys.banforever.includes(item.id));
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      emailVerified: item.emailVerified
        ? format(item.emailVerified, "dd/MM/yyyy")
        : null,
      image: item.image,
      imageCredential: item.imageCredential
        .map((orderItem) => {
          return orderItem;
        })
        .join(", "),
      password: item.password.length,
      lastlogin: item.lastlogin
        ? format(
            utcToZonedTime(
              subHours(new Date(item.lastlogin), 7),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
      resendTokenVerify:item.resendTokenVerify,
      resendEmailResetPassword: item.resendEmailResetPassword,
      resendTokenResetPassword: item.resendTokenResetPassword,
      resendCount:item.resendCount,
      role: item.role,
      accounts: item.accounts.map((accountItem: Account) => ({
        type: accountItem.type,
        provider: accountItem.provider,
        token_type: accountItem.token_type,
      })),
      isTwoFactorEnabled: item.isTwoFactorEnabled,
      isCitizen: item.isCitizen,
      twoFactorConfirmation: item.twoFactorConfirmation,
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
      ban: item.ban,
      banExpires:item.banExpires
        ? format(
            utcToZonedTime(
              subHours(new Date(item.banExpires), 0),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
        isbanforever: systemInfo?.isbanforever,
        timebanforever: systemInfo?.timebanforever
        ? format(
            utcToZonedTime(
              subHours(new Date(systemInfo?.timebanforever), 0),
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
          {showOrderRole && <SettingUserClient data={formattedUser} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default SettingUser;
