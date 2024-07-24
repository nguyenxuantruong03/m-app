"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Currency from "@/components/ui/currency";
import "../product-list/product-list.css";
import {
  Product,
} from "@/types/type";
import useCart from "@/hooks/client/use-cart";
import { MouseEventHandler, useState } from "react";
import toast from "react-hot-toast";
import IconButton from "@/components/ui/icon-button";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import useLike from "@/hooks/client/use-like";
import { debounce } from "lodash";
import CommentStar from "../star-comment/star-comment";
import { useCurrentUser } from "@/hooks/use-current-user";
import PreviewModal from "@/components/(client)/modal/preview-modal";

interface ProductCardProps {
  data:
    | Product
  route: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, route }) => {
  const router = useRouter();
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const userId  = useCurrentUser();
  const like = useLike();
  const { addItem, removeItem, items } = useLike();

  //Handle add like và sử dụng debounce sau 1 giay mới được add được thêm vào giỏ hàng ngăn chặn hành vi spam
  const debouncedHandleIconClick = debounce((productId: string) => {
    const isLiked = items.some((item) => item.id === productId);

    if (isLiked) {
      removeItem(productId);
    } else {
      addItem(data, userId);
    }
  }, 1000);

  const handleIconClick = (productId: string) => {
    debouncedHandleIconClick(productId);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setOpenPreviewModal(true)
  };

  const onAddtoCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    const productWithQuantity = {
      ...data,
      quantity,
      selectedWarranty: cart.getSelectedItemWarranty(data.id),
    };

    const existingCartItem = cart.items.find((item) => item.id === data.id);

    if (existingCartItem) {
      cart.updateQuantity(data.id, existingCartItem.productdetail.quantity1 + quantity);
      toast.success("Sản phẩm đã được cập nhật số lượng trong giỏ hàng.");
    } else {
      cart.addItem(productWithQuantity, quantity, userId); // Pass the userId here
    }
  };

  const handleClick = () => {
    router.push(`/${route}/${data?.name}`);
  };

  const discountedPrice = data.productdetail.price1 * ((100 - data.productdetail.percentpromotion1) / 100);

  return (
    <>
    <PreviewModal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        product= {data}
      />
    <div className="relative">
      <div
        onClick={handleClick}
        className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      >
        {/* Images and actions */}
        <div className="aspect-square rounded-xl bg-gray-100">
          <Image
            src={data?.images?.[0].url} 
            width="500"
            height="500"
            alt="Image"
            className="aspect-square object-cover rounded-md"
            loading="lazy"
          />
          <div className="opacity-0 group-hover:opacity-100 transition w-full pr-6 top-40 absolute">
            <div className="flex gap-x-6 justify-center">
              <IconButton
                onClick={onPreview}
                icon={<Expand size={20} className="text-gray-600" />}
                text="Mở rộng"
              />
              <IconButton
                onClick={onAddtoCart}
                icon={<ShoppingCart size={20} className="text-gray-600" />}
                text="Thêm mới"
              />
              <IconButton
                onClick={() => handleIconClick(data.id)}
                icon={
                  <Heart
                    size={20}
                    className={`text-gray-600 ${
                      like.items.some((item) => item.id === data.id)
                        ? "active"
                        : ""
                    }`}
                  />
                }
                text="Thả tim"
              />
            </div>
          </div>
        </div>
        {/* Description */}
        <div>
          <p className="font-semibold text-base single-line-ellipsis">
            {data.heading}
          </p>
          <p className="text-sm text-gray-500 single-line-ellipsis">
            {data.productdetail.category?.name}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Currency valueold={data.productdetail?.price1} value={discountedPrice} />
        </div>
        <CommentStar data={data.id} />
      </div>
      <div className="home-product-item__favorite">
        <span className="ml-1">Giảm {data.productdetail.percentpromotion1}%</span>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
