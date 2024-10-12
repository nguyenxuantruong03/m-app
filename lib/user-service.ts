import prismadb from "./prismadb";

export const getUserByUsername = async (nameuser: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      nameuser: nameuser,
    },
    select: {
      id: true,
      name: true,
      favorite: true,
      email: true,
      address: true,
      gender: true,
      phonenumber: true,
      dateofbirth: true,
      addressother: true,
      nameuser: true,
      socialLink: true,
      showInfomation: true,
      frameAvatar: true,
      createdAt: true,
      review: {
        orderBy: {
          createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
        },
        select: {
          user: { include: { following: true, followedBy: true } },
          id:true,
          emoji: {
            select: {
              emojilengthLove: true,
              emojilengthHaha: true,
              emojilengthWow: true,
              emojilengthAngry: true,
              emojilengthLike: true,
              emojilengthSad: true,
            },
          },
          content:true,
          rating:true,
          isPublic:true,
          categoryName: true,
          productId: true,
          createdAt: true,
          imageReview:true,
          userId: true,
          product: {
            select: {
              id: true,
              name: true,
              heading: true,
              productType: true,
              productdetail: {
                select: {
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      imageCredential: {
        orderBy: {
          createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
        },
        take: 1, // Take only the most recent entry
      },
      image: true,
      bio: true,
      isCitizen: true,
      role: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
          timeDelay: true,
          user:{
            select: {
              id: true,
              name: true,
              nameuser: true,
              image:true,
              isCitizen:true,
              role: true,
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
            }
          }
        },
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prismadb.user.findUnique({
    where: { id },
    include: {
      stream: true,
    },
  });
  return user;
};
