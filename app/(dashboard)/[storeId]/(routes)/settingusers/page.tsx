import prismadb from "@/lib/prismadb";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole, currentUser } from "@/lib/auth";
import { Account, UserRole } from "@prisma/client";
import { SettingUsersColumn } from "./components/column";
import SettingUserClient from "./components/client";

const SettingUser = async ({ params }: { params: { storeId: string } }) => {
  const currentUsers = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || UserRole.STAFF;
  const showOrderRole = isRole;
  const isAdmin = role === UserRole.ADMIN;
  const userCondition = isAdmin ? {} : UserRole.USER; // Nếu là admin thì không có điều kiện, ngược lại thì chỉ get USER

  const users = await prismadb.user.findMany({
    where: {
      role: userCondition
    },
    include: {
      accounts: true,
      twoFactorConfirmation: true,
      password: true,
      imageCredential: {
        orderBy: {
          createdAt: "desc",
        },
      },
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

  // Lấy ngày hiện tại
  const today = new Date();

  // Format lại danh sách người dùng với thông tin từ system và thêm kiểm tra sinh nhật
  const formattedUser: SettingUsersColumn[] = users.map((item) => {
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
      imageCredential: item?.imageCredential[0]?.url,
      password: item.password.length,
      language: currentUsers?.language || "vi",
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
      isbanforever: item?.isbanforever,
      timebanforever: item?.timebanforever,
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
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showOrderRole ? "" : "hidden"}`}>
          {showOrderRole && <SettingUserClient data={formattedUser} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default SettingUser;
