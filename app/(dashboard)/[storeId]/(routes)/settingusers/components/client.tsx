"use client"
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { SettingUsersColumn,columns } from "./column";
import Downloadfile from "@/components/file/downloadfilepage";

interface SettingUserClientProps{
    data: SettingUsersColumn[]
}

const SettingUserClient:React.FC<SettingUserClientProps> = ({data}) => {
    const role = useCurrentRole();
    const isRole = role === UserRole.ADMIN;
    const showAPIRole = isRole;
    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title ={`Người dùng (${data.length})`}
            description="Quản lý người dùng"
            />
        <Downloadfile data={data} filename="settinguser" />
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />
        {showAPIRole && (
        <Heading title="Api" description="API calls for User" />
        )}
        <Separator />
        <ApiList 
        entityIdName="settingusersId"
        entityName="settingusers"
        />
        </>
     );
}
 
export default SettingUserClient;