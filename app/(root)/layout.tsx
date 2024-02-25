import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function SetupLayout({children}:{children:React.ReactNode}){
    const userId = await currentUser();
    if(!userId) {
        redirect('/auth/login')
    }

    const store = await prismadb.store.findFirst({
        where:{
            userId: {
                equals: UserRole.USER,
              },
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