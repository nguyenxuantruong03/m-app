import prismadb from "@/lib/prismadb";

import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import StoreSwitcher from "./store-switcher";
import MainNav from "./main-nav";
import { ThemeToggleDrakorLight } from "../ui/theme-toggle";

const Navbar = async () => {
    const {userId} = auth()

    if(!userId){
        redirect("/sign-in")
    }
    
    const store= await prismadb.store.findMany({
        where:{
            userId
        }
    })
    return ( 
        <div className="border-b">
            <div className="items-center px-4 my-4">
                <StoreSwitcher items={store} />
                        <MainNav className="mx-6"/>
                <div className="ml-16 flex items-center space-x-4 mt-2">
                    <ThemeToggleDrakorLight />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;