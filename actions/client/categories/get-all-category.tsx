import { Category } from "@/types/type"

const URLCategories = `${process.env.NEXT_PUBLIC_API_URL}/getAllCategory`;

export const getAllCategory = async (language: string): Promise<Category[]> => {
  try {
    const res = await fetch(`${URLCategories}?language=${language}`);

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
