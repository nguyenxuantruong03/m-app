"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { ProductDetailColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getEnterTitleTranslation, getProductDetailClient } from "@/translate/translate-dashboard";

interface ProductDetailClientProps {
  data: ProductDetailColumn[];
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<ProductDetailColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  //language
  const user = useCurrentUser()
  const languageToUse = user?.language || "vi";
  const productDetailClientMessage = getProductDetailClient(languageToUse)
  const enterTitleMessage = getEnterTitleTranslation(languageToUse)

  const handleDelete = async () => {
    setLoading(true);
    try {
      const ids = selectedRows.map((row) => row.id);
      await axios.delete(`/api/${params.storeId}/productdetail`, {
        data: { ids },
      });
      setLoading(false);
      setOpen(false);
      toast.success(productDetailClientMessage.productDetailDeletedSuccessfully);
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
          productDetailClientMessage.somethingWentWrong
        );
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${productDetailClientMessage.productDetail} (${data.length})`}
          description={productDetailClientMessage.manageProductDetail}
        />
        <div className="flex space-x-3">
          <Downloadfile data={data} filename="productdetail" languageToUse={languageToUse}/>
          <Button
            onClick={() => router.push(`/${params.storeId}/productdetail/new`)}
          >
            <Plus className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">{productDetailClientMessage.addNew}</span>
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        placeholder={enterTitleMessage}
        searchKey="title"
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
        <Heading title={productDetailClientMessage.api} description={productDetailClientMessage.apiCallsForProductDetail} />
      )}
      <Separator />
      <ApiList entityIdName="productdetailId" entityName="productdetail" />
    </>
  );
};

export default ProductDetailClient;
