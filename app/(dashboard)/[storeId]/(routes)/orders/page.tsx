import prismadb from "@/lib/prismadb";
import OrderClient from "./components/client";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  const order = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItem:{
        include:{
          product: true,
        },
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrder: OrderColumn[] = order.map((item) => ({
    id: item.id,
    phone: item.phone.split(',').join(', '),
    address: item.address.split(',').join(', '),
    products: item.orderItem.map((orderItem:any) => {
      return `Số lượng: ${orderItem.quantity} - Sản phẩm: ${orderItem.product.heading}`;
    }).join(', '),
    totalPrice: formatter.format(item.orderItem.reduce((_,item)=> {
      return 0 + Number(item.pricesales)
    },0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));
  return (
    <div className="w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrder} />
      </div>
    </div>
  );
};

export default OrderPage;
