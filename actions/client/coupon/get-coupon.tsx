import { Coupon } from "@/types/type"

const URLCategories = `${process.env.NEXT_PUBLIC_API_URL}/coupon`;

export const getCoupon = async (language: string): Promise<Coupon[]> => {
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