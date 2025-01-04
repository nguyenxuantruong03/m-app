"use client";
import ShowResult from "./show-result";
import { useState, useEffect } from "react";
import { Product } from "@/types/type";
import ProductTrending from "./product-trending";
import { Loader, Star } from "lucide-react";
import getSearchProduct from "@/actions/client/serchProduct";
import { useTranslations } from "next-intl";

interface SearchItemProps {
  value: string;
}

const SearchItem = ({ value }: SearchItemProps) => {
  const t = useTranslations()
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
        const searchData = await getSearchProduct({ value });
        setData(searchData);
      } catch (error) {
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
                  {t("search.resultForTerm")} &quot;{value}&quot;
                </h2>
                {data.length === 0 && (
                  <div className="text-muted-foreground text-sm">
                    {t("search.noResultFound")}
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-lg text-center text-gray-300">
                  {t("search.enterSearchContent")}
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
                <span>{t("search.productTrending")}</span>
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
