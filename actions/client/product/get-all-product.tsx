import { Product } from "@/types/type";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/getAllProduct`;

interface Query {
  isFeatured?: boolean;
  language?: string; // Thêm tham số language
}

const getAllProduct = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      isFeatured: query.isFeatured,
      language: query.language || "vi", // Mặc định là "vi" nếu không truyền language
    },
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products.");
  }

  return res.json();
};

export default getAllProduct;
