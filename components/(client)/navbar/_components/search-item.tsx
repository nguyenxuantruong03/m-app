"use client";
import axios from "axios";
import ShowResult from "./show-result";
import { useState, useEffect } from "react";
import { Product } from "@/types/type";
import ProductTrending from "./product-trending";
import { Loader, Star } from "lucide-react";

interface SearchItemProps {
  value: string;
}

const SearchItem = ({ value }: SearchItemProps) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const topSoldProducts = data
    .sort((a, b) => b.sold - a.sold) // Giả sử có thuộc tính `sold` trong Product
    .slice(0, 6);

  useEffect(() => {
    const fetchData = async () => {
      if (!value) return; // Ngăn gọi API nếu value rỗng
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/searchProduct`,
          { value: value }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Thiết lập debounce với timeout 2 giây
    const handler = setTimeout(() => {
      fetchData(); // Gọi API sau 2 giây khi người dùng dừng nhập
    }, 2000);

    // Cleanup: Hủy timeout nếu giá trị thay đổi (người dùng tiếp tục nhập)
    return () => {
      clearTimeout(handler);
    };
  }, [value]); // Gọi lại khi value thay đổi

  return (
    <div className="p-3 max-h-96 overflow-y-auto">
      {loading && (
        <div className="w-full flex space-y-4 justify-center items-center">
          <Loader className="h-10 w-10 text-muted-foreground animate-spin" />
        </div>
      )}
      {!loading && (
        <>
          <div>
            {value.length > 0 ? (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Result for term &quot;{value}&quot;
                </h2>
                {data.length === 0 && (
                  <div className="text-muted-foreground text-sm">
                    No result found. Try searching for something else.
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-lg text-center text-gray-300">
                  Hãy nhập nội dung tìm kiếm!
                </h2>
              </>
            )}
            <div className="flex flex-col gap-4">
              {data.map((result) => (
                <ShowResult key={result.id} data={result} />
              ))}
            </div>
          </div>
          {data.length > 0 && (
            <div className="mt-10">
              <div className="text-lg font-semibold mb-4 text-yellow-400 flex items-center space-x-2">
                <Star className="w-5 h-5" fill="#facc15" />
                <Star className="w-5 h-5" fill="#facc15" />{" "}
                <span>Product Trending</span>
                <Star className="w-5 h-5" fill="#facc15" />
                <Star className="w-5 h-5" fill="#facc15" />{" "}
              </div>
              <div className="flex flex-col gap-4">
                {topSoldProducts.map((result) => (
                  <ProductTrending key={result.id} data={result} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchItem;