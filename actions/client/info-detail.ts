"use server";

import { ShowInfomation } from "@prisma/client";
import prismadb from "./../../lib/prismadb";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const updateInfoDetail = async (values: Partial<ShowInfomation>) => {
  try {
    const userId = await currentUser();
    const userExiting = await prismadb.user.findUnique({
      where: { id: userId?.id },
    });
    if (!userExiting) {
      throw new Error("Cant not User");
    }

    const showInfomation = await prismadb.showInfomation.findUnique({
      where:{
        userId: userExiting.id
      }
    })

    const valiData = {
        isEmail: values.isEmail,
        isGender: values.isGender,
        isPhone: values.isPhone,
        isDateofBirth: values.isDateofBirth,
        isAddress: values.isAddress,
        isAdressOther: values.isAdressOther,
        isFavorite: values.isFavorite,
        isSocial: values.isSocial,
    };

    let infoDetail;
    
    if(showInfomation){
      infoDetail = await prismadb.showInfomation.update({
        where: {
          userId: userExiting.id,
        },
        data: {
          userId:userExiting.id,
          ...valiData,
        },
      });
    }else{
      infoDetail = await prismadb.showInfomation.create({
        data: {
          userId:userExiting.id,
          ...valiData,
        },
      });
    }

        revalidatePath(`/u/${userExiting.nameuser}`)
        revalidatePath(`/${userExiting.nameuser}`)

    return infoDetail;
  } catch {
    throw new Error("Internal error");
  }
};
