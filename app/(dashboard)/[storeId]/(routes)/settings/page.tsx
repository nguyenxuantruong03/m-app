import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/setting-form";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

interface SettingProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingProps> = async ({ params }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN
  const showSettingRole = isRole;
  const user = await currentUser();
  const userId = await prismadb.user.findFirst({ where: { id: user?.id } });
  if (!userId || !user) {
    redirect("/auth/login");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: {
        equals: UserRole.USER,
      },
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showSettingRole}`}>
        {showSettingRole && <SettingsForm initialData={store} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default SettingsPage;
