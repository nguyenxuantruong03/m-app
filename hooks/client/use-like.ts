import { create } from "zustand";
import toast from "react-hot-toast";
import { Product } from "@/types/type";

export type ProductUnion = Product;

interface LikeStore {
  items: ProductUnion[];
  userId: string | null;
  addItem: (data: ProductUnion, userId: any) => void;
  removeItem: (id: string) => void;
  sortType: string | null;
  setSortType: (sortType: string | null) => void; // Add a method to set the sorting preference
  getSortedItems: () => ProductUnion[];
  filteredItems: ProductUnion[]; // Add a new state for filtered items
  setFilteredItems: (items: ProductUnion[]) => void;
}

const useLike = create<LikeStore>((set, get) => ({
  items: [],
  userId: null,
  sortType: null,
  filteredItems: [], // Initialize filtered items array

  setFilteredItems: (items: ProductUnion[]) =>
    set({ filteredItems: items }),
  addItem: (data: ProductUnion, userId: any) => {
    const existingItem = get().items.find((item) => item.id === data.id);
    if (!userId) {
      toast.error(
        "Bạn cần đăng nhập để thêm sản phẩm vào danh sách thích."
      );
      return;
    }
    if (existingItem) {
      toast.success("Sản phẩm đã được thêm lại.");
    } else {
      set({ items: [...get().items, { ...data }] });
      toast.success("Sản phẩm vào danh sách thích.");
    }
  },

  removeItem: (id: string) => {
    set({ items: [...get().items.filter((item) => item.id !== id)] });
    toast.success("Sản phẩm đã xóa khỏi danh sách thích.");
  },

  setSortType: (sortType: string | null) => set({ sortType }),
  getSortedItems: () => {
    const { items, sortType } = get();
    // Implement sorting logic based on the sortType
    if (sortType === "priceHighToLow") {
      return [...items.sort((a, b) => b.productdetail.price1 - a.productdetail.price1)];
    } else if (sortType === "priceLowToHigh") {
      return [...items.sort((a, b) => a.productdetail.price1 - b.productdetail.price1)];
    } else if (sortType === "nameAToZ") {
      return [...items.sort((a, b) => a.name.localeCompare(b.name))];
    } else if (sortType === "nameZToA") {
      return [...items.sort((a, b) => b.name.localeCompare(a.name))];
    } else if (sortType === "percentPromotionHighToLow") {
      return [
        ...items.sort((a, b) => b.productdetail.percentpromotion1 - a.productdetail.percentpromotion1),
      ];
    } else {
      return [...items];
    }
  },
}));

export default useLike;
