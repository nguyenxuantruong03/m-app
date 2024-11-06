import { RoleGate } from "@/components/auth/role-gate";
import ListProductItem from "./_components/listproduct-item";
import { UserRole } from "@prisma/client";

const ListProductPage = () => {
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF, UserRole.MARKETING]}>
      <div className="px-2 mt-8">
        <ListProductItem />
      </div>
    </RoleGate>
  );
};

export default ListProductPage;
