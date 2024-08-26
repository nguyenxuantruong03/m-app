import { CartItemType, Product, User } from "@/types/type";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface CartStore {
  items: CartItemType[];
  userId: string | null;
  addItem: (data: Product, quantity: number, warranty: string | null, userId: string,selectedSize: string, selectedColor:string) => void;
  removeItem: (id: string, userId: string) => void;
  removeAll: (userId: string) => void;
  updateQuantity: (id: string, quantity: number, warranty: string | null, userId: string) => void;
  selectedItems: string[];
  selectAll: boolean;
  toggleSelectItem: (id: string,userId: string,nonSelectQuantitySold: string, noneSelectQuantityAvailable: string) => void;
  toggleSelectAll: (selectableItems?: string[]) => void;
  getSelectedItemWarranty: (id: string) => string | null;
  selectWarranty: (id: string, warrantyOption: string | null) => string | null;
  selectedWarranties: Record<string, string | null>;
  removeSelectedItems: (userId: string) => void;
  fetchCartItems: (userId: string) => void; // New method to fetch cart items
}

const useCartdb = create<CartStore>((set, get) => ({
  items: [],
  userId: null,
  selectedItems: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('selectedItems') || '[]') : [],
  selectAll: false,
  selectedWarranties: {},
  loading: false,

  fetchCartItems: async (userId: string) => {
    //TODO: Phương thức get nhưng bởi vì api trong Nextjs hạn chế query nene để post
    const response =  await axios.post("/api/client/cart/get-items", {
      userId: userId,
    });
    const cartItems = response.data;
    set({ items: cartItems });
  },

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

  toggleSelectItem: async (id: string, userId: string, nonSelectQuantitySold: string, noneSelectQuantityAvailable: string) => {
    set((state) => {
      let updatedItems: string[];
  
      // Check if the item is already selected
      const isSelected = state.selectedItems.includes(id);
  
      if (isSelected) {
        // If selected, remove the item from updatedItems
        updatedItems = state.selectedItems.filter((itemId) => itemId !== id);
      } else {
        // If not selected, add the item to updatedItems
        updatedItems = [...state.selectedItems, id];
      }

      if (typeof window !== 'undefined') {
        let currentItems = JSON.parse(localStorage.getItem('selectedItems') || '[]');
  
        // Remove nonSelectQuantitySold item if it is present
        if (nonSelectQuantitySold && currentItems.includes(nonSelectQuantitySold)) {
          console.log("Removing nonSelectQuantitySold", nonSelectQuantitySold);
          currentItems = currentItems.filter((item: string) => item !== nonSelectQuantitySold);
        }
  
        // Remove noneSelectQuantityAvailable item if it is present
        if (noneSelectQuantityAvailable && currentItems.includes(noneSelectQuantityAvailable)) {
          console.log("Removing noneSelectQuantityAvailable", noneSelectQuantityAvailable);
          currentItems = currentItems.filter((item: string) => item !== noneSelectQuantityAvailable);
        }

        // Remove id from currentItems if it was deselected
        if (isSelected) {
          currentItems = currentItems.filter((item: string) => item !== id);
        } else {
          // Add id to currentItems if it was selected
          if (!currentItems.includes(id)) {
            currentItems.push(id);
          }
        }
  
        // Update local storage with the new list
        localStorage.setItem('selectedItems', JSON.stringify(currentItems));
        
        // Sync Zustand state with localStorage
        updatedItems = currentItems; 
      }
      // Return the new state
      return {
        ...state,
        selectedItems: updatedItems,
        selectAll: updatedItems.length === state.items.length,
      };
    });
  },

  
  toggleSelectAll: (selectableItems?: string[]) => {
    set((state) => {
      const updatedSelectedItems = state.selectAll
        ? []
        : (selectableItems ?? state.items.map((item) => item.id));
      
      if (typeof window !== 'undefined') {
        // Save to localStorage
        localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
      }
  
      return {
        selectedItems: updatedSelectedItems,
        selectAll: !state.selectAll,
      };
    });
  }
  ,

  addItem: async (data: Product, quantity: number, warranty: string | null, userId: string,selectedSize: string,selectedColor: string) => {
    const response = await axios.post("/api/client/cart/addItem", {
      productId: data.id,
      quantity,
      userId,
      size: selectedSize,
      color: selectedColor,
      warranty: warranty
    });

    const newItem = response.data;

    const cartItem: CartItemType = {
      id: newItem.id,
      size: newItem.size,
      color: newItem.color,
      warranty: 0, // or some default value, adjust as needed
      quantity: newItem.quantity,
      user: { id: userId } as User, // Assuming you have a user object
      product: data, // Assuming 'data' is of type 'Product'
    };

    if (typeof window !== 'undefined') {
    localStorage.setItem('selectedItems', JSON.stringify([]));
    }
  
    set((state) => ({
      items: [...state.items, cartItem],
    }));

    toast.success("Sản phẩm đã thêm vào giỏ hàng.");
  },

  removeSelectedItems: async (userId: string) => {
    await get().fetchCartItems(userId);

    // Now that we have the latest cart items, map selected product IDs to cart item IDs
    const cartItemIds = get().items
      .filter(item => get().selectedItems.includes(item.id))
      .map(item => item.id);

    await axios.post("/api/client/cart/removeSelectedItems", {
      userId,
      ids: cartItemIds,
    });

    set((state) => {
      const updatedSelectedItems = state.selectedItems.filter(
        itemId => !get().selectedItems.includes(itemId)
      );
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
    }
      return {
        //  - Hàm tạo ra một mảng mới bao gồm các phần tử của mà thỏa mãn điều kiện trong 
        //  hàm callback được truyền vào.filterstate.items
        //  item => !state.selectedItems.includes(item.id): 
        //  - Hàm callback này kiểm tra từng phần tử bên trong trong . Nó trả về nếu không tồn tại bên trong .
        // - Dấu phủ định kết quả . Nếu không có bên trong ,=> kết quả là true
        // Nếu mà là true thì nó sẽ xóa cái đó đi
        items: state.items.filter(
          (item) => !state.selectedItems.includes(item.id)
        ),
        selectedItems: [],
        selectedWarranties: {},
      };
    });
  },


  updateQuantity: async (id: string, quantity: number, warranty: string | null, userId: string) => {
    // Optimistically update the state first
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      ),
    }));
  
    // Then, make the API call
    try {
      const response = await axios.post("/api/client/cart/updateQuantity", {
        id,
        quantity,
        warranty,
        userId,
      });
  
      const updatedItem = response.data;
  
      // Ensure the state is in sync with the response from the server
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: updatedItem.quantity } : item
        ),
      }));
  
    } catch (error) {
      // Rollback the optimistic update if there was an error
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - quantity } : item
        ),
      }));
      toast.error("Có lỗi xảy ra khi cập nhật số lượng sản phẩm.");
    }
  },

  removeItem: async (id: string, userId: string) => {
    await axios.post("/api/client/cart/removeItem", { id, userId });

    set((state) => {
      const cartItem = state.items.find(item => item.id === id);
      if (!cartItem) {
        console.error(`Item with id ${id} not found`);
        return state;
      }
  
      const productId = cartItem.id;
      const updatedSelectedItems = state.selectedItems.filter(
        (itemId) => itemId !== productId
      );
      if (typeof window !== 'undefined') {
      localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
      }
      return {
        items: state.items.filter((item) => item.id !== id),
        selectedItems: updatedSelectedItems,
      };
    });
  
    toast.success("Sản phẩm đã xóa khỏi giỏ hàng.");
  },

  removeAll: async (userId: string) => {
    await axios.post("/api/client/cart/removeAll", { userId });
    if (typeof window !== 'undefined') {
    localStorage.setItem('selectedItems', JSON.stringify([]));
    }
    set({ items: [] });
  },
}));

export default useCartdb;
