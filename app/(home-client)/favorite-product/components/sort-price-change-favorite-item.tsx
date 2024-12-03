"use client";
import useFavorite from "@/hooks/client/db/use-favorite";
import "./favorite-item.css";
import React, { useState, useEffect } from "react";
import Currency from "@/components/ui/currency";
import {
  getColorPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";
import {
  translateMaximum,
  translateMinimum,
} from "@/translate/translate-client";

interface PriceRangeProps {
  languageToUse: string;
}
const PriceRange = ({ languageToUse }: PriceRangeProps) => {
  const [priceGap, setPriceGap] = useState<number>(100);
  const [minPrice, setMinPrice] = useState<number>(0);
  // maxPrice: Đây là biến state chứa giá trị tối đa của khoảng giá, được sử dụng để hiển thị giá trị tối đa trên thanh trượt và trong giao diện người dùng.
  const [maxPrice, setMaxPrice] = useState<number>(0);
  // maxPriceInItems: Đây là biến state khác chứa giá trị tối đa của các mục trong mảng favorite.items.
  // Nó được cập nhật từ mảng favorite.items bằng cách tính toán giá trị cao nhất của price * ((100 - percentpromotion) / 100) + 1000000 và sau đó được sử dụng để cập
  // nhật giá trị tối đa của khoảng giá (maxPrice).
  const [maxPriceInItems, setMaxPriceInItems] = useState<number>(0); // Thêm biến trạng thái mới

  //language
  const minimumMessage = translateMinimum(languageToUse);
  const maximumMessage = translateMaximum(languageToUse);

  const favorite = useFavorite();

  const getPriceMatchColorandSize = ({
    product,
    selectedSize,
    selectedColor,
  }: any) => {
    const { price: priceSize, percentpromotion: percentpromotionSize } =
      getSizePrice(product, selectedSize);
    const { price: priceColor, percentpromotion: percentpromotionColor } =
      getColorPrice(product, selectedColor);

    // Determine the highest price and the corresponding percentpromotion
    const finalPrice = Math.ceil(Math.max(priceSize, priceColor));
    const finalPercentpromotion =
      priceSize >= priceColor ? percentpromotionSize : percentpromotionColor;

    return {
      price: finalPrice,
      percentpromotion: finalPercentpromotion,
    };
  };

  useEffect(() => {
    // Tính giá trị cao nhất từ mảng items dựa trên màu sắc và kích thước đã chọn
    const maxPriceInItems = Math.max(
      ...favorite.items.map((item) => {
        // Gọi hàm getPriceMatchColorandSize để lấy giá và phần trăm giảm giá dựa trên size và color đã chọn
        const { price, percentpromotion } = getPriceMatchColorandSize({
          product: item.product,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        });

        // Lấy price hiện tại + thêm 1tr
        return price + 1000000;
      })
    );

    setMaxPriceInItems(maxPriceInItems);
    setMaxPrice(maxPriceInItems); // Cập nhật maxPrice với giá trị mới
    // Initial filtering
    const filteredItems = favorite.items.filter((item) => {
      const { price } = getPriceMatchColorandSize({
        product: item.product,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      });
      return price >= minPrice && price <= maxPrice;
    });

    favorite.setFilteredItems(filteredItems);
  }, [favorite.items]);

  useEffect(() => {
    const progressWidth = ((minPrice / maxPriceInItems) * 100).toFixed(2);
    const progressRight = ((1 - maxPrice / maxPriceInItems) * 100).toFixed(2);
    const range = document.querySelector(".slider .progress") as HTMLDivElement;
    range.style.left = `${progressWidth}%`;
    range.style.right = `${progressRight}%`;
  }, [minPrice, maxPrice]);

  const handleRangeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMinRange: boolean
  ) => {
    const inputValue = parseInt(e.target.value);

    if (isMinRange && inputValue <= maxPrice - priceGap) {
      setMinPrice(inputValue);
    } else if (!isMinRange && inputValue >= minPrice + priceGap) {
      setMaxPrice(inputValue);
    }

    const filteredItems = favorite.items.filter((item) => {
      // Gọi hàm getPriceMatchColorandSize để lấy giá dựa trên size và color đã chọn
      const { price } = getPriceMatchColorandSize({
        product: item.product,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      });

      // Lọc sản phẩm dựa trên giá đã tính toán
      const finalPrice = price;
      return finalPrice >= minPrice && finalPrice <= maxPrice;
    });

    favorite.setFilteredItems(filteredItems);
  };

  return (
    <div className="wrapper w-full md:w-[500px]">
      <div className="price-input">
        <div className="field">
          <span className="font-semibold mr-1">{minimumMessage} </span>
          <Currency value={minPrice} />
        </div>
        <div className="seperator text-red-500">-</div>
        <div className="field">
          <span className="font-semibold mr-1">{maximumMessage} </span>
          <Currency value={maxPrice} />
        </div>
        {/* Thanh trướt slider và progress để kéo */}
      </div>
      <div className="slider">
        <div className="progress"></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          min="0"
          max={maxPriceInItems}
          value={minPrice}
          onChange={(e) => handleRangeInputChange(e, true)}
        />
        <input
          type="range"
          min="0"
          max={maxPriceInItems}
          value={maxPrice}
          onChange={(e) => handleRangeInputChange(e, false)}
        />
      </div>
    </div>
  );
};

export default PriceRange;
