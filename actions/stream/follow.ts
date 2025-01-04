"use server";

import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/stream/follow-service";
import { createTranslator } from "next-intl";

export const onFollow = async (id: string, languageToUse: string) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const followedUser = await followUser(id);

    revalidatePath("/");
    if (followedUser) {
      revalidatePath(`/${followedUser.following.nameuser}`);
    }
    return followedUser;
  } catch {
    throw new Error(t("toastError.somethingWentWrong"));
  }
};

export const onUnfollow = async (id: string, languageToUse: string) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");
    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.nameuser}`);
    }
    return unfollowedUser;
  } catch {
    throw new Error(t("toastError.somethingWentWrong"));
  }
};
