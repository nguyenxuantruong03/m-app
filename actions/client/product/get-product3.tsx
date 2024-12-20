import { Product } from "@/types/type";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/product3`

interface Query {
    categoryId?: string | string[]
    isFeatured?: boolean;
    language?: string;
    page?: number; // Trang hiện tại
    limit?: number; // Số sản phẩm mỗi trang
    colorId?: string
    sizeId?: string
  }
  
  const getProduct3 = async (query: Query): Promise<{
    translations: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
    };
  }> => {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
        language: query.language || "vi",
        page: query.page || 1,
        limit: query.limit || 9,
      },
    });
    const res = await fetch(url);
    return res.json();
  };
  

export default getProduct3