import prismadb from "./prismadb";
import { getSelf } from "./stream/auth-service";

export const getAllreview = async () => {
  const self = await getSelf();
  const user = await prismadb.review.findMany({
    where: {
      user: {
        AND: [
          // Không hiện những người mà người dùng đã block
          {
            blocking: {
              none: {
                blockedId: self.id,  // Self là người dùng hiện tại
              },
            },
          },
          // Không hiện những người đã block người dùng hiện tại
          {
            blocked: {
              none: {
                blockerId: self.id,
              },
            },
          },
        ],
      },
    },
    select: {
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
      user: {
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
          frameAvatar:true,
          createdAt: true,
          image: true,
          bio: true,
          isCitizen: true,
          role: true,
          imageCredential: {
            orderBy: {
              createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
            },
            take: 1, // Take only the most recent entry
          },
          following: true, 
          followedBy: true,
          blocking:true,
          blocked:true,
          stream: {
            select: {
              isLive: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc"
    },
  });
  return user;
};
