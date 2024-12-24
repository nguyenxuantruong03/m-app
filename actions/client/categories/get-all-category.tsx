import { Category } from "@/types/type"

const URLCategories = `${process.env.NEXT_PUBLIC_API_URL}/getAllCategory`;

export const getAllCategory = async (): Promise<Category[]> => {
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
