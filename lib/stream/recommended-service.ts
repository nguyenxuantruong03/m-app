import { getSelf } from "./auth-service";
import prismadb from "../prismadb";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    //Logic này giúp đảm bảo rằng nếu đã có follower thì không hiển thị recommended nữa
    //Bên cạnh đó nếu bị block sẽ không được hiển thị
    users = await prismadb.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            blocking: {
              none: {
                blockedId: userId,
              },
            },
          },
          {
            blocked: {
              none: {
                blockerId: userId,
              },
            },
          },
          {
            NOT: {
              nameuser: "@guest",  // Thêm điều kiện để lọc người dùng có nameuser là "@guest"
            },
          },
        ],
      },
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
      orderBy: [
        {
          stream: {
            isLive: "asc", // Xếp những người dùng có isLive = true lên đầu tiên
          },
        },
        {
          createdAt: "desc", // Sau đó xếp theo createdAt
        },
      ],
    });
  } else {
    users = await prismadb.user.findMany({
      where: {
        NOT: {
          nameuser: "@guest", // Thêm điều kiện để lọc người dùng có nameuser là "@guest"
        },
      },
      include: {
        imageCredential: true,
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc", // Xếp những người dùng có isLive = true lên đầu tiên
          },
        },
        {
          createdAt: "desc", // Sau đó xếp theo createdAt
        },
      ],
    });
  }

  return users;
};
