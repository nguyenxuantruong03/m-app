import { getSelf } from "./auth-service";
import prismadb from "../prismadb";

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();
    //Nếu bị block thì không được get ra ở follow
    const followedUsers = prismadb.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            imageCredential: {
              orderBy: {
                createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
              },
              take: 1, // Take only the most recent entry
            },
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          following: {
            stream: {
              isLive: "asc",
            },
          },
        },
        {
          following: {
            createdAt: "desc",
          },
        },
      ],
    });
    return followedUsers;
  } catch {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
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
    const existingFollow = await prismadb.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await prismadb.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await prismadb.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const follow = await prismadb.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });
  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await prismadb.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await prismadb.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  const follow = await prismadb.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};
