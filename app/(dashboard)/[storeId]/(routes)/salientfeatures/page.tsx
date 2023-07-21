import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const salientfeatures = await prismadb.salientfeatures.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = salientfeatures.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    description2: item.description2,
    description3: item.description3,
    description4: item.description4,
    content: item.content,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default CategoriesPage;
