import prismadb from "../prismadb";
import { getSelf } from "./auth-service";

//logic này là người bị chặn
export const isBlockedbyUsesr = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prismadb.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await prismadb.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

//Logic này là người chặn
export const isExistingBlockedbyUsesr = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await prismadb.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await prismadb.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });
    if (existingBlock) {
      return existingBlock.blockerId;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await prismadb.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await prismadb.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("Already blocked");
  }

  const existingFollow = await prismadb.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    await prismadb.follow.delete({
      where: {
        id: existingFollow.id,
      },
      include: {
        following: true,
      },
    });
  }

  const block = await prismadb.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot unblock yourself");
  }

  const otherUser = await prismadb.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await prismadb.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("Not blocked");
  }

  const unblock = await prismadb.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await prismadb.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocker: {
        include:{
         blocking: {
          select: {
            createdAt: true
          }
         }
        },
      },
      blocked: {
        select: {
          id: true,
          createdAt: true,
          imageCredential: {
            orderBy: {
              createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
            },
            take: 1, // Take only the most recent entry
          },
          image: true,
          frameAvatar: true,
          role: true,
          isCitizen: true,
          nameuser: true,
          stream: {
            select: {
              isLive: true
            }
          }
        },
      },
    },
  });

  return blockedUsers;
};
