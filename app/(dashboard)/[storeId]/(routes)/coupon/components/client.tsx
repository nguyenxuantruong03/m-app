"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { CouponColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCouponClient, getEnterNameTranslation } from "@/translate/translate-dashboard";

interface CouponClientProps {
  data: CouponColumn[];
}

const CouponClient: React.FC<CouponClientProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<CouponColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  //language
  const user = useCurrentUser();
  const languageToUse = user?.language || "vi";
  const couponClientMessage = getCouponClient(languageToUse)
  const enterNameMessage = getEnterNameTranslation(languageToUse)

  const handleDelete = async () => {
    setLoading(true);
    try {
      const ids = selectedRows.map((row) => row.id);
      await axios.delete(`/api/${params.storeId}/coupon`, {
        data: { ids },
      });
      setLoading(false);
      setOpen(false);
      toast.success(couponClientMessage.couponDeletedSuccessfully);
      // Optionally, refresh data or handle post-delete state
    } catch (error) {
      setLoading(false);
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(
          couponClientMessage.somethingWentWrong
        );
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${couponClientMessage.coupon} (${data.length})`}
          description={couponClientMessage.manageCoupon}
        />
        <div className="flex space-x-3">
          <Downloadfile data={data} filename="coupon" languageToUse={languageToUse}/>
          <Button onClick={() => router.push(`/${params.storeId}/coupon/new`)}>
            <Plus className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">{couponClientMessage.addNew}</span>
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        placeholder={enterNameMessage}
        searchKey="name"
        columns={columns}
        data={data}
        onSelect={(rows) => {
          setSelectedRows(rows.map((row) => row.original));
        }}
        disable={loading}
        onDelete={handleDelete}
        setOpen={setOpen}
        open={open}
        languageToUse={languageToUse}
      />
      {showAPIRole && (
        <Heading title={couponClientMessage.api} description={couponClientMessage.apiCallsForCoupon} />
      )}
      <Separator />
      <ApiList entityIdName="couponId" entityName="coupon" />
    </>
  );
};

export default CouponClient;
