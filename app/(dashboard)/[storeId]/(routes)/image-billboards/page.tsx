import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";

const ImageBillboardsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardRole = isRole;

  // Fetch data from both tables
  const [imageBillboards] = await Promise.all([
    prismadb.imageBillboard.findMany({
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
      link: item.link,
      createdAt: item.createdAt,
    })),
  ];

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardRole}`}>
          {showBillboardRole && (
            <BillboardClient data={formattedImageBillboards} />
          )}
        </div>
      </div>
    </RoleGate>
  );
};

export default ImageBillboardsPage;
