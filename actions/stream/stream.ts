"use server"

import { revalidatePath } from "next/cache"

import { getSelf } from "@/lib/stream/auth-service"
import { Stream } from "@prisma/client"
import prismadb from "@/lib/prismadb"
import { getToastError, translateStreamNotFound } from "@/translate/translate-client"

export const updateStream = async (values: Partial<Stream>, languageToUse: string) =>{
    //languages
    const toastErrorMessage = getToastError(languageToUse)
    const streamNotFoundMessage = translateStreamNotFound(languageToUse)

    try{
        const self = await getSelf()
        const selfStream = await prismadb.stream.findUnique({
            where: { userId: self.id }
        })
        
        if(!selfStream) {
            throw new Error(streamNotFoundMessage)
        }

        const valiData = {
            name: values.name,
            thumbnailUrl: values.thumbnailUrl,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed,
        }

        const stream = await prismadb.stream.update({
            where:{
                id: selfStream.id
            },
            data:{
                ...valiData
            }
        });

        revalidatePath(`/me/${self.nameuser}/chat`)
        revalidatePath(`/me/${self.nameuser}`)
        revalidatePath(`/${self.nameuser}`)

        return stream
    }catch{
        throw new Error(toastErrorMessage)
    }
}
