import prismadb from "@/lib/prismadb";
import SalientFeaturesClient from "./components/client";
import { SalientFeaturesColumn } from "./components/columns";
import { format } from "date-fns";

const SalientFeaturePage = async ({ params }: { params: { storeId: string } }) => {
  const salientfeatures = await prismadb.salientfeatures.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSalientFeatures: SalientFeaturesColumn[] = salientfeatures.map((item) => ({
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
        <SalientFeaturesClient data={formattedSalientFeatures} />
      </div>
    </div>
  );
};

export default SalientFeaturePage;
