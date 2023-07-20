import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const order = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItem:{
        include:{
          product: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = order.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.phone,
    products: item.orderItem.map((orderItem)=> orderItem.product.name).join(','),
    totalPrice: formatter.format(item.orderItem.reduce((total,item)=> {
      return total + Number(item.product.price)
    },0)),
    isPaid: item.isPaid,
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
