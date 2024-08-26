"use client";
import { Product } from "@/types/type";
import Currency from "@/components/ui/currency";
import {
  Banknote,
  Shield,
  ShoppingBasket,
  ShoppingCart,
  Award,
  Tag,
  CreditCard,
  BadgePercent,
  Heart,
  Check,
} from "lucide-react";
import useCart from "@/hooks/client/use-cart";
import { MouseEventHandler, useEffect, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Infoproductcolor } from "@/components/(client)/color/color";
import Image from "next/image";
import useLike from "@/hooks/client/use-like";
import "./info-product.css";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Input } from "@/components/ui/input";
import useCartdb from "@/hooks/client/db/use-cart-db";
import {
  getColorOldPrice,
  getColorPrice,
  getSizeOldPrice,
  getSizePrice,
} from "../export-product-compare/size-color/match-color-size";
import cuid from 'cuid';

interface InfoProductProps {
  data: Product;
}
const InfoProduct: React.FC<InfoProductProps> = ({ data }) => {
  const cart = useCart();
  const cartdb = useCartdb();
  const router = useRouter();
  const user = useCurrentUser();
  const like = useLike();
  const { addItem, removeItem, items } = useLike();
  const [quantity, setQuantity] = useState(1);
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantityInventory, setQuantiyInventory] = useState(false);
  const [errorSize, setErrorSize] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [errorQuantityInventory, setErrorsetQuantityInventory] = useState("");
  const [loadingLimitQuantity, setLoadingLimitQuantity] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sizes = [
    data.productdetail.size1,
    data.productdetail.size2,
    data.productdetail.size3,
    data.productdetail.size4,
    data.productdetail.size5,
  ];
  const colors = [
    data.productdetail.color1,
    data.productdetail.color2,
    data.productdetail.color3,
    data.productdetail.color4,
    data.productdetail.color5,
  ];

  // Filter out undefined sizes and colors
  const availableSizes = sizes.filter((size) => size);
  const availableColors = colors.filter((color) => color);

  //Quantity: Thêm hàm để lấy số lượng dựa trên giá cao nhất
  const getQuantityMatchColorandSize = () => {
    const sizePrice = getSizePrice(data, selectedSize);
    const colorPrice = getColorPrice(data, selectedColor);
    const highestPrice = Math.max(sizePrice, colorPrice);

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

  // Update button disabled status based on quantity
  useEffect(() => {
    const quantity = getQuantityMatchColorandSize();
    setQuantiyInventory(quantity === 0);
  }, [selectedSize, selectedColor]); // Depend on size and color selections

  //Sau đó check dựa trên 2 select đã chọn xem size và color đã chọn cái này giá cao thì lấy
  const getPriceMatchColorandSize = () => {
    const sizePrice = getSizePrice(data, selectedSize);
    const colorPrice = getColorPrice(data, selectedColor);
    return Math.ceil(Math.max(sizePrice, colorPrice));
  };

  //Dụa vào select lấy ra ra chưa sale
  const getPriceOldMatchColorandSize = () => {
    const sizeOldPrice = getSizeOldPrice(data, selectedSize);
    const colorOldPrice = getColorOldPrice(data, selectedColor);
    return Math.ceil(Math.max(sizeOldPrice, colorOldPrice));
  };

  //Handle add like và sử dụng debounce sau 1 giay mới được add được thêm vào giỏ hàng ngăn chặn hành vi spam
  const debouncedHandleIconClick = debounce((productId: string) => {
    const isLiked = items.some((item) => item.id === productId);

    if (isLiked) {
      removeItem(productId);
    } else {
      addItem(data, user?.id);
    }
  }, 1000);

  const handleIconClick = (productId: string) => {
    debouncedHandleIconClick(productId);
  };

  const onAddtoCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (user?.role !== "GUEST" && user?.id) {
      //CheckError
      if (!selectedSize && !selectedColor) {
        setErrorSize("Vui lòng chọn kích thước!");
        setErrorColor("Vui lòng chọn màu!");
        return;
      } else if (!selectedSize) {
        setErrorSize("Vui lòng chọn kích thước!");
        return;
      } else if (!selectedColor) {
        setErrorColor("Vui lòng chọn màu!");
        return;
      } else if (quantityInventory) {
        setErrorsetQuantityInventory("Sản phẩm đã hết hàng trong kho!");
        return;
      }
      // Ngặn chặn sự kiện Click liên tục
      event.stopPropagation();
      //GetraWarantity đã chọn
      const warranty = cartdb.getSelectedItemWarranty(data.id);

      const productWithQuantity = {
        ...data,
        quantity,
      };

      //Tìm Kiếm trong cardb lấy ra data.id === item.id bởi vì data.id tôi truyền vào là product.id.  Và phải cần giống color và size nữa thì mới tìm ra
      const existingCartItem = cartdb.items.find(
        (item) =>
          item.id === data.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );
      if (existingCartItem) {
        //Nếu sản phẩm hiện tại đã có thì chỉ việc update
        cartdb.updateQuantity(
          existingCartItem.id,
          existingCartItem.quantity + quantity,
          warranty,
          user?.id || ""
        );
        toast.success("Sản phẩm đã được cập nhật số lượng trong giỏ hàng.");
      } else {
        //Thêm sản phẩm
        cartdb.addItem(
          productWithQuantity,
          quantity,
          warranty,
          user?.id || "",
          selectedSize,
          selectedColor
        ); // Pass the user here
      }
    } else {
      //CheckError
      if (!selectedSize && !selectedColor) {
        setErrorSize("Vui lòng chọn kích thước!");
        setErrorColor("Vui lòng chọn màu!");
        return;
      } else if (!selectedSize) {
        setErrorSize("Vui lòng chọn kích thước!");
        return;
      } else if (!selectedColor) {
        setErrorColor("Vui lòng chọn màu!");
        return;
      } else if (quantityInventory) {
        setErrorsetQuantityInventory("Sản phẩm đã hết hàng trong kho!");
        return;
      }
      //Tạo ra CUID để có thể những sản phẩm khác nhau sẽ ko bị checked chung
      const cartId = cuid();
      //GetraWarantity đã chọn
      const warrantySelect = cart.getSelectedItemWarranty(data.id);
      const warranty = warrantySelect ?? "";
      const size = selectedSize
      const color = selectedColor
      // Ngặn chặn sự kiện Click liên tục
      event.stopPropagation();
      const productWithQuantity = {
        ...data,
        quantity,
        size,
        color,
        warranty,
        cartId,
      };

      //Tìm Kiếm trong cardb lấy ra data.id === item.id bởi vì data.id tôi truyền vào là product.id. Và phải cần giống color và size nữa thì mới tìm ra
      const existingCartItem = cart.items.find(
        (item) =>
          item.id === data.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingCartItem) {
        //Nếu sản phẩm hiện tại đã có thì chỉ việc update
        const existingQuantity = existingCartItem.quantity ?? 0;
        cart.updateQuantity(
          existingCartItem.cartId,
          existingQuantity + quantity,
          warranty,
          user?.id || ""
        );
        toast.success("Sản phẩm đã được cập nhật số lượng trong giỏ hàng.");
      } else {
        //Thêm sản phẩm
        cart.addItem(
          productWithQuantity || "",
          quantity,
          warranty,
          user?.id || "",
          selectedSize,
          selectedColor
        );
      }
    }
  };

  const onAddtoPushCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    setLoading(true);
    if (user?.role !== "GUEST" && user?.id) {
      //CheckError
      if (!selectedSize && !selectedColor) {
        setErrorSize("Vui lòng chọn kích thước!");
        setErrorColor("Vui lòng chọn màu!");
        return;
      } else if (!selectedSize) {
        setErrorSize("Vui lòng chọn kích thước!");
        return;
      } else if (!selectedColor) {
        setErrorColor("Vui lòng chọn màu!");
        return;
      } else if (quantityInventory) {
        setErrorsetQuantityInventory("Sản phẩm đã hết hàng trong kho!");
        return;
      }
      // Ngặn chặn sự kiện Click liên tục
      event.stopPropagation();
      //GetraWarantity đã chọn
      const warranty = cartdb.getSelectedItemWarranty(data.id);
      const productWithQuantity = {
        ...data,
        quantity,
      };

      //Tìm Kiếm trong cardb lấy ra data.id === item.id bởi vì data.id tôi truyền vào là product.id. Và phải cần giống color và size nữa thì mới tìm ra
      const existingCartItem = cartdb.items.find(
        (item) =>
          item.id === data.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingCartItem) {
        //Nếu sản phẩm hiện tại đã có thì chỉ việc update
        cartdb.updateQuantity(
          existingCartItem.id,
          existingCartItem.quantity + quantity,
          warranty,
          user?.id || ""
        );
        toast.success("Sản phẩm đã được cập nhật số lượng trong giỏ hàng.");
      } else {
        //Thêm sản phẩm
        cartdb.addItem(
          productWithQuantity,
          quantity,
          warranty,
          user?.id || "",
          selectedSize,
          selectedColor
        ); // Pass the user here
      }
      router.push("/cart");
    } else {
      //CheckError
      if (!selectedSize && !selectedColor) {
        setErrorSize("Vui lòng chọn kích thước!");
        setErrorColor("Vui lòng chọn màu!");
        return;
      } else if (!selectedSize) {
        setErrorSize("Vui lòng chọn kích thước!");
        return;
      } else if (!selectedColor) {
        setErrorColor("Vui lòng chọn màu!");
        return;
      } else if (quantityInventory) {
        setErrorsetQuantityInventory("Sản phẩm đã hết hàng trong kho!");
        return;
      }
       //Tạo ra CUID để có thể những sản phẩm khác nhau sẽ ko bị checked chung
       const cartId = cuid();
       //GetraWarantity đã chọn
       const warrantySelect = cart.getSelectedItemWarranty(data.id);
       const warranty = warrantySelect ?? "";
       const size = selectedSize
       const color = selectedColor
       // Ngặn chặn sự kiện Click liên tục
       event.stopPropagation();
       const productWithQuantity = {
         ...data,
         quantity,
         size,
         color,
         warranty,
         cartId
       };
      //Tìm Kiếm trong cart lấy ra data.id === item.id bởi vì data.id tôi truyền vào là product.id. Và phải cần giống color và size nữa thì mới tìm ra
      const existingCartItem = cart.items.find(
        (item) =>
          item.id === data.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingCartItem) {
        //Nếu sản phẩm hiện tại đã có thì chỉ việc update
        const existingQuantity = existingCartItem.quantity ?? 0;
        cart.updateQuantity(
          existingCartItem.cartId,
          existingQuantity + quantity,
          warranty,
          user?.id || ""
        );
        toast.success("Sản phẩm đã được cập nhật số lượng trong giỏ hàng.");
      } else {
        //Thêm sản phẩm
        cart.addItem(
          productWithQuantity,
          quantity,
          warranty,
          user?.id || "",
          selectedSize,
          selectedColor
        ); // Pass the userId here
      }
      router.push("/cart");
    }
  };

  //Tìm kiếm quantity của sản phẩm
  const maxQuantity = getQuantityMatchColorandSize();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingLimitQuantity(false);
    const value = parseInt(event.target.value, 10);

    if (value > 0 && value <= maxQuantity) {
      if (value <= 99) {
        setQuantity(value);
      } else {
        toast.error("Bạn chỉ có thể chọn tối đa 99 sản phẩm!");
      }
    } else if (value > maxQuantity) {
      toast.error(`Số lượng còn lại ${maxQuantity} sản phẩm!`);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity >= maxQuantity) {
        toast.error(`Số lượng còn lại ${maxQuantity} sản phẩm!`);
        setLoadingLimitQuantity(true);
        return prevQuantity;
      }

      if (prevQuantity >= 99) {
        toast.error("Bạn chỉ có thể chọn tối đa 99 sản phẩm!");
        return prevQuantity;
      }

      return prevQuantity + 1;
    });
  };

  const decrementQuantity = () => {
    setLoadingLimitQuantity(false);
    setQuantity((prevQuantity) => {
      if (prevQuantity <= 1) {
        return 1; // Ensure quantity does not go below 1
      }
      return prevQuantity - 1;
    });
  };

  const handleMouseDown = (action: () => void) => {
    intervalRef.current = setInterval(() => {
      action();
    }, 100); // Adjust the interval time as needed (in milliseconds)
  };

  const handleMouseUp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleClick = (action: () => void) => {
    // Increment or decrement quantity on single click
    action();
  };

  const quantities = [
    data.productdetail.quantity1,
    data.productdetail.quantity2,
    data.productdetail.quantity3,
    data.productdetail.quantity4,
    data.productdetail.quantity5,
  ];

  const totalQuantity = quantities.reduce((total, qty) => total + qty, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-500">{data.heading} </h1>
      <hr className="my-4" />
      {/* Description */}
      <div className="my-5">{data?.description}</div>
      {/* Size */}
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold"> Kích cỡ: </h3>
          {availableSizes.map((size, index) => (
            <div
              key={index}
              className="inline-flex h-8 w-16 items-center justify-center gap-x-1 cursor-pointer"
              onClick={() => {
                setSelectedSize(
                  selectedSize === size?.value ? "" : size?.value
                );
                setErrorSize("");
                setQuantity(1);
                setLoadingLimitQuantity(false);
              }}
            >
              <button
                className={`relative ${
                  selectedSize === size?.value
                    ? "border border-red-500 h-8 w-16 rounded-md overflow-hidden"
                    : ""
                }`}
              >
                {size?.value}
                {selectedSize === size?.value && (
                  <span
                    className="absolute bottom-1.5 right-2.5 w-5 h-3 bg-red-500 flex items-center justify-center rounded-tl-md"
                    style={{ transform: "translate(50%, 50%)" }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="text-red-600 text-sm">{errorSize}</div>
        {/* Color */}
        <div className="flex items-center gap-x-1 cursor-pointer">
          <h3 className="font-semibold">Màu: </h3>
          {availableColors.map((color, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedColor(
                  selectedColor === color?.value ? "" : color?.value
                );
                setErrorColor("");
                setQuantity(1);
                setLoadingLimitQuantity(false);
              }}
              className={`inline-flex items-center justify-center h-8 w-16 relative overflow-hidden ${
                selectedColor === color?.value
                  ? " border border-red-500 rounded-md"
                  : ""
              }`}
            >
              <div
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: color?.value }}
              />
              {selectedColor === color?.value && (
                <span
                  className="absolute bottom-1.5 right-2.5 w-5 h-3 bg-red-500 flex items-center justify-center rounded-tl-md"
                  style={{ transform: "translate(50%, 50%)" }}
                >
                  <Check className="w-3 h-3 text-white" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-red-600 text-sm">{errorColor}</div>

      {/* "+ or -" Quantity */}
      <div className="my-6 flex items-center gap-x-3">
        {/* Quantity increment and decrement buttons */}
        <h3 className="font-semibold"> Số lượng: </h3>
        <Button
          disabled={loading || quantityInventory}
          variant="outline"
          onMouseDown={() => handleMouseDown(decrementQuantity)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Handle mouse leaving the button
          onClick={() => handleClick(decrementQuantity)} // Single click to decrement
          className="w-10 h-10 flex justify-center items-center border rounded-md border-gray-300 bg-white hover:bg-gray-200 hover:bg-opacity-50 hover:text-slate-900"
        >
          -
        </Button>
        {isEditingQuantity ? (
          <Input
            disabled={loading || quantityInventory}
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
          disabled={loading || loadingLimitQuantity || quantityInventory}
          variant="outline"
          onMouseDown={() => handleMouseDown(incrementQuantity)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Handle mouse leaving the button
          onClick={() => handleClick(incrementQuantity)} // Single click to decrement
          className="w-10 h-10 flex justify-center items-center border rounded-md border-gray-300 bg-white hover:bg-gray-200 hover:bg-opacity-50 hover:text-slate-900"
        >
          +
        </Button>
      </div>

      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold">Số lượng trong kho: </h3>
        {getQuantityMatchColorandSize()}
      </div>

      <div className="flex items-center gap-x-4 mt-6">
        <h3 className="font-semibold">Tổng số lượng sản phẩm: </h3>
        {totalQuantity} sản phẩm
      </div>

      <div className="flex items-center gap-x-4 mt-6">
        <h3 className="font-semibold">Đã bán:</h3>
        {data.sold || 0} sản phẩm
      </div>

      <div className="mt-8 flex items-center gap-x-4">
        <h3 className="font-semibold"> Tổng giá: </h3>
        <p className="text-lg text-gray-900">
          <Currency
            value={getPriceMatchColorandSize()}
            valueold={getPriceOldMatchColorandSize()}
          />
        </p>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        {/* Check xem sản phẩm có hết hàng nếu hết disable */}
        {quantityInventory ? (
          <Button
            disabled={quantityInventory || loading}
            className="gap-x-2 hover:text-yellow-500 bg-red-600 hover:bg-red-500"
          >
            <ShoppingBasket />
          </Button>
        ) : (
          <Button
            onClick={onAddtoCart}
            disabled={quantityInventory || loading}
            className="gap-x-2 hover:text-yellow-500 bg-gray-300 hover:bg-gray-200"
          >
            <ShoppingBasket />
          </Button>
        )}

        <Button
          disabled={loading}
          className="gap-x-2 bg-gray-300 text-gray-600 hover:bg-gray-200 hover:text-red-500"
        >
          <Heart
            className={` ${
              like.items.some((item) => item.id === data.id) ? "active" : ""
            }`}
            onClick={() => handleIconClick(data.id)}
          />
        </Button>
        {/* Check xem quantity đó còn hàng ko */}
        {quantityInventory ? (
          <Button
            disabled={quantityInventory || loading}
            className="w-full bg-red-600 hover:bg-red-500"
          >
            <div className="flex text-lg items-center gap-x-2 pl-[2.25] md:w-full justify-center">
              Hết hàng
              <ShoppingCart />
            </div>
          </Button>
        ) : (
          <Button
            disabled={quantityInventory || loading}
            onClick={onAddtoPushCart}
            className="w-full bg-gray-300 hover:bg-gray-200"
          >
            <div className="flex text-lg items-center gap-x-2 pl-[2.25] md:w-full justify-center">
              Mua ngay
              <ShoppingCart />
            </div>
          </Button>
        )}
      </div>
      {/* Check nếu như hết hàng mà người dùng vẫn click */}
      <div className="text-red-500 text-sm">{errorQuantityInventory}</div>
      {/* Ưa đãi thêm */}
      <div className="w-full h-full shadow-lg mt-9 rounded-lg space-y-1 overflow-hidden ">
        <div className="h-10 bg-gray-300 flex items-center ">
          <h1 className="ml-3 font-bold "> Ưa đãi thêm </h1>
        </div>
        <div className="flex items-center">
          <BadgePercent className={Infoproductcolor.textcolor} />
          <h1 className="text-sm"> Chiết khấu cao mua hàng với giá sỉ</h1>
        </div>

        <div className="flex items-center">
          <Banknote className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm ">
            Ưa đãi lớn khi thanh toán trên 2 triệu
          </h1>
        </div>

        <div className="flex items-center">
          <Tag className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm ">Tặng mã giảm giá ngẫu nhiên</h1>
        </div>

        <div className="flex items-center">
          <CreditCard className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm ">
            Có thể thành toán bằng tiền mặt hoặc visa
          </h1>
        </div>

        <div className="flex items-center">
          <Award className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm ">
            Ưa đãi cực nhiều khi mua hàng số lượng lớn
          </h1>
        </div>

        <div className="flex items-center">
          <Shield className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm ">
            Nếu sản phẩm có lỗi hoặc hư bảo hành 1 năm tùy món hàng.
          </h1>
        </div>
      </div>
      <div className="hidden md:flex md:justify-center xl:block w-full h-[125px] md:h-full mt-4 rounded-md overflow-hidden">
        <Image
          alt="Error"
          src="/images/baohanh.png"
          width="600"
          height="205"
          className="object-fill rounded-md"
        />
      </div>
    </div>
  );
};

export default InfoProduct;
