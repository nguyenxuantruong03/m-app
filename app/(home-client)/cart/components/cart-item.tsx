"use client";

import Currency from "@/components/ui/currency";
import Currencyonevalue from "@/components/ui/currencyonevalue";
import IconButton from "@/components/ui/icon-button";
import useCart, { ProductUnion } from "@/hooks/client/use-cart";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CartItemProps {
  data: ProductUnion;
}

type ProductWithQuantity = ProductUnion & { quantity: number };

const isProductWithQuantity = (
  item: ProductUnion
): item is ProductWithQuantity => {
  return "quantity" in item;
};

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(
    isProductWithQuantity(data) ? data.quantity : 1
  );
  const selected = cart.selectedItems.includes(data.id);

  const incrementQuantity = () => {
    if (isProductWithQuantity(data)) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      cart.updateQuantity(data.id, newQuantity); // Update the quantity in the cart
    }
  };

  const decrementQuantity = () => {
    if (isProductWithQuantity(data) && quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      cart.updateQuantity(data.id, newQuantity);
    }
  };
  
  const onRemove = () => {
    cart.removeItem(data.id);
  };
  const percentPrice =
    data.productdetail.price1 * ((100 - data.productdetail.percentpromotion1) / 100) * quantity;
  const totalPrice = data.productdetail.price1 * quantity;


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
      console.error('Invalid route:', route);
    }
  };
  return (
    <li className={`flex items-center py-6 border-b ${selected ? "selected" : ""}`}>
      <div className="px-2 md:px-5 my-auto">
        <input
          className="w-4 h-4"
          type="checkbox"
          checked={cart.selectedItems.includes(data.id)}
          onChange={() => cart.toggleSelectItem(data.id)}
        />
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
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.heading}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.productdetail.color1.name}</p>
            <p className="text-gray-500 ml-4 border-1 border-gray-200">
              {data.productdetail.size1.name}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
            {/* Quantity increment and decrement buttons */}
            <button
              onClick={decrementQuantity}
              className="px-2 py-1 border rounded-md border-gray-300"
            >
              -
            </button>
            <span className="text-xl mx-1">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-2 py-1 border rounded-md border-gray-300"
            >
              +
            </button>
          </div>
          <Currency value={percentPrice} valueold={totalPrice} />
        </div>
        <div className="mt-1 text-sm text-gray-500">
          Giá tiền bảo hành cho {data.heading}:
          {data.id in cart.selectedWarranties ? (
            <span>
              <Currencyonevalue value={cart.selectedWarranties[data.id]} />
            </span>
          ) : (
            <span>
              <Currencyonevalue value={0} />
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
