"use client"
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { SalaryStaffsColumn,columns } from "./column";

interface SettingUserClientProps{
    data: SalaryStaffsColumn[]
}

const SettingUserClient:React.FC<SettingUserClientProps> = ({data}) => {
    const role = useCurrentRole();
    const isRole = role === UserRole.ADMIN;
    const showAPIRole = isRole;
    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title ={`Lương (${data.length})`}
            description="Quản lý lương nhân viên"
            />
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />
        {showAPIRole && (
        <Heading title="Api" description="API calls for User" />
        )}
        <Separator />
        <ApiList 
        entityIdName="salarystaffId"
        entityName="salarystaff"
        />
        </>
     );
}
 
export default SettingUserClient;