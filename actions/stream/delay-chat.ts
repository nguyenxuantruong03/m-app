"use server";

import { getSelf } from "@/lib/stream/auth-service";
import prismadb from "@/lib/prismadb";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const delaychat = async (values: Partial<Stream>) => {
  const self = await getSelf();
  const selfStream = await prismadb.stream.findUnique({
    where: { userId: self.id },
  });
  if (!selfStream) {
    return {
      error: "Stream not found!",
    };
  }

  const valiData = {
    timeDelay: values.timeDelay,
  };

  const stream = await prismadb.stream.update({
    where: {
      id: selfStream.id,
    },
    data: {
      ...valiData,
    },
  });

  revalidatePath(`/${self.nameuser}`);
  revalidatePath(`/me/${self.nameuser}/chat`);

  return {
    success: `Thành công. Giới hạn thời gian chat trong ${stream.timeDelay / 1000}s.`,
    stream,
  };
};
