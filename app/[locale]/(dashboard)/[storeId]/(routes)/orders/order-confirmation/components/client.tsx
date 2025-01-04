"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";
import Downloadfile from "@/components/file/downloadfilepage";
import { useTranslations } from "next-intl";

interface OrderProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderProps> = ({ data }) => {
  const t = useTranslations()
    
  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
        title={`${t("order.client.confirmOrder")} (${data.length})`}
        description={t("order.client.manageOrderConfirmation")}
      />
      <Downloadfile data={data} filename="orders" />
    </div>
      <Separator />
      <DataTable placeholder={t("order.client.enterEmail")} searchKey="email" columns={columns} data={data} onSelect={()=>{}} onDelete={()=>{}} open={false} setOpen={() => false}/>
    </>
  );
};

export default OrderClient;
