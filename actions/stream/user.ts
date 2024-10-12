"use server";

import { getSelf } from "@/lib/stream/auth-service";
import prismadb from "@/lib/prismadb";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (values: Partial<User>) => {
    const self = await getSelf();

    const valiData = {
      bio: values.bio,
    };

    const user = await prismadb.user.update({
      where: {
        id: self.id,
      },
      data: {
        ...valiData,
      },
    });

    revalidatePath(`/${self.nameuser}`)
    revalidatePath(`/me/${self.nameuser}`)

    return user;
};
