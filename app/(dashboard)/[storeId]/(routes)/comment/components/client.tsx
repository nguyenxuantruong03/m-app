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
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCommentClient, getEnterEmailTranslation } from "@/translate/translate-dashboard";

interface CommentClientProps {
  data: CommentColumn[];
}

const CommentClient: React.FC<CommentClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const [open, setOpen] = useState(false);
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
    //language
    const user = useCurrentUser();
    const languageToUse = user?.language || "vi";
    const commentClientMessage = getCommentClient(languageToUse);
    const enterEmailMessage = getEnterEmailTranslation(languageToUse);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${commentClientMessage.review} (${data.length})`}
          description={commentClientMessage.manageReview}
        />
        <Downloadfile data={data} filename="đánh_giá" languageToUse={languageToUse}/>
      </div>
      <Separator />
      <DataTable
        placeholder={enterEmailMessage}
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
        languageToUse={languageToUse}
      />
      {showAPIRole && (
        <Heading title={commentClientMessage.api} description={commentClientMessage.apiCalls} />
      )}
      <Separator />
      <ApiList entityIdName="commentId" entityName="comments" />
    </>
  );
};

export default CommentClient;
