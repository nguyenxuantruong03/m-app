"use server";

import { getSelf } from "@/lib/stream/auth-service";
import prismadb from "@/lib/prismadb";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { translateChatLimitSuccess, translateStreamNotFound } from "@/translate/translate-client";

export const delaychat = async (values: Partial<Stream>,languageToUse: string) => {
  const self = await getSelf();
  const selfStream = await prismadb.stream.findUnique({
    where: { userId: self.id },
  });

  //languages
  const streamNotFoundMessage = translateStreamNotFound(languageToUse)

  if (!selfStream) {
    return {
      error: streamNotFoundMessage,
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

  const delayInSeconds = stream.timeDelay / 1000
  const chatLimitSuccessMessage = translateChatLimitSuccess(languageToUse,delayInSeconds)

  return {
    success: chatLimitSuccessMessage,
    stream,
  };
};
