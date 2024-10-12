import { notFound } from "next/navigation"
import { currentUser } from "../auth"
import prismadb from "../prismadb"

export const getSelf = async () =>{
    const self = await currentUser()

    if(!self || !self.nameuser){
        throw new Error("Unauthorized")
    }

    const user = await prismadb.user.findUnique({
        where:{id: self.id}
    })

    if(!user){
        throw new Error("Not found")
    }

    return user
}

export const getSelfByUsername = async (nameuser: string) =>{
    const self = await currentUser()

    if(!self || !self.nameuser){
        throw new Error("Unauthorized")
    }

    const user = await prismadb.user.findUnique({
        where:{nameuser:nameuser}
    })

    if(!user) {
        throw new Error("User not found")
    }

    if(self.nameuser !== user.nameuser) {
        notFound()
    }

    return user
}