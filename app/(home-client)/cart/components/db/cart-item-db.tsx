"use client";

import {
  getColorOldPrice,
  getColorPrice,
  getSizeOldPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import useCartdb from "@/hooks/client/db/use-cart-db";
import { CartItemType, ProductDetail } from "@/types/type";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartItemProps {
  data: CartItemType;
  userId: string;
  setLoadingChange: Dispatch<SetStateAction<boolean>>;
  loadingChange: boolean;
}

const CartItemDatabase: React.FC<CartItemProps> = ({
  data,
  userId,
  setLoadingChange,
  loadingChange,
}) => {
  const cartdb = useCartdb();
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(data.quantity || 1);
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [quantityInventory, setQuantiyInventory] = useState(false);
  const [loadingLimitQuantity, setLoadingLimitQuantity] = useState(false);
  const selected = cartdb.selectedItems.includes(data.id);
  const warranty = cartdb.getSelectedItemWarranty(data.id);

  //GetPrice dựa vào size
  const getPriceMatchColorandSize = () => {
    const sizePrice = getSizePrice(data.product, data.size);
    const colorPrice = getColorPrice(data.product, data.color);
    return Math.ceil(Math.max(sizePrice, colorPrice));
  };

  //GetPrice dựa vào color
  const getPriceOldMatchColorandSize = () => {
    const sizeOldPrice = getSizeOldPrice(data.product, data.size);
    const colorOldPrice = getColorOldPrice(data.product, data.color);
    return Math.ceil(Math.max(sizeOldPrice, colorOldPrice));
  };

  //Quantity: Thêm hàm để lấy số lượng dựa trên giá cao nhất
  const getQuantityMatchColorandSize = () => {
    const sizePrice = getSizePrice(data.product, data.size);
    const colorPrice = getColorPrice(data.product, data.color);
    const highestPrice = Math.max(sizePrice, colorPrice);

    switch (highestPrice) {
      case data.product.productdetail.price5 *
        ((100 - data.product.productdetail.percentpromotion5) / 100):
        return data.product.productdetail.quantity5;
      case data.product.productdetail.price4 *
        ((100 - data.product.productdetail.percentpromotion4) / 100):
        return data.product.productdetail.quantity4;
      case data.product.productdetail.price3 *
        ((100 - data.product.productdetail.percentpromotion3) / 100):
        return data.product.productdetail.quantity3;
      case data.product.productdetail.price2 *
        ((100 - data.product.productdetail.percentpromotion2) / 100):
        return data.product.productdetail.quantity2;
      default:
        return data.product.productdetail.quantity1;
    }
  };

  //Tìm kiếm quantity của sản phẩm
  const maxQuantity = getQuantityMatchColorandSize();

  //So sánh sản phẩm hiện tại và sản phẩm có sẳn nhưng maxQuantity phải lớn hơn 0 mới đủ điều kiện
  const compareQuantityExistingAndAvailable =
    quantity > maxQuantity && maxQuantity > 0;

  // Update button disabled status based on quantity
  useEffect(() => {
    setQuantiyInventory(maxQuantity === 0);

    if (maxQuantity === 0) {
      cartdb.toggleSelectItem("", userId,data.id,""); // Deselect the item
    }

    if (compareQuantityExistingAndAvailable) {
      cartdb.toggleSelectItem(" ", userId,"",data.id); // Update Zustand store
    }
  }, [data.size, data.color, data.id]); // Depend on size and color selections

  //Kiểm tra tất cả sản phẩm có === 0 không
  const productQuantityAll = [1, 2, 3, 4, 5].every(
    (i) =>
      data.product.productdetail[`quantity${i}` as keyof ProductDetail] === 0
  );

  //So sánh logic của quantityInventory và compareQuantityExistingAndAvailable
  const isOutOfStock = quantityInventory || compareQuantityExistingAndAvailable;

  const handleQuantityChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0 && value <= maxQuantity) {
      if (value <= 99) {
        try {
          setQuantity(value);
          setLoadingChange(true);
          await cartdb.updateQuantity(data.id, value, warranty, userId);
        } catch (error) {
          toast.error("Lỗi cập nhật sản phẩm!");
          setLoadingChange(false);
        } finally {
          setLoadingChange(false);
        }
      } else {
        toast.error("Bạn chỉ có thể chọn tối đa 99 sản phẩm!");
      }
    } else if (value > maxQuantity) {
      toast.error(`Số lượng còn lại ${maxQuantity} sản phẩm!`);
    }
  };

  const incrementQuantity = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (quantity >= 99) {
      toast.error("Bạn chỉ có thể chọn tối đa 99 sản phẩm!");
      return;
    }

    if (quantity) {
      setQuantity((prevQuantity) => {
        const newQuantity = Math.min(prevQuantity + 1, maxQuantity);
        return newQuantity;
      });
      
      // Perform the async operation after updating the quantity
      if (quantity < maxQuantity) {
        try {
          setLoadingChange(true);
          await cartdb.updateQuantity(data.id, quantity + 1, warranty, userId); // Update the quantity in the cartdb
        } catch (error) {
          toast.error(`Lỗi cập nhật sản phẩm!`);
          setLoadingLimitQuantity(true);
          setLoadingChange(false);
        } finally {
          setLoadingChange(false);
        }
      } else {
        toast.error(`Số lượng còn lại ${maxQuantity} sản phẩm!`);
      }
    }
  };

  const decrementQuantity = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (quantity) {
      setLoadingLimitQuantity(false);
      // Update quantity in state synchronously
      setQuantity((prevQuantity) => {
        const newQuantity = Math.max(prevQuantity - 1, 1);
        return newQuantity;
      });

      // Perform the async operation outside of setQuantity
      const newQuantity = Math.max(quantity - 1, 1);
      if (newQuantity < quantity) {
        try {
          setLoadingChange(true);
          await cartdb.updateQuantity(data.id, newQuantity, warranty, userId); // Update the quantity in the cartdb
        } catch (error) {
          toast.error("Lỗi khi cập nhật số lượng!");
          setLoadingChange(false);
        } finally {
          setLoadingChange(false);
        }
      }
    }
  };

  const onRemove = async () => {
    setLoadingChange(true);
    try {
      await cartdb.removeItem(data.id, userId);
      await cartdb.fetchCartItems(userId);
    } catch (error) {
      toast.error("Error removing item");
      setLoadingChange(false);
    } finally {
      setLoadingChange(false);
    }
  };

  const getRouteBasedOnProductType = (productType: any) => {
    switch (productType.toLowerCase()) {
      case "ongnhua":
        return "ongnhua";
      case "quat":
        return "quat";
      case "bongden":
        return "bongden";
      case "daydien":
        return "daydien";
      case "ocam":
        return "ocam";
      case "son":
        return "son";
      case "product":
        return "product0";
      case "product1":
        return "product1";
      case "product2":
        return "product2";
      case "product3":
        return "product3";
      case "product4":
        return "product4";
      case "product5":
        return "product5";
      case "product6":
        return "product6";
      case "product7":
        return "product7";
      case "product8":
        return "product8";
      case "product9":
        return "product9";
      case "product10":
        return "product10";
      case "product11":
        return "product11";
      default:
        return ""; // Handle the default case as needed
    }
  };

  const handleClick = () => {
    const route = getRouteBasedOnProductType(data.product.productType);
    // // -----------Log the values for debugging----------------
    // console.log('Product Type:', data.productType);
    // console.log('Route:', route);
    if (route) {
      // Construct the complete URL
      const href = `/${route}/${data.product.name}`;
      // Use the Link component for navigation
      router.push(href);
    } else {
      console.error("Invalid route:", route);
    }
  };
  return (
    <li
      className={`flex items-center py-6 border-b ${
        selected ? "selected" : ""
      }`}
    >
      <div className="px-2 md:px-5 my-auto">
        {isOutOfStock ? (
          <span>
            {quantityInventory ? (
              <span className="p-1 rounded-md bg-red-500 text-white">
                Hết hàng
              </span>
            ) : (
              <div className="p-1 rounded-md bg-red-500 text-white text-center">
                <p> Không đủ </p> <p>hàng </p>
              </div>
            )}
          </span>
        ) : (
          <Input
            className="w-4 h-4"
            type="checkbox"
            checked={cartdb.selectedItems.includes(data.id)}
            onChange={() => cartdb.toggleSelectItem(data.id, userId, "","")}
            disabled={loadingChange || productQuantityAll || quantityInventory}
          />
        )}
      </div>
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.product.images[0].url}
          alt="404"
          className="object-cover object-center cursor-pointer"
          onClick={handleClick}
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-4 md:right-0 top-0">
          <IconButton
            disabled={loadingChange}
            onClick={onRemove}
            icon={<X size={15} />}
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6">
          <div className="flex justify-between">
            <div className="max-w-40">
              <p className="text-lg font-semibold text-black">
                {data.product.heading}
              </p>
              {/* Check nếu có isOutOfStock thì hiển theo quantityInventory lên khi hàng hết hoặc ko đủ số lượng */}
              {isOutOfStock && (
                <div>
                  {quantityInventory ? (
                    <p className="text-red-500 text-xs">
                      Phân loại hàng này bán hết, vui lòng lựa chọn một phân
                      loại khác.
                    </p>
                  ) : (
                    <p className="text-red-500 text-xs">
                      Phân loại hàng này không đủ hàng, giảm số lượng phù hợp
                      trong kho.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-1 flex text-sm">
            <div
              className="h-6 w-6 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <p className="text-gray-500 ml-4 border-1 border-gray-200">
              {data.size}
            </p>
            <p className="text-gray-500 ml-4 border-1 border-gray-200">
              {data.product.productdetail.category?.name}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
            {/* Quantity increment and decrement buttons */}
            <Button
              disabled={productQuantityAll || quantityInventory}
              variant="outline"
              onClick={decrementQuantity} // Single click to decrement
              className="w-10 h-10 flex justify-center items-center border rounded-md border-gray-300 bg-white hover:bg-gray-200 hover:bg-opacity-50 hover:text-slate-900"
            >
              -
            </Button>
            {isEditingQuantity || maxQuantity === 0 ? (
              <Input
                disabled={productQuantityAll || quantityInventory}
                type="number"
                className="text-xl mx-1 border rounded-md border-gray-300 w-20 text-center bg-white focus:bg-white hover:bg-white"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={() => setIsEditingQuantity(false)}
                autoFocus
              />
            ) : (
              <span
                className="text-xl mx-1 border rounded-md border-gray-300 w-20 py-1.5 text-center bg-white cursor-pointer"
                onClick={() => setIsEditingQuantity(true)}
              >
                {quantity}
              </span>
            )}
            <Button
              disabled={
                loadingLimitQuantity ||
                productQuantityAll ||
                quantityInventory ||
                compareQuantityExistingAndAvailable
              }
              variant="outline"
              onClick={incrementQuantity} // Single click to decrement
              className="w-10 h-10 flex justify-center items-center border rounded-md border-gray-300 bg-white hover:bg-gray-200 hover:bg-opacity-50 hover:text-slate-900"
            >
              +
            </Button>
          </div>
          <Currency
            value={getPriceMatchColorandSize()}
            valueold={getPriceOldMatchColorandSize()}
          />
        </div>
        {/* Check nếu có isOutOfStock thì hiển thị số lượng sản phẩm còn  */}
        {isOutOfStock && (
          <div className="text-red-500">Còn {maxQuantity} sản phẩm</div>
        )}

        <div className="mt-1 text-sm text-gray-500">
          Giá tiền bảo hành cho {data.product.heading}:
          {data.warranty ? (
            <span>
              <Currency value={data.warranty} />
            </span>
          ) : (
            <span>
              <Currency value={0} />
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default CartItemDatabase;
