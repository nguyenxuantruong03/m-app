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
import useCart, { ProductUnion } from "@/hooks/client/use-cart";
import { ProductDetail } from "@/types/type";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartItemProps {
  data: ProductUnion;
  userId: string;
  setLoadingChange: Dispatch<SetStateAction<boolean>>;
  loadingChange: boolean;
}

type ProductWithQuantity = ProductUnion & { quantity: number };

// Logic này là một Type Guard trong TypeScript, được sử dụng để xác định kiểu của một đối tượng tại runtime.
// Trong đoạn code dưới, hàm isProductWithQuantity kiểm tra xem một đối tượng (item) có thuộc tính quantity hay không.
//  Nếu đối tượng có thuộc tính quantity, hàm sẽ trả về true và xác định rằng đối tượng đó là kiểu ProductWithQuantity.
// Ngược lại, nếu không có thuộc tính quantity, hàm sẽ trả về false.
const isProductWithQuantity = (
  item: ProductUnion
): item is ProductWithQuantity => {
  return "quantity" in item;
};

const CartItem: React.FC<CartItemProps> = ({
  data,
  userId,
  setLoadingChange,
  loadingChange,
}) => {
  const cart = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(data.quantity || 1);
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [quantityInventory, setQuantiyInventory] = useState(false);
  const [loadingLimitQuantity, setLoadingLimitQuantity] = useState(false);
  const selected = cart.selectedItems.includes(data.cartId);
  const warranty = cart.getSelectedItemWarranty(data.cartId);

  //GetPrice dựa vào size
  const getPriceMatchColorandSize = () => {
    const { price: priceSize, percentpromotion: percentpromotionSize } = getSizePrice(data, data.size);
    const { price: priceColor, percentpromotion: percentpromotionColor } = getColorPrice(data, data.color);
    return Math.ceil(Math.max(priceSize, priceColor));
  };

  //GetPrice dựa vào color
  const getPriceOldMatchColorandSize = () => {
    const sizeOldPrice = getSizeOldPrice(data, data.size);
    const colorOldPrice = getColorOldPrice(data, data.color);
    return Math.ceil(Math.max(sizeOldPrice, colorOldPrice));
  };

  //Quantity: Thêm hàm để lấy số lượng dựa trên giá cao nhất
  const getQuantityMatchColorandSize = () => {
    const { price: priceSize, percentpromotion: percentpromotionSize } = getSizePrice(data, data.size);
    const { price: priceColor, percentpromotion: percentpromotionColor } = getColorPrice(data, data.color);
    const highestPrice = Math.max(priceSize, priceColor);

    switch (highestPrice) {
      case data.productdetail.price5 *
        ((100 - data.productdetail.percentpromotion5) / 100):
        return data.productdetail.quantity5;
      case data.productdetail.price4 *
        ((100 - data.productdetail.percentpromotion4) / 100):
        return data.productdetail.quantity4;
      case data.productdetail.price3 *
        ((100 - data.productdetail.percentpromotion3) / 100):
        return data.productdetail.quantity3;
      case data.productdetail.price2 *
        ((100 - data.productdetail.percentpromotion2) / 100):
        return data.productdetail.quantity2;
      default:
        return data.productdetail.quantity1;
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
      cart.toggleSelectItem("", userId, data.cartId, ""); // Deselect the item
    }

    if (compareQuantityExistingAndAvailable) {
      cart.toggleSelectItem(" ", userId, "", data.cartId); // Update Zustand store
    }
  }, [data.size, data.color, data.cartId]); // Depend on size and color selections

  //Kiểm tra tất cả sản phẩm có === 0 không
  const productQuantityAll = [1, 2, 3, 4, 5].every(
    (i) => data.productdetail[`quantity${i}` as keyof ProductDetail] === 0
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
          await cart.updateQuantity(data.cartId, value, warranty, userId);
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
          await cart.updateQuantity(data.cartId, quantity + 1, warranty, userId); // Update the quantity in the cartdb
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
          await cart.updateQuantity(data.cartId, newQuantity, warranty, userId); // Update the quantity in the cartdb
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
      await cart.removeItem(data.cartId, userId);
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
    const route = getRouteBasedOnProductType(data.productType);
    // // -----------Log the values for debugging----------------
    // console.log('Product Type:', data.productType);
    // console.log('Route:', route);
    if (route) {
      // Construct the complete URL
      const href = `/${route}/${data.name}`;
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
            checked={cart.selectedItems.includes(data.cartId)}
            onChange={() => cart.toggleSelectItem(data.cartId, userId, "", "")}
            disabled={loadingChange || productQuantityAll || quantityInventory}
          />
        )}
      </div>
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center cursor-pointer"
          onClick={handleClick}
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-4 md:right-0 top-0">
          <IconButton
            onClick={onRemove}
            disabled={loadingChange}
            icon={<X size={15} />}
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6">
          <div className="flex justify-between">
            <div className="max-w-40">
              <p className="text-lg font-semibold text-black">{data.heading}</p>
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
              {data.productdetail.category?.name}
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
            {isEditingQuantity ? (
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
          Giá tiền bảo hành cho {data.heading}:
          {data.warranty ? (
            <span>
              <Currency value={data.warranty || 0} />
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

export default CartItem;
