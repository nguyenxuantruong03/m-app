import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import LeafletMap from "./datastatistics_form";
import { OrderColumn } from "../orders/components/columns";

const DatastatisticsPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showDatastatisticsRole = isRole;
  const datastatistics = await prismadb.order.findMany({
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

  const formattedDatastatistics: OrderColumn[] = datastatistics.map((item) => ({
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
    createdAt: item.createdAt,
  }));
  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showDatastatisticsRole}`}>
        {showDatastatisticsRole && <LeafletMap data={formattedDatastatistics} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default DatastatisticsPage;
