// Your main file
"use server";
import * as z from "zod";
import { UpdateImageSchema } from "@/schemas";
import prismadb from "@/lib/prismadb";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const image = async (values: z.infer<typeof UpdateImageSchema>) => {
  const validatedFields = UpdateImageSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Không hợp lệ!" };
  }
  const { imageCredential } = validatedFields.data;

  const user = await currentUser();
  // Find the existing user by id
  const existingUser = await getUserById(user?.id);

  // Update the existing user with the imageCredential
  await prismadb.user.update({
    where: {
      id: existingUser?.id,
    },
    data: {
      imageCredential: imageCredential.map((image: { url: string }) => image.url),
    },
  });

  return { success: "Thành công!" };
};
