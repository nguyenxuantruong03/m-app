"use server";

import { getSelf } from "@/lib/stream/auth-service";
import prismadb from "@/lib/prismadb";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createTranslator } from "next-intl";

export const delaychat = async (values: Partial<Stream>) => {
  const self = await getSelf();
  const selfStream = await prismadb.stream.findUnique({
    where: { userId: self.id },
  });
  const languageToUse = self?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  if (!selfStream) {
    return {
      error: t("profile.streamNotFound"),
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

  return {
    success: t("profile.chatLimitSuccess",{delayInSeconds: delayInSeconds}),
    stream,
  };
};
