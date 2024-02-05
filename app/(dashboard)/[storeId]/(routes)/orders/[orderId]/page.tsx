import prismadb from "@/lib/prismadb";
import dynamic from 'next/dynamic';

const OrderForm = dynamic(() => import('./components/order-form'), {
  ssr: false,
});
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

const OrderPage = async ({
  params,
}: {
  params: { storeId: string; orderId: string };
}) => {
    const order = await prismadb.order.findMany({
        where: {
          id: params.orderId,
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
    
      const formattedOrder = order.map((item) => ({
        id: item.id,
        phone: item.phone.split(',').join(', '),
        address: item.address.split(',').join(', '),
        email: item.email.split(',').join(', '),
        products: item.orderItem.map((orderItem:any) => {
          return `Số lượng: ${orderItem.quantity} - Sản phẩm: ${orderItem.product.heading}`;
        }).join(', '),
        totalPrice: formatter.format(item.orderItem.reduce((_,item)=> {
          return 0 + Number(item.pricesales)
        },0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MM/dd/yyyy"),
      }));
  return <OrderForm data={formattedOrder}/>;
};

export default OrderPage;
