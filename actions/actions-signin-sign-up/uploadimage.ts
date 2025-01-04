// Your main file
"use server";
import * as z from "zod";
import { UpdateImageSchema } from "@/schemas";
import prismadb from "@/lib/prismadb";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

export const image = async (values: z.infer<typeof UpdateImageSchema>,languageToUse: string) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  const validatedFields = UpdateImageSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: t("uploadImage.invalid") };
  }
  const { imageCredential } = validatedFields.data;

  const user = await currentUser();
  // Find the existing user by id
  const existingUser = await getUserById(user?.id);

  // Update the existing user with the imageCredential
  if (existingUser) {
    await prismadb.imageCredential.create({
      data: {
        userId: existingUser.id,
        url: imageCredential[0]?.url // Assuming imageCredential is an array and we take the first one
      }
    });
  } else {
    return { error: t("uploadImage.userNotFound") };
  }

  return { success: t("uploadImage.success") };
};
