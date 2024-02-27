"use client";

import { useParams } from "next/navigation";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entityIdName,
  entityName,
}) => {
  const params = useParams();
  const origin = useOrigin();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <>
      {showAPIRole && (
        <>
          <ApiAlert
            title="GET"
            variant="public"
            description={`${baseUrl}/${entityName}`}
          />
          <ApiAlert
            title="GET"
            variant="public"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          />
          <ApiAlert
            title="POST"
            variant="admin"
            description={`${baseUrl}/${entityName}`}
          />
          <ApiAlert
            title="PATCH"
            variant="admin"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          />
          <ApiAlert
            title="DELETE"
            variant="admin"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          />
        </>
      )}
    </>
  );
};
