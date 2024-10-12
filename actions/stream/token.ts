"use server";

import cuid from "cuid";
import { AccessToken } from "livekit-server-sdk";

import { getSelf } from "@/lib/stream/auth-service";
import { isBlockedbyUsesr } from "@/lib/stream/block-service";
import { getUserById } from "@/lib/user-service";

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = cuid();
    const nameuser = `guest#${Math.floor(Math.random() * 1000)}`;

    self = { id, nameuser };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("User not found");
  }

  const isBlocked = await isBlockedbyUsesr(host.id);

  if (isBlocked) {
    throw new Error("User is blocked");
  }

  const isHost = self.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.nameuser || "",
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
