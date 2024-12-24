import { Product } from "@/types/type";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/product2`

interface Query {
    categoryId?: string | string[]
    isFeatured?: boolean;
    page?: number; // Trang hiện tại
    limit?: number; // Số sản phẩm mỗi trang
    colorId?: string
    sizeId?: string
  }
  
  const getProduct2 = async (query: Query): Promise<{
    products: Product[];
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
        page: query.page || 1,
        limit: query.limit || 9,
      },
    });
    const res = await fetch(url);
    return res.json();
  };
  

export default getProduct2