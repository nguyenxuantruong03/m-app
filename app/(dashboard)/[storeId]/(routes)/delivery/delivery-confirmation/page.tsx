import prismadb from "@/lib/prismadb";
import OrderClient from "./components/client";
import { formatter } from "@/lib/utils";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole, currentUser } from "@/lib/auth";
import { StatusOrder, UserRole } from "@prisma/client";
import { OrderColumn } from "./components/columns";

const OrderComfirmation = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.SHIPPER || role === UserRole.STAFF;
  const showOrderRole = isRole;
  const order = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
      status: {
        in: [
          StatusOrder.Dang_giao,
          StatusOrder.Giao_lai_hang,
          StatusOrder.Shipper_dang_den,
        ],
      },
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
      user: true,
      imagereturnProduct: true,
      imageCustomer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrder: OrderColumn[] = order
    .filter((item) => user?.id === item.userIdShipper) // Only keep orders where user.id matches userIdStaff
    .map((item) => ({
      id: item.id,
      phone: item.phone.split(",").join(", "),
      address: item.address.split(",").join(", "),
      email: item.email.split(",").join(", "),
      emailcurrent: item.user?.email,
      namecurrent: item.user?.name,
      phonenumbercurrent: item.user?.phonenumber,
      emailStaff:
        item.user?.id === item.userIdStaff ? item.user?.email : undefined,
      emailShipper:
        item.user?.id === item.userIdShipper ? item.user?.email : undefined,
      emailUserGetDebt:
        item.user?.id === item.userIdRecieveDebt ? item.user?.email : undefined,
      nameStaff:
        item.user?.id === item.userIdStaff ? item.user?.name : undefined,
      nameShipper:
        item.user?.id === item.userIdShipper ? item.user?.name : undefined,
      nameUserGetDebt:
        item.user?.id === item.userIdRecieveDebt ? item.user?.name : undefined,
      addresscurrent: item.user?.address,
      destiontionReturnProduct: item.destiontionReturnProduct,
      imagereturnProduct: item.imagereturnProduct,
      imagereturnProductUrl: item.imagereturnProduct.map((item) => item.url),
      imageCustomer: item.imageCustomer,
      imageCustomerUrl: item.imageCustomer.map((item) => item.url),
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
      isGift: item.orderItem.map((item) => item?.isGift),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      language: user?.language || "vi"
    }));

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF, UserRole.SHIPPER]}>
      <div className="w-full">
        <div className={`flex-1 space-y-4 ${showOrderRole}`}>
          {showOrderRole && <OrderClient data={formattedOrder} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default OrderComfirmation;
