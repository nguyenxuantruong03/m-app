"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { CommentColumn, columns } from "./column";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface CommentClientProps {
  data: CommentColumn[];
}

const CommentClient: React.FC<CommentClientProps> = ({ data }) => {
  const t = useTranslations()
  const role = useCurrentRole();
  const [open, setOpen] = useState(false);
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t("comment.client.review")} (${data.length})`}
          description={t("comment.client.manageReview")}
        />
        <Downloadfile data={data} filename="đánh_giá"/>
      </div>
      <Separator />
      <DataTable
        placeholder={t("comment.client.enterEmail")}
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
      />
      {showAPIRole && (
        <Heading title={t("action.api")} description={t("comment.client.apiCalls")} />
      )}
      <Separator />
      <ApiList entityIdName="commentId" entityName="comments" />
    </>
  );
};

export default CommentClient;
