import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const ColorPage = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showColorRole = isRole;
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showColorRole}`}>
        {showColorRole && <ColorForm initialData={color} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ColorPage;
