import { create } from "zustand";
import toast from "react-hot-toast";
import { FavoriteProduct } from "@/types/type";
import axios from "axios";
import {
  getColorPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";
import getFavoriteProduct from "@/actions/client/favoriteProduct";

export type FavoriteUnion = FavoriteProduct;

interface LikeStore {
  items: FavoriteUnion[];
  userId: string | null;
  addItem: (data: FavoriteUnion) => void;
  removeItem: (id: string, userId: string) => void;
  sortType: string | null;
  setSortType: (sortType: string | null) => void; // Add a method to set the sorting preference
  getSortedItems: () => FavoriteUnion[];
  filteredItems: FavoriteUnion[]; // Add a new state for filtered items
  setFilteredItems: (items: FavoriteUnion[]) => void;
  fetchFavoriteItems: (userId: string) => void;
}

const useFavorite = create<LikeStore>((set, get) => ({
  items: [],
  userId: null,
  sortType: null,
  filteredItems: [], // Initialize filtered items array

  setFilteredItems: (items: FavoriteUnion[]) => set({ filteredItems: items }),

  fetchFavoriteItems: async (userId: string) => {
    try {
      const favoriteProduct = await getFavoriteProduct({ userId: userId });
      set({ items: favoriteProduct || [] }); // Trả về [] nếu không có dữ liệu
    } catch (error) {
      set({ items: [] }); // Trả về [] nếu có lỗi
    }
  },
  

  addItem: async (data: FavoriteUnion) => {
      try {
        await axios.post("/api/client/favoriteProduct", {
          id: data.id,
          productName: data.productName,
          productId: data.productId,
          userId: data.userId,
          selectedSize: data.selectedSize,
          selectedColor: data.selectedColor,
        });
        set({ items: [...get().items, { ...data }] });
      } catch (error: unknown) {
        if (
          (error as { response?: { data?: { error?: string } } }).response &&
          (error as { response: { data?: { error?: string } } }).response.data &&
          (error as { response: { data: { error?: string } } }).response.data
            .error
        ) {
          // Hiển thị thông báo lỗi cho người dùng
          toast.error(
            (error as { response: { data: { error: string } } }).response.data
              .error
          );
        }
      }
  },

  removeItem: async (id: string, userId: string) => {

    try {
      await axios.delete("/api/client/favoriteProduct", {
        data: { id: id, userId: userId },
      });
      set({ items: [...get().items.filter((item) => item.id !== id)] });
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      }
    }
  },

  setSortType: (sortType: string | null) => set({ sortType }),

  getSortedItems: () => {
    const { items, sortType } = get();

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

    // Function to get the final price and percent promotion for sorting
    const getFinalPriceAndPromotion = (item: any) => {
      const { price, percentpromotion } = getPriceMatchColorandSize({
        product: item.product,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      });
      return { price, percentpromotion };
    };

    // Sort items based on sortType
    if (sortType === "priceHighToLow") {
      return [
        ...items.sort((a, b) => {
          const aDetails = getFinalPriceAndPromotion(a);
          const bDetails = getFinalPriceAndPromotion(b);
          return bDetails.price - aDetails.price;
        }),
      ];
    } else if (sortType === "priceLowToHigh") {
      return [
        ...items.sort((a, b) => {
          const aDetails = getFinalPriceAndPromotion(a);
          const bDetails = getFinalPriceAndPromotion(b);
          return aDetails.price - bDetails.price;
        }),
      ];
    } else if (sortType === "nameAToZ") {
      return [
        ...items.sort((a, b) => a.product.name.localeCompare(b.product.name)),
      ];
    } else if (sortType === "nameZToA") {
      return [
        ...items.sort((a, b) => b.product.name.localeCompare(a.product.name)),
      ];
    } else if (sortType === "percentPromotionHighToLow") {
      return [
        ...items.sort((a, b) => {
          const aDetails = getFinalPriceAndPromotion(a);
          const bDetails = getFinalPriceAndPromotion(b);
          return bDetails.percentpromotion - aDetails.percentpromotion;
        }),
      ];
    } else {
      return [...items];
    }
  },
}));

export default useFavorite;
