import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";

const ImageBillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardRole = isRole;

  // Fetch data from both tables
  const [imageBillboards, imageBillboardTimes] = await Promise.all([
    prismadb.imageBillboard.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prismadb.imageBillboardTime.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  // Combine and format the results from both tables
  const formattedImageBillboards: BillboardColumn[] = [
    ...imageBillboards.map((item) => ({
      id: item.id,
      label: item.label,
      description: item.description,
      url: item.url,
      createdAt: item.createdAt,
    })),
    ...imageBillboardTimes.map((item) => ({
      id: item.id,
      label: item.label,
      description: item.description,
      url: item.url,
      createdAt: item.createdAt,
    })),
  ];

  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardRole}`}>
        {showBillboardRole && <BillboardClient data={formattedImageBillboards} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ImageBillboardsPage;
