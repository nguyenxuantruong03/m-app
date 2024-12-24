import { Favorite } from "@prisma/client";

const URLCategories = `${process.env.NEXT_PUBLIC_API_URL}/favorite`;

export const getFavorite = async (): Promise<Favorite[]> => {
  try {
    const res = await fetch(`${URLCategories}`);

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
