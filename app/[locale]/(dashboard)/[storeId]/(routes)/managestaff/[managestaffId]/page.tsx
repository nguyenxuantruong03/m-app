import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import { ManageStaffForm } from "./component/managestaff-form";

const ManageStaffPage = async ({
  params,
}: {
  params: { storeId: string; managestaffId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showProductRole = isRole;
  const ManageStaff = await prismadb.user.findUnique({
    where: {
      id: params.managestaffId,
    },
    include: {
      imageCredential: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return (
    <RoleGate allowedRole={[UserRole.ADMIN]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showProductRole}`}>
          {showProductRole && (
            <ManageStaffForm
              initialData={ManageStaff}
              imageCredential={ManageStaff?.imageCredential || []}
            />
          )}
        </div>
      </div>
    </RoleGate>
  );
};

export default ManageStaffPage;
