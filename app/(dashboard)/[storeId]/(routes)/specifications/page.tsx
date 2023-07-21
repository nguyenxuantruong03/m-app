import prismadb from "@/lib/prismadb";
import SpecificationClient from "./components/client";
import { SpecificationColumn } from "./components/columns";
import { format } from "date-fns";

const SpecificationPage = async ({params}:{params:{storeId:string}}) => {
    const specifications = await prismadb.specifications.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    const formattedSpecification:  SpecificationColumn[] = specifications.map((item)=>({
        id: item.id,
        name: item.name,
        description : item.description,
        value: item.value,
        description2 : item.description2,
        value2: item.value2,
        description3 : item.description3,
        value3: item.value3,
        description4:   item.description4,
        value4: item.value4,
        description5 : item.description5,
        value5 : item.value5,
        description6 : item.description6,
        value6 : item.value6,
        description7 : item.description7,
        value7 : item.value7,
        description8 : item.description8,
        value8 : item.value8,
        description9 : item.description9,
        value9 : item.value9,
        description10 : item.description10,
        value10 : item.value10,
        createdAt:format(item.createdAt, 'MM/dd/yyyy')
    }))
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                < SpecificationClient data={formattedSpecification} />
            </div>
        </div>
     );
}
 
export default SpecificationPage;