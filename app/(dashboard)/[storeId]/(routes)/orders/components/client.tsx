"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumn, columns } from "./columns";
import Downloadfile from "@/components/file/downloadfilepage";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getOrderClient } from "@/translate/translate-dashboard";

interface OrderProps {
  data: OrderColumn[];
}



const OrderClient: React.FC<OrderProps> = ({ data }) => {
  //language
  const user = useCurrentUser();
  const languageToUse = user?.language || "vi";
  const orderClientMessage = getOrderClient(languageToUse)
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${orderClientMessage.order} (${data.length})`}
          description={orderClientMessage.manageProductOrders}
        />
        <Downloadfile data={data} filename="orders" languageToUse={languageToUse}/>
      </div>
      <Separator />
      <DataTable
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        open={false}
        setOpen={() => false}
        showTotal={true}
        languageToUse={languageToUse}
      />
    </>
  );
};

export default OrderClient;
