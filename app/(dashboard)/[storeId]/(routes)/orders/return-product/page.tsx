import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { StatusOrder, UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import { OrderColumn } from "./components/columns";
import OrderClient from "./components/client";

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showOrderRole = isRole;
  const order = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
      status: StatusOrder.Tra_hang,
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
      user: true,
      imagereturnProduct: true,
      imageCustomer: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Filter orders by userIdStaff and format them
  const formattedOrder: OrderColumn[] = order.map((item) => ({
    id: item.id,
    phone: item.phone.split(",").join(", "),
    address: item.address.split(",").join(", "),
    email: item.email.split(",").join(", "),
    emailcurrent: item.user?.email,
    namecurrent: item.user?.name,
    phonenumbercurrent: item.user?.phonenumber,
    emailStaff: item.user?.id === item.userIdStaff ? item.user?.email : undefined,
    emailShipper: item.user?.id === item.userIdShipper ? item.user?.email : undefined,
    emailUserGetDebt: item.user?.id === item.userIdRecieveDebt ? item.user?.email : undefined,
    nameStaff: item.user?.id === item.userIdStaff ? item.user?.name : undefined,
    nameShipper: item.user?.id === item.userIdShipper ? item.user?.name : undefined,
    nameUserGetDebt: item.user?.id === item.userIdRecieveDebt ? item.user?.name : undefined,
    addresscurrent: item.user?.address,
    destiontionReturnProduct: item.destiontionReturnProduct,
    imagereturnProduct: item.imagereturnProduct,
    imagereturnProductUrl: item.imagereturnProduct.map((item)=> item.url),
    imageCustomer: item.imageCustomer,
    imageCustomerUrl: item.imageCustomer.map((item)=> item.url),
    returnProduct: item.returnProduct,
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
    name: item?.name,
    note: item?.note,
    gender: item?.gender,
    status: item?.status,
    statusOther: item.statusOther,
    addressOther: item?.addressOther,
    deliveryMethod: item?.deliveryMethod,
    receiveCash: item.receiveCash,
    debtShipper: item.debtShipper,
    isPaid: item.isPaid,
    isGift: item.orderItem.map((item)=> item?.isGift),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }));

  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 ${showOrderRole}`}>
        {showOrderRole && <OrderClient data={formattedOrder} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default OrderPage;
