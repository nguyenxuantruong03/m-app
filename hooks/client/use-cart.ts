import { ProductCartLocal } from "@/types/type";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ProductUnion = ProductCartLocal;

interface CartStore {
  items: ProductUnion[];
  userId: string | null;
  addItem: (
    data: ProductCartLocal,
    quantity: number,
    warranty: string | null,
    userId: string,
    selectedSize: string,
    selectedColor: string
  ) => void;
  removeItem: (id: string, userId: string) => void;
  removeAll: (userId: string) => void;
  updateQuantity: (
    cartId: string,
    quantity: number,
    warranty: string | null,
    userId: string
  ) => void;
  selectedItems: string[]; // Array of selected item IDs
  selectAll: boolean; // Flag for "Select All" checkbox
  toggleSelectItem: (
    cartId: string,
    userId: string,
    nonSelectQuantitySold: string,
    noneSelectQuantityAvailable: string
  ) => void; // New method for toggling item selection
  toggleSelectAll: (selectableItems?: string[]) => void; // New method for toggling "Select All" checkbox
  getSelectedItemWarranty: (id: string) => string | null;
  selectWarranty: (id: string, warrantyOption: string | null) => string | null;
  selectedWarranties: Record<string, string | null>;
  removeSelectedItems: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      userId: null,
      selectedItems: [], // Initialize with an empty array
      selectAll: false, // Initialize as false
      selectedWarranties: {},

      selectWarranty: (id: string, warrantyOption: string | null) => {
        set((state) => ({
          selectedWarranties: {
            ...state.selectedWarranties,
            [id]: warrantyOption,
          },
        }));
        return warrantyOption; // Return the warranty option
      },

      getSelectedItemWarranty: (id: string) => {
        return get().selectedWarranties[id] || null;
      },
      // Toggle selectItem này xử lý nếu sản phẩm có nonSelectQuantitySold và noneSelectQuantityAvailable thì bỏ select
      // Toggle the selection of an individual item
      toggleSelectItem: (
        cartId: string,
        userId: string,
        nonSelectQuantitySold: string,
        noneSelectQuantityAvailable: string
      ) => {
        set((state) => {
          // Determine if the cartId is currently selected
          const isSelected = state.selectedItems.includes(cartId);
      
          // Filter out the items if nonSelectQuantitySold or noneSelectQuantityAvailable are selected
          const updatedSelectedItems = isSelected
            ? state.selectedItems.filter((itemId) => itemId !== cartId)
            : state.selectedItems.filter((itemId) => 
                itemId !== nonSelectQuantitySold && itemId !== noneSelectQuantityAvailable
              ).concat(cartId);
      
          // Update the selectAll flag based on whether all items are selected
          const selectAll = updatedSelectedItems.length === state.items.length;
      
          return {
            selectedItems: updatedSelectedItems,
            selectAll,
          };
        });
      },

      //Logic này thì chưa xử lý nonSelectQuantitySold và noneSelectQuantityAvailable
      // toggleSelectItem: (
      //   cartId: string,
      //   userId: string,
      //   nonSelectQuantitySold: string,
      //   noneSelectQuantityAvailable: string
      // ) => {
      //   set((state) => {
      //     const isSelected = state.selectedItems.includes(cartId);
      //     const updatedSelectedItems = isSelected
      //       ? state.selectedItems.filter((itemId) => itemId !== cartId)
      //       : [...state.selectedItems, cartId];

      //     return {
      //       selectedItems: updatedSelectedItems,
      //       selectAll: updatedSelectedItems.length === state.items.length,
      //     };
      //   });
      // },
      // Toggle the "Select All" checkbox
      toggleSelectAll: (selectableItems?: string[]) => {
        set((state) => {
          const updatedSelectedItems = state.selectAll
            ? []
            : selectableItems ?? state.items.map((item) => item.cartId);
          return {
            selectedItems: updatedSelectedItems,
            selectAll: !state.selectAll,
          };
        });
      },

      addItem: async (
        data: ProductCartLocal,
        quantity: number,
        warranty: string | null,
        userId: string,
        size: string,
        color: string
      ) => {
        const validWarranty = warranty ?? ""; // Fallback to an empty string if null+
          // Add the new item to the cart
          set({
            items: [
              ...get().items,
              {
                ...data,
                quantity,
                warranty: validWarranty,
                size,
                color,
              },
            ],
          });
          toast.success("Sản phẩm đã thêm vào giỏ hàng.");
      },
      removeSelectedItems: () => {
        set((state) => ({
          items: state.items.filter(
            (item) => !state.selectedItems.includes(item.cartId)
          ),
          selectedItems: [],
          selectedWarranties: {}, 
        }));
      },
      updateQuantity: (
        cartId: string,
        quantity: number,
        warranty: string | null,
        userId: string
      ) => {
        const validWarranty = warranty ?? "";
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId ? { ...item, quantity, validWarranty } : item
          ),
        }));
      },
      removeItem: (cartId: string, userId: string) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.cartId !== cartId);
          const newSelectedWarranties = { ...state.selectedWarranties };
          // Xóa thuộc tính: Dòng này sẽ xóa thuộc tính khỏi đối tượng có khóa khớp với mục đang bị xóa.
          // Điều này đảm bảo rằng bảo hành liên quan đến mặt hàng bị loại bỏ cũng bị xóa khỏi .delete newSelectedWarranties[id];newSelectedWarrantiesid
          delete newSelectedWarranties[cartId]; // Remove the warranty associated with the removed item

          // Trạng thái cập nhật được trả về với mảng mới và đối tượng được cập nhật.itemsselectedWarranties
          return {
            items: newItems,
            selectedWarranties: newSelectedWarranties,
            selectedItems: state.selectedItems.filter(
              (itemId) => itemId !== cartId
            ), // Remove the item from selectedItems
          };
        });
        toast.success("Sản phẩm đã xóa khỏi giỏ hàng.");
      },
      removeAll: (userId: string) => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
