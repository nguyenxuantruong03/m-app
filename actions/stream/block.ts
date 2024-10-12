"use server";

import { blockUser, unblockUser } from "@/lib/stream/block-service";
import { getSelf } from "@/lib/stream/auth-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomServider = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let blockedUser;
  try{
    blockedUser = await blockUser(id);
  }catch{
    //This means user is a guest
  }

  try{
    await roomServider.removeParticipant(self.id, id)
  }catch{
    //This means user is not in the room
  }

  revalidatePath(`/me/${self.nameuser}/community`);

  return blockedUser;
};

export const onUnBlock = async (id: string) => {
  const self = await getSelf()

  const unblockedUser = await unblockUser(id);

  revalidatePath(`/me/${self.nameuser}/community`);

  return unblockedUser;
};
