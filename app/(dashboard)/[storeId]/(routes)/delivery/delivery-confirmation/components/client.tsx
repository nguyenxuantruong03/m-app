"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";
import Downloadfile from "@/components/file/downloadfilepage";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getDeliveryComfirmationClient } from "@/translate/translate-dashboard";

interface OrderProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderProps> = ({ data }) => {
  //language
  const user = useCurrentUser();
  const languageToUse = user?.language || "vi";
  const deliveryComfirmationClientMessage = getDeliveryComfirmationClient(languageToUse)
  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
        title={`${deliveryComfirmationClientMessage.orderInProgress} (${data.length})`}
        description={deliveryComfirmationClientMessage.manageOrderConfirmation}
      />
      <Downloadfile data={data} filename="orders" languageToUse={languageToUse}/>
    </div>
      <Separator />
      <DataTable languageToUse={languageToUse} searchKey="email" columns={columns} data={data} onSelect={()=>{}} onDelete={()=>{}} open={false} setOpen={() => false}/>
    </>
  );
};

export default OrderClient;
