import prismadb from "@/lib/prismadb";
import OrderClient from "./components/client";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showOrderRole = isRole;
  const order = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrder: OrderColumn[] = order.map((item) => ({
    id: item.id,
    phone: item.phone.split(",").join(", "),
    address: item.address.split(",").join(", "),
    email: item.email.split(",").join(", "),
    products: item.orderItem
      .map((orderItem) => {
        return `Số lượng: ${orderItem.quantity} - Sản phẩm: ${orderItem.product.heading}`;
      })
      .join(", "),
    totalPrice: formatter.format(
      item.orderItem.reduce((_, item) => {
        return 0 + Number(item.pricesales);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: item.createdAt
    ? format(
        utcToZonedTime(
          new Date(new Date(item.createdAt)),
          vietnamTimeZone
        ),
        "E '-' dd/MM/yyyy '-' HH:mm:ss a",
        { locale: viLocale }
      )
    : null,
  }));
  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showOrderRole}`}>
        {showOrderRole && <OrderClient data={formattedOrder} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default OrderPage;
