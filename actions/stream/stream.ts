"use server"

import { revalidatePath } from "next/cache"

import { getSelf } from "@/lib/stream/auth-service"
import { Stream } from "@prisma/client"
import prismadb from "@/lib/prismadb"
import { createTranslator } from "next-intl"

export const updateStream = async (values: Partial<Stream>) =>{
    const self = await getSelf()
    const languageToUse = self?.language || "vi";
    let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

    try{

        const selfStream = await prismadb.stream.findUnique({
            where: { userId: self.id }
        })
        
        if(!selfStream) {
            throw new Error(t("profile.streamNotFound"))
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
        throw new Error(t("toastError.somethingWentWrong"))
    }
}
