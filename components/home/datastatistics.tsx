import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import LeafletMap from "./datastatistics_form";
import { OrderColumn } from "@/app/(dashboard)/[storeId]/(routes)/orders/components/columns";
import { Skeleton } from "../ui/skeleton";

interface DatastatisticsProps {
  storeId: string;
}

const Datastatistics = async ({ storeId }: DatastatisticsProps) => {
  const datastatistics = await prismadb.order.findMany({
    where: {
      storeId: storeId,
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

  const formattedDatastatistics: OrderColumn[] = datastatistics.map((item) => ({
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
    nameStaff: item.user?.id === item.userIdStaff ? item.user?.name : undefined,
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
  }));

  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6`}>
        {!formattedDatastatistics ? (
          <div className="flex justify-center h-full">
            <Skeleton className="h-[800px] w-full max-w-full rounded-md" />
          </div>
        ): (
        <LeafletMap data={formattedDatastatistics} />
        )}
      </div>
    </div>
  );
};

export default Datastatistics;
