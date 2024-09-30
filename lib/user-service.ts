import prismadb from "./prismadb";

export const getUserByUsername = async (nameuser: string) => {
  // Automatically add @ at the beginning if it doesn't exist
  const usernameWithAt = nameuser.startsWith("@") ? nameuser : `@${nameuser}`;

  const user = await prismadb.user.findUnique({
    where: {
      nameuser: usernameWithAt,
    },
    include: {
      socialLink: true,
      showInfomation: true,
      review: {
        orderBy: {
          createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
        },
        include: { imageReview: true, product: true },
      },
      imageCredential: {
        orderBy: {
          createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
        },
        take: 1, // Take only the most recent entry
      },
    },
  });
  return user;
};
