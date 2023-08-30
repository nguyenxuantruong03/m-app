import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({children}:{children:React.ReactNode}){
    const {userId} = auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where:{
            userId
        }
    })
    /* Mã đang kiểm tra xem cửa hàng có tồn tại cho người dùng hiện tại hay không. Nếu một cửa hàng tồn tại, nó sẽ chuyển hướng
     người dùng đến trang tương ứng với ID của cửa hàng đó. */
    if(store){
        redirect(`/${store.id}`)
    }

    return (
        <>
        {children}
        </>
    )
}