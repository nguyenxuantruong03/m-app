"use server";

import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/stream/follow-service";
import { getToastError } from "@/translate/translate-client";

export const onFollow = async (id: string, languageToUse: string) => {
  //language
  const toastErrorMessage = getToastError(languageToUse)

  try {
    const followedUser = await followUser(id);

    revalidatePath("/");
    if (followedUser) {
      revalidatePath(`/${followedUser.following.nameuser}`);
    }
    return followedUser;
  } catch {
    throw new Error(toastErrorMessage);
  }
};

export const onUnfollow = async (id: string, languageToUse: string) => {
  //language
  const toastErrorMessage = getToastError(languageToUse)
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");
    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.nameuser}`);
    }
    return unfollowedUser;
  } catch {
    throw new Error(toastErrorMessage);
  }
};
