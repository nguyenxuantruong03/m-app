import prismadb from "@/lib/prismadb";
import { SentEmailUserForm } from "./components/sentmailuser-form";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const SentmailUserPage = async ({
  params,
}: {
  params: { storeId: string; sentmailuserId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showSentmailUserRole = isRole;
  const sentmailuser = await prismadb.sentEmailUser.findUnique({
    where: {
      id: params.sentmailuserId,
    },
  });
  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showSentmailUserRole}`}>
        {showSentmailUserRole && (
          <SentEmailUserForm
            initialData={sentmailuser}
          />
        )}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default SentmailUserPage;
