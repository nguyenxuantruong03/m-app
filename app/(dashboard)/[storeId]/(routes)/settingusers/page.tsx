import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole} from "@/lib/auth";
import { UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import { SettingUsersColumn } from "./components/column";
import SettingUserClient from "./components/client";

const SettingUser = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const user = await prismadb.user.findMany({
    include: {
      accounts: true,
      twoFactorConfirmation: true,
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

  const formattedUser: SettingUsersColumn[] = user.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    emailVerified: item.emailVerified
      ? format(item.emailVerified, "MM/dd/yyyy")
      : null,
    image: item.image,
    imageCredential: item.imageCredential
      .map((orderItem: any) => {
        return orderItem;
      })
      .join(", "),
    password: item.password,
    role: item.role,
    accounts: item.accounts.map((accountItem: any) => ({
      id: accountItem.id,
      storeId: accountItem.storeId, // Add storeId property
      userId: accountItem.userId,
      type: accountItem.type,
      provider: accountItem.provider,
      providerAccountId: accountItem.providerAccountId,
      refresh_token: accountItem.refresh_token,
      access_token: accountItem.access_token,
      expires_at: accountItem.expires_at,
      token_type: accountItem.token_type,
      scope: accountItem.scope,
      id_token: accountItem.id_token,
      session_state: accountItem.session_state,
    })),
    isTwoFactorEnabled: item.isTwoFactorEnabled,
    twoFactorConfirmation: item.twoFactorConfirmation,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
    ban: item.ban,
    banExpires: item.banExpires
      ? format(item.banExpires, "MM/dd/yyyy")
      : null,
    updatedAt: format(item.updatedAt, "MM/dd/yyyy"),
  }));


  return (
    <div className="max-w-[1617px]">
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
