import prismadb from "../prismadb";
import { getSelf } from "./auth-service";

export const getSearch = async (term?: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let user = [];
  if (userId) {
    user = await prismadb.user.findMany({
      where: {
          NOT: {
            ban: true,
            isbanforever: true
          },
          OR: [
            {
              name: {
                contains: term,
              },
            },
            {
                nameuser: {
                  contains: term,
                },
            },
            {
              stream:{
                name: {
                  contains: term,
                },
              }
            }
          ],
          AND: [
            // Không hiện những người mà người dùng đã block
            {
              blocking: {
                none: {
                  blockedId: userId,  // Self là người dùng hiện tại
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
      select: {
        id: true,
        name: true,
        imageCredential : true,
        image: true,
        nameuser: true,
        isCitizen: true,
        role: true,
        updatedAt: true,
        stream: {
          select: {
            id: true,
            updatedAt: true,
            isLive: true,
            thumbnailUrl: true,
            name: true,
          },
        },
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    user = await prismadb.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
              nameuser: {
                contains: term,
              },
          },
          {
            stream:{
              name: {
                contains: term,
              },
            }
          }
        ],
      },
      select: {
        id: true,
        name: true,
        imageCredential : true,
        image: true,
        nameuser: true,
        isCitizen: true,
        role: true,
        updatedAt: true,
        stream: {
          select: {
            id: true,
            updatedAt: true,
            isLive: true,
            thumbnailUrl: true,
            name: true,
          },
        },
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return user;
};
