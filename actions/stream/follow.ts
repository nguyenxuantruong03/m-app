"use server";

import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/stream/follow-service";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");
    if (followedUser) {
      revalidatePath(`/${followedUser.following.nameuser}`);
    }
    return followedUser;
  } catch {
    throw new Error("Interal Error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");
    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.nameuser}`);
    }
    return unfollowedUser;
  } catch {
    throw new Error("Interal Error");
  }
};
