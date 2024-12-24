import { Product } from "@/types/type";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/getAllProduct`;

interface Query {
  isFeatured?: boolean;
}

const getAllProduct = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products.");
  }

  return res.json();
};

export default getAllProduct;
