"use client";
import { CartItemType, FavoriteProduct, Product } from "@/types/type";
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
  Zap,
  Clock5,
} from "lucide-react";
import useCart from "@/hooks/client/use-cart";
import { MouseEventHandler, useEffect, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Infoproductcolor } from "@/components/(client)/color/color";
import Image from "next/image";
import useFavorite from "@/hooks/client/db/use-favorite";
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
import cuid from "cuid";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import getCart from "@/actions/client/cart";
import { useTranslations } from "next-intl";

interface InfoProductProps {
  data: Product;
}
const InfoProduct: React.FC<InfoProductProps> = ({ data }) => {
  const cart = useCart();
  const cartdb = useCartdb();
  const router = useRouter();
  const user = useCurrentUser();
  const favorite = useFavorite();
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
  const [loadingRetchdataFavorite, setLoadingFetchDataFavorite] =
    useState(false);
  const t = useTranslations()

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user?.role !== "GUEST" && user?.id) {
      const fetchData = async () => {
        try {
          setLoadingFetchDataFavorite(true);
          await favorite.fetchFavoriteItems(user?.id || "");
        } catch (error) {
          toast.error(t("toastError.somethingWentWrong"));
        } finally {
          setLoadingFetchDataFavorite(false);
        }
      };
      fetchData();
    }
  }, []);

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
    const { price: priceSize } = getSizePrice(data, selectedSize);
    const { price: priceColor } = getColorPrice(data, selectedColor);
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

  // Update button disabled status based on quantity
  useEffect(() => {
    const quantity = getQuantityMatchColorandSize();
    setQuantiyInventory(quantity === 0);
  }, [selectedSize, selectedColor]); // Depend on size and color selections

  //Sau đó check dựa trên 2 select đã chọn xem size và color đã chọn cái này giá cao thì lấy
  const getPriceMatchColorandSize = () => {
    const { price: priceSize, percentpromotion: percentpromotionSize } =
      getSizePrice(data, selectedSize);
    const { price: priceColor, percentpromotion: percentpromotionColor } =
      getColorPrice(data, selectedColor);
    return Math.ceil(Math.max(priceSize, priceColor));
  };

  //Dụa vào select lấy ra ra chưa sale
  const getPriceOldMatchColorandSize = () => {
    const sizeOldPrice = getSizeOldPrice(data, selectedSize);
    const colorOldPrice = getColorOldPrice(data, selectedColor);
    return Math.ceil(Math.max(sizeOldPrice, colorOldPrice));
  };

  //-------------------Favorite Product-----------------------
  //Handle add favorite và sử dụng debounce sau 1 giay mới được add được thêm vào giỏ hàng ngăn chặn hành vi spam
  const debouncedHandleIconClick = debounce(
    async (
      productId: string,
      productName: string,
      selectedSize: string | null,
      selectedColor: string | null
    ) => {
      //Check favorite coi tất cả giá trị so sánh có tìm ra được được favoriteProduct không nếu có thì lấy id của favorite.
      const favoriteData = favorite.items.find(
        (item) =>
          item.productName === productName &&
          item.productId === productId &&
          (selectedSize
            ? item.selectedSize === selectedSize
            : item.selectedSize === data.productdetail.size1.value) &&
          (selectedColor
            ? item.selectedColor === selectedColor
            : item.selectedColor === data.productdetail.color1.value)
      );
      try {
        setLoadingFetchDataFavorite(true);
        setErrorSize("");
        setErrorColor("");
        if (favoriteData && favoriteData.id) {
          //Khi remove đảm bảo phải có Selectedsize và Selectedcolor nếu không thì ko có select nào hết auto chọn cái đầu tiên
          if (!selectedSize && selectedColor) {
            setErrorSize(t("product.selectSizeToDelete"));
            return;
          }

          if (selectedSize && !selectedColor) {
            setErrorColor(t("product.selectColorToDelete"));
            return;
          }
          //remove favoriteProduct
          await favorite.removeItem(favoriteData.id, user?.id || "");
          toast.success(t("product.productRemovedFromWishlist"));
        } else {
          //Khi add đảm bảo phải có Selectedsize và Selectedcolor nếu không thì ko có select nào hết auto chọn cái đầu tiên
          if (!selectedSize && selectedColor) {
            setErrorSize(t("product.selectSizeToSave"));
            return;
          }

          if (selectedSize && !selectedColor) {
            setErrorColor(t("product.selectColorToSave"));
            return;
          }

          //CUID: tạo ra một 1 id theo CUID tránh checked trùng với nhau
          const idFavorite = cuid();
          const favoriteProduct: FavoriteProduct = {
            id: idFavorite,
            productId: productId,
            productName: data.name,
            product: data,
            userId: user?.id || "",
            selectedSize: selectedSize || data.productdetail.size1.value,
            selectedColor: selectedColor || data.productdetail.color1.value,
          };

          if(!user){
            toast.error(t("action.loginToAddToWishlist"))
          }

          //add favoriteProduct
          await favorite.addItem(favoriteProduct);
          toast.success(t("product.productToWishlist"))
        }
      } catch (error) {
        toast.error(
          favoriteData
            ? t("product.cannotRemoveSavedProduct")
            : t("product.cannotSaveProduct")
        );
      } finally {
        setLoadingFetchDataFavorite(false);
      }
    },
    1000
  );

  const handleIconClick = (
    productId: string,
    productName: string,
    selectedSize: string | null,
    selectedColor: string | null
  ) => {
    debouncedHandleIconClick(
      productId,
      productName,
      selectedSize,
      selectedColor
    );
  };

  //-------------------Add Cart-----------------------
  const onAddtoCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    if (user?.role !== "GUEST" && user?.id) {
      // Check errors
      if (!selectedSize && !selectedColor) {
        setErrorSize(t("product.selectSize"));
        setErrorColor(t("product.selectColor"));
        return;
      } else if (!selectedSize) {
        setErrorSize(t("product.selectSize"));
        return;
      } else if (!selectedColor) {
        setErrorColor(t("product.selectColor"));
        return;
      } else if (quantityInventory) {
        setErrorsetQuantityInventory(t("product.insufficientStock"));
        return;
      }
      // Stop event propagation to prevent multiple clicks
      event.stopPropagation();

      // Use toast.promise to handle the async operation
      await toast.promise(
        (async () => {
          const cartItemData = await getCart({
            userId: user?.id || "",
          });

          const matchingItem = cartItemData.find(
            (item: CartItemType) =>
              item.product.name === data.name &&
              item.product.id === data.id &&
              item.size === selectedSize &&
              item.color === selectedColor
          );

          const matchingQuantity = matchingItem ? matchingItem.quantity : 0;

          const compareQuantityExistingAndAvailable =
            matchingQuantity >= maxQuantity && maxQuantity > 0;

          if (compareQuantityExistingAndAvailable) {
            throw new Error(t("product.insufficientStock"));
          }

          // Get selected warranty
          const warranty = cartdb.getSelectedItemWarranty(data.id);

          const productWithQuantity = {
            ...data,
            quantity,
          };

          // Find the item in the cartdb
          const existingCartItem = cartdb.items.find(
            (item) =>
              item.product.name === data.name &&
              item.product.id === data.id &&
              item.size === selectedSize &&
              item.color === selectedColor
          );

          try {
            setLoading(true);
            if (existingCartItem) {
              // If the product already exists in the cart, update the quantity
              cartdb.updateQuantity(
                existingCartItem.id,
                existingCartItem.quantity + quantity,
                warranty,
                user?.id || "",
              );
            } else {
              // Add the product to the cart
              cartdb.addItem(
                productWithQuantity,
                quantity,
                warranty,
                user?.id || "",
                selectedSize,
                selectedColor
              );
            }
          } catch (error) {
            toast.error(t("product.addToCartError"));
          } finally {
            setLoading(false);
          }

          return existingCartItem
            ? t("product.productQuantityUpdated")
            : t("product.productAddedToCart");
        })(),
        {
          loading: t("loading.loading"),
          success: (response) => response,
          error: (error) => error.message || t("cart.productRemoved"),
        }
      );
    } else {
      // Handle the case for "GUEST" user
      // Check errors
      if (!selectedSize && !selectedColor) {
        setErrorSize(t("product.selectSize"));
        setErrorColor(t("product.selectColor"));
        return;
      } else if (!selectedSize) {
        setErrorSize(t("product.selectSize"));
        return;
      } else if (!selectedColor) {
        setErrorColor(t("product.selectColor"));
        return;
      } else if (quantityInventory) {
        setErrorsetQuantityInventory(t("product.insufficientStock"));
        return;
      }

      // Generate a unique cartId for "GUEST" users
      const cartId = cuid();
      // Get selected warranty
      const warrantySelect = cart.getSelectedItemWarranty(data.id);
      const warranty = warrantySelect ?? "";
      const size = selectedSize;
      const color = selectedColor;

      // Stop event propagation to prevent multiple clicks
      event.stopPropagation();

      const productWithQuantity = {
        ...data,
        quantity,
        size,
        color,
        warranty,
        cartId,
      };

      // Find the item in the cartdb
      const existingCartItem = cart.items.find(
        (item) =>
          item.id === data.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      try {
        setLoading(true);
        if (existingCartItem) {
          // If the product already exists in the cart, update the quantity
          const existingQuantity = existingCartItem.quantity ?? 0;
          await cart.updateQuantity(
            existingCartItem.cartId,
            existingQuantity + quantity,
            warranty,
            user?.id || ""
          );
          toast.success(t("product.productQuantityUpdated"));
        } else {
          // Add the product to the cart
          await cart.addItem(
            productWithQuantity || "",
            quantity,
            warranty,
            user?.id || "",
            selectedSize,
            selectedColor,
          );
        }
      } catch (error) {
        toast.error(t("product.addToCartError"));
      } finally {
        setLoading(false);
      }
    }
  };

  const onAddtoPushCart: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    setLoading(true);

    if (user?.role !== "GUEST" && user?.id) {
      // Check errors
      if (!selectedSize && !selectedColor) {
        setErrorSize(t("product.selectSize"));
        setErrorColor(t("product.selectColor"));
        return;
      } else if (!selectedSize) {
        setErrorSize(t("product.selectSize"));
        return;
      } else if (!selectedColor) {
        setErrorColor(t("product.selectColor"));
        return;
      } else if (quantityInventory) {
        setErrorsetQuantityInventory(t("product.insufficientStock"));
        return;
      }

      // Ngặn chặn sự kiện Click liên tục
      event.stopPropagation();

      // Use toast.promise to handle the async operation
      await toast.promise(
        (async () => {
          // Fetch cart data using getCart
          const cartItemData = await getCart({
            userId: user?.id || "",
          });

          const matchingItem = cartItemData.find(
            (item: CartItemType) =>
              item.product.name === data.name &&
              item.product.id === data.id &&
              item.size === selectedSize &&
              item.color === selectedColor
          );

          const matchingQuantity = matchingItem ? matchingItem.quantity : 0;
          const compareQuantityExistingAndAvailable =
            matchingQuantity >= maxQuantity && maxQuantity > 0;

          if (compareQuantityExistingAndAvailable) {
            throw new Error(t("product.insufficientStock"));
          }

          // Get selected warranty
          const warranty = cartdb.getSelectedItemWarranty(data.id);

          const productWithQuantity = {
            ...data,
            quantity,
          };

          // Find existing item in the cartdb
          const existingCartItem = cartdb.items.find(
            (item) =>
              item.product.name === data.name &&
              item.product.id === data.id &&
              item.size === selectedSize &&
              item.color === selectedColor
          );

          try {
            setLoading(true);
            if (existingCartItem) {
              // If the item exists, update the quantity
              cartdb.updateQuantity(
                existingCartItem.id,
                existingCartItem.quantity + quantity,
                warranty,
                user?.id || "",
              );
            } else {
              // If the item doesn't exist, add to the cart
              cartdb.addItem(
                productWithQuantity,
                quantity,
                warranty,
                user?.id || "",
                selectedSize,
                selectedColor
              );
            }
          } catch (error) {
            toast.error(t("product.addToCartError"));
          } finally {
            setLoading(false);
            router.push("/cart");
          }

          return existingCartItem
            ? t("product.productQuantityUpdated")
            : t("product.productAddedToCart");
        })(),
        {
          loading: t("loading.loading"),
          success: (response) => response,
          error: (error) => error.message || t("cart.productRemoved"),
        }
      );
    } else {
      // Handle the case for "GUEST" user
      // Check errors
      if (!selectedSize && !selectedColor) {
        setErrorSize(t("product.selectSize"));
        setErrorColor(t("product.selectColor"));
        return;
      } else if (!selectedSize) {
        setErrorSize(t("product.selectSize"));
        return;
      } else if (!selectedColor) {
        setErrorColor(t("product.selectColor"));
        return;
      } else if (quantityInventory) {
        setErrorsetQuantityInventory(t("product.insufficientStock"));
        return;
      }

      // Generate a unique cartId for "GUEST" users
      const cartId = cuid();
      const warrantySelect = cart.getSelectedItemWarranty(data.id);
      const warranty = warrantySelect ?? "";
      const size = selectedSize;
      const color = selectedColor;

      // Stop event propagation to prevent multiple clicks
      event.stopPropagation();

      const productWithQuantity = {
        ...data,
        quantity,
        size,
        color,
        warranty,
        cartId,
      };

      // Find the item in the cartdb
      const existingCartItem = cart.items.find(
        (item) =>
          item.id === data.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingCartItem) {
        // If the item exists, update the quantity
        const existingQuantity = existingCartItem.quantity ?? 0;
        cart.updateQuantity(
          existingCartItem.cartId,
          existingQuantity + quantity,
          warranty,
          user?.id || ""
        );
        toast.success(t("product.productQuantityUpdated"));
      } else {
        // If the item doesn't exist, add it to the cart
        cart.addItem(
          productWithQuantity,
          quantity,
          warranty,
          user?.id || "",
          selectedSize,
          selectedColor,
        );
        toast.success(t("cart.productAdded"))
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
        toast.error(t("product.maxProduct"));
      }
    } else if (value > maxQuantity) {
      toast.error(t("product.remainingProduct", {maxQuantity: maxQuantity}));
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity >= maxQuantity) {
        toast.error(t("product.remainingProduct", {maxQuantity: maxQuantity}));
        setLoadingLimitQuantity(true);
        return prevQuantity;
      }

      if (prevQuantity >= 99) {
        toast.error(t("product.maxProduct"));
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

  const now = new Date();
  const timeSaleEnd = new Date(data.timeSaleEnd!);
  const timeSaleStart = new Date(data.timeSaleStart!);

  const isValidSalePeriod =
    data.isSale && timeSaleEnd > now && timeSaleStart <= now;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-500 dark:text-slate-300">
        {data.heading}{" "}
      </h1>
      <hr className="my-4" />
      {isValidSalePeriod ? (
        <div className="relative w-full h-10">
          <Image
            src="/images/banner-sale.jpg"
            className="object-cover max-w-3xl w-full h-full"
            fill
            alt="404"
          />
          <div className="absolute inset-0 flex items-center justify-between px-1.5 py-2">
            <div className="flex items-center">
              <span className="hidden xl:flex items-center text-xl font-black text-white mr-1">
                F
                <span>
                  <Zap fill="#fff" className="w-7 h-7" />
                </span>
                ash
              </span>
              <span className="text-xl text-white font-bold  ml-1">Sale:</span>
            </div>
            <div className="flex items-center space-x-2 bg-transparent xl:bg-black xl:bg-opacity-50 px-0 xl:px-2 py-1 rounded-lg">
              <div className="hidden xl:flex items-center space-x-1">
                <Clock5 className="w-5 h-5 text-white" />
                <span className="uppercase text-white">
                  {t("product.countdownEnd")}:
                </span>
              </div>
              <FlipClockCountdown
                to={new Date(data.timeSaleEnd!)}
                renderMap={[true, true, true, true]} // Hiển thị giờ, phút, giây nhưng không hiển thị ngày
                showLabels={false}
                digitBlockStyle={{
                  width: 20,
                  height: 20,
                  fontSize: 14,
                  color: "white",
                  background: "black",
                }}
                separatorStyle={{ color: "white", size: "2px" }}
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* Description */}
      <div className="my-5 text-slate-900 dark:text-slate-200">
        {data?.description}
      </div>
      {/* Size */}
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-200">
            {t("product.size")}:
          </h3>
          {availableSizes.map((size, index) => (
            <> 
            {
              size.value && (
            <div
              key={index}
              className="inline-flex h-8 w-16 items-center justify-center gap-x-1 cursor-pointer"
              onClick={() => {
                setSelectedSize(
                  selectedSize === size?.value ? "" : size?.value
                );
                setLoading(false);
                setErrorSize("");
                setQuantity(1);
                setLoadingLimitQuantity(false);
              }}
            >
              <button
                className={`relative text-slate-900 dark:text-slate-200 h-8 w-16 rounded-md border overflow-hidden ${
                  selectedSize === size?.value
                    ? " border-red-500"
                    : " border-gray-400  hover:border-red-500"
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
              )
            }
            </>
          ))}
        </div>
        <div className="text-red-600 text-sm">{errorSize}</div>
        {/* Color */}
        <div className="flex items-center gap-x-4 cursor-pointer">
          <h3 className="font-semibold text-slate-900 dark:text-slate-200">
            {t("product.color")}:
          </h3>
          {availableColors.map((color, index) => (
            <>
              {color?.value && (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedColor(
                      selectedColor === color?.value ? "" : color?.value
                    );
                    setLoading(false);
                    setErrorColor("");
                    setErrorSize("");
                    setQuantity(1);
                    setLoadingLimitQuantity(false);
                  }}
                  className={`inline-flex items-center justify-center h-8 w-16 relative overflow-hidden border rounded-md ${
                    selectedColor === color?.value
                      ? " border-red-500"
                      : " border-gray-400 hover:border-red-500"
                  }`}
                >
                  <div
                    className="h-6 w-6 rounded-full border border-gray-300"
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
              )}
            </>
          ))}
        </div>
      </div>
      <div className="text-red-600 text-sm">{errorColor}</div>

      {/* "+ or -" Quantity */}
      <div className="my-6 flex items-center gap-x-3">
        {/* Quantity increment and decrement buttons */}
        <h3 className="font-semibold text-slate-900 dark:text-slate-200">
          {t("action.quantity")}:{" "}
        </h3>
        <Button
          disabled={loading || quantityInventory}
          variant="outline"
          onMouseDown={() => handleMouseDown(decrementQuantity)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Handle mouse leaving the button
          onClick={() => handleClick(decrementQuantity)} // Single click to decrement
          className="w-10 h-10 flex justify-center items-center text-black border rounded-md border-gray-300 bg-white hover:bg-gray-200 hover:bg-opacity-50 hover:text-slate-900"
        >
          -
        </Button>
        {isEditingQuantity ? (
          <Input
            disabled={loading || quantityInventory}
            type="number"
            className="text-xl mx-1 border rounded-md border-gray-300 w-20 text-center bg-white focus:bg-white hover:bg-white text-black"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={() => setIsEditingQuantity(false)}
            autoFocus
          />
        ) : (
          <span
            className="text-xl mx-1 border rounded-md border-gray-300 w-20 py-1.5 text-center bg-white cursor-pointer text-black"
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
          className="w-10 h-10 flex text-black justify-center items-center border rounded-md border-gray-300 bg-white hover:bg-gray-200 hover:bg-opacity-50 hover:text-slate-900"
        >
          +
        </Button>
      </div>

      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-slate-900 dark:text-slate-200">
          {t("product.stockQuantity")}:
        </h3>
        <span className="text-slate-900 dark:text-slate-200">
          {getQuantityMatchColorandSize()}
        </span>
      </div>

      <div className="flex items-center gap-x-4 mt-6">
        <h3 className="font-semibold text-slate-900 dark:text-slate-200">
          {t("product.totalProductQuantity")}:
        </h3>
        <span className="text-slate-900 dark:text-slate-200">
          {totalQuantity} {t("product.productLowerCase")}
        </span>
      </div>

      <div className="flex items-center gap-x-4 mt-6">
        <h3 className="font-semibold text-slate-900 dark:text-slate-200">
          {t("product.sold")}
        </h3>
        <span className="text-slate-900 dark:text-slate-200">
          {data.sold || 0} {t("product.productLowerCase")}
        </span>
      </div>

      <div className="mt-8 flex items-center gap-x-4">
        <h3 className="font-semibold text-slate-900 dark:text-slate-200">
          {t("cart.totalPrice")}
        </h3>
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
            <ShoppingBasket
              className={`${
                user?.role !== "GUEST" && user?.id
                  ? cartdb.items.some(
                      (item) =>
                        item.product.name === data.name &&
                        item.product.id === data.id &&
                        item.size === selectedSize &&
                        item.color === selectedColor
                    )
                    ? "active-cart"
                    : ""
                  : cart.items.some(
                      (item) =>
                        item.id === data.id &&
                        item.size === selectedSize &&
                        item.color === selectedColor
                    )
                  ? "active-cart"
                  : ""
              }`}
            />
          </Button>
        ) : (
          <Button
            onClick={onAddtoCart}
            disabled={quantityInventory || loading}
            className="gap-x-2 hover:text-yellow-500 bg-gray-300 hover:bg-gray-200"
          >
            <ShoppingBasket
              className={`${
                user?.role !== "GUEST" && user?.id
                  ? cartdb.items.some(
                      (item) =>
                        item.product.name === data.name &&
                        item.product.id === data.id &&
                        item.size === selectedSize &&
                        item.color === selectedColor
                    )
                    ? "active-cart"
                    : ""
                  : cart.items.some(
                      (item) =>
                        item.id === data.id &&
                        item.size === selectedSize &&
                        item.color === selectedColor
                    )
                  ? "active-cart"
                  : ""
              }`}
            />
          </Button>
        )}

        <Button
          disabled={loading || loadingRetchdataFavorite}
          className={`${
            user?.role === "GUEST" || !user?.id
              ? "hidden"
              : "gap-x-2 bg-gray-300 text-gray-600 hover:bg-gray-200 hover:text-red-500"
          }`}
        >
          <Heart
            className={` ${
              favorite.items.some(
                (item) =>
                  item.productName === data.name &&
                  item.productId === data.id &&
                  (selectedSize
                    ? item.selectedSize === selectedSize
                    : item.selectedSize === data.productdetail.size1.value) &&
                  (selectedColor
                    ? item.selectedColor === selectedColor
                    : item.selectedColor === data.productdetail.color1.value)
              )
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleIconClick(data.id, data.name, selectedSize, selectedColor)
            }
          />
        </Button>
        {/* Check xem quantity đó còn hàng ko */}
        {quantityInventory ? (
          <Button
            disabled={quantityInventory || loading}
            className="w-full bg-red-600 hover:bg-red-500"
          >
            <div className="flex text-lg items-center gap-x-2 pl-[2.25] md:w-full justify-center">
              {t("product.outOfStock")}
              <ShoppingCart
                className={`${
                  user?.role !== "GUEST" && user?.id
                    ? cartdb.items.some(
                        (item) =>
                          item.product.name === data.name &&
                          item.product.id === data.id &&
                          item.size === selectedSize &&
                          item.color === selectedColor
                      )
                      ? "active-cart"
                      : ""
                    : cart.items.some(
                        (item) =>
                          item.id === data.id &&
                          item.size === selectedSize &&
                          item.color === selectedColor
                      )
                    ? "active-cart"
                    : ""
                }`}
              />
            </div>
          </Button>
        ) : (
          <Button
            disabled={quantityInventory || loading}
            onClick={onAddtoPushCart}
            className="w-full bg-gray-300 hover:bg-gray-200 group"
          >
            <div className="flex text-lg items-center gap-x-2 pl-[2.25] md:w-full justify-center group-hover:text-yellow-500">
              {t("cart.buyNow")}
              <ShoppingCart
                className={`${
                  user?.role !== "GUEST" && user?.id
                    ? cartdb.items.some(
                        (item) =>
                          item.product.name === data.name &&
                          item.product.id === data.id &&
                          item.size === selectedSize &&
                          item.color === selectedColor
                      )
                      ? "active-cart"
                      : ""
                    : cart.items.some(
                        (item) =>
                          item.id === data.id &&
                          item.size === selectedSize &&
                          item.color === selectedColor
                      )
                    ? "active-cart"
                    : ""
                }`}
              />
            </div>
          </Button>
        )}
      </div>
      {/* Check nếu như hết hàng mà người dùng vẫn click */}
      <div className="text-red-500 text-sm">{errorQuantityInventory}</div>
      {/* Ưa đãi thêm */}
      <div className="w-full h-full shadow-lg mt-9 rounded-lg space-y-1 overflow-hidden border border-slate-900 dark:border-slate-200">
        <div className="h-10 bg-slate-900 dark:bg-slate-200 flex items-center ">
          <h1 className="ml-3 font-bold text-slate-200 dark:text-slate-900">
            {t("warranty.additionalDiscount")}
          </h1>
        </div>
        <div className="flex items-center">
          <BadgePercent className={Infoproductcolor.textcolor} />
          <h1 className="text-sm text-slate-900 dark:text-slate-200">
            {t("action.bulkDiscount")}
          </h1>
        </div>

        <div className="flex items-center">
          <Banknote className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm text-slate-900 dark:text-slate-200">
            {t("action.bigDiscountOver2Million")}
          </h1>
        </div>

        <div className="flex items-center">
          <Tag className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm text-slate-900 dark:text-slate-200">
            {t("action.randomDiscountCode")}
          </h1>
        </div>

        <div className="flex items-center">
          <CreditCard className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm text-slate-900 dark:text-slate-200">
            {t("action.paymentMethod")}
          </h1>
        </div>

        <div className="flex items-center">
          <Award className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm text-slate-900 dark:text-slate-200">
            {t("action.hugeDiscountForBulkPurchase")}
          </h1>
        </div>

        <div className="flex items-center">
          <Shield className={Infoproductcolor.textcolor} />
          <h1 className="ml-1 text-sm text-slate-900 dark:text-slate-200">
            {t("action.warrantyInfoShort")}
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
