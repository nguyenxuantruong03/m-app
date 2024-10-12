import prismadb from "../prismadb";
import { getSelf } from "./auth-service";

export const getStreamByUserId = async (userId: string) => {
  const stream = await prismadb.stream.findUnique({
    where: { userId },
  });

  return stream;
};

export const getAllStream = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if(userId){
    streams = await prismadb.stream.findMany({
      where: {
        user: {
          AND: [
            // Không hiện những người mà người dùng đã block
            {
              blocking: {
                none: {
                  blockedId: userId, // Self là người dùng hiện tại
                },
              },
            },
            // Không hiện những người đã block người dùng hiện tại
            {
              blocked: {
                none: {
                  blockerId: userId,
                },
              },
            },
          ],
        },
      },
      select: {
        id: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
        user: {
          select: {
            id: true,
            frameAvatar: true,
            nameuser: true,
            isCitizen: true,
            role: true,
            image: true,
            imageCredential: {
              orderBy: {
                createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
              },
              take: 1, // Take only the most recent entry
            },
            _count: {
              select: {
                followedBy: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }else {
    streams = await prismadb.stream.findMany({
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};