import prismadb from "./prismadb";

export const getSearchProduct = async (term?: string) => {
  const searchProduct = await prismadb.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: term,
          },
        },
        {
          heading: {
            contains: term,
          },
        },
        {
          description: {
            contains: term,
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      heading: true,
      description: true,
      images: true,
      productType: true,
      sold:true,
      productdetail: {
        select: {
          price1: true,
          percentpromotion1: true,
        }
      }
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });

  return searchProduct;
};
