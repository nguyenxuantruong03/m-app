"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import { getSelf } from "@/lib/stream/auth-service";
import { revalidatePath } from "next/cache";
import prismadb from "@/lib/prismadb";
import { translateFailedToCreateIngress, translateNoPermission } from "@/translate/translate-client";

const roomServider = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomServider.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomServider.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput, languageToUse: string) => {
  const self = await getSelf();
  //language
  const noPermissionMessage = translateNoPermission(languageToUse)
  const failedToCreateIngressMessage = translateFailedToCreateIngress(languageToUse)
  
  if (
    self.role !== "ADMIN" &&
    self.role !== "STAFF" &&
    self.role !== "MARKETING"
  ) {
    throw new Error(noPermissionMessage);
  }

  await resetIngresses(self.id);
  

  const options: CreateIngressOptions = {
    name: self.nameuser || "",
    roomName: self.id,
    participantName: self.nameuser || "",
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient.createIngress(ingressType, options)

  if (!ingress || !ingress.url || !ingress.streamKey ) {
    throw new Error(failedToCreateIngressMessage);
  }

  const existingStream = await prismadb.stream.findUnique({
    where: { userId: self.id },
  });

  if (existingStream) {
    // If stream exists, update it
    await prismadb.stream.update({
      where: { userId: self.id },
      data: {
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      },
    });
  } else {
    // If stream does not exist, create a new one
    await prismadb.stream.create({
      data: {
        userId: self.id,
        name: `${self.nameuser}'s stream`,
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      },
    });
  }

  revalidatePath(`me/${self.nameuser}/keys`);

  return ingress;
};
