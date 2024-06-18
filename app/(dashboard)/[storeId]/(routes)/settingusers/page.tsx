import prismadb from "@/lib/prismadb";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { Account, UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import { SettingUsersColumn } from "./components/column";
import SettingUserClient from "./components/client";

const SettingUser = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const users = await prismadb.user.findMany({
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

  // Lấy ngày hiện tại
  const today = new Date();

  // Format lại danh sách người dùng với thông tin từ system và thêm kiểm tra sinh nhật
  const formattedUser: SettingUsersColumn[] = users.map((item) => {
    const systemInfo = system.find(sys => sys.banforever.includes(item.id));
    
    // Xử lý ngày sinh
    const birthdayDate = item.dateofbirth ? new Date(item.dateofbirth) : null;

    // Kiểm tra nếu hôm nay là sinh nhật của người dùng
    const isBirthdayToday =
    birthdayDate &&
    birthdayDate.getDate() === today.getDate() &&
    birthdayDate.getMonth() === today.getMonth();


    return {
      id: item.id,
      name: item.name,
      email: item.email,
      emailVerified: item.emailVerified,
      image: item.image,
      imageCredential: item.imageCredential.map(orderItem => orderItem).join(", "),
      password: item.password.length,
      dateofbirth: item.dateofbirth,
      lastlogin: item.lastlogin,
      resendTokenVerify: item.resendTokenVerify,
      resendEmailResetPassword: item.resendEmailResetPassword,
      resendTokenResetPassword: item.resendTokenResetPassword,
      resendBanUserNotStart: item.resendBanUserNotStart,
      resendUnBanUser: item.resendUnBanUser,
      resendCount: item.resendCount,
      role: item.role,
      accounts: item.accounts.map((accountItem: Account) => ({
        type: accountItem.type,
        provider: accountItem.provider,
        token_type: accountItem.token_type,
      })),
      isTwoFactorEnabled: item.isTwoFactorEnabled,
      isCitizen: item.isCitizen,
      twoFactorConfirmation: item.twoFactorConfirmation,
      ban: item.ban,
      banExpiresTime: item.banExpires,
      isbanforever: systemInfo?.isbanforever,
      timebanforever: systemInfo?.timebanforever,
      createdAt: item.createdAt,
      isBirthdayToday: isBirthdayToday, // Thêm trường này để xử lý sau này
    };
  });

  // Sắp xếp lại danh sách: đưa những người có sinh nhật hôm nay lên đầu
  formattedUser.sort((a, b) => {
    if (b.isBirthdayToday && !a.isBirthdayToday) {
      return 1;
    }
    if (a.isBirthdayToday && !b.isBirthdayToday) {
      return -1;
    }
    return 0;
  });

  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showOrderRole ? '' : 'hidden'}`}>
        {showOrderRole && <SettingUserClient data={formattedUser} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default SettingUser