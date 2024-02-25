import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"
import { SettingsForm } from "./components/setting-form"
import { currentUser } from "@/lib/auth"
import { UserRole } from "@prisma/client"

interface SettingProps{
    params: {
        storeId: string
    }
}

const SettingsPage:React.FC<SettingProps> = async ({params})=>{
    const userId = await currentUser();
    if(!userId) {
        redirect("sign-in")
    }

    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId,
            userId: {
                equals: UserRole.USER,
              },
        }
    })

    if(!store){
        redirect('/')
    }

    return (
        <div className="w-full">
            <div className=" space-y-4 p-8 pt-6">
                <SettingsForm initialData={store}/>
            </div>
        </div>
    )
}

export default SettingsPage