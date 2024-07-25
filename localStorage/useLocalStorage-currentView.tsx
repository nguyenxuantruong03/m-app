"use client"
import { List } from '@/components/navbar/custom-nav';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the type of the context value
type CurrentViewContextType = {
  currentView: List; // Change the type to List
  setCurrentView: React.Dispatch<React.SetStateAction<List>>; // Change the type to List
};

// Create the context
const CurrentViewContext = createContext<CurrentViewContextType | null>(null);

// Create the custom hook to use the context
export const useCurrentView = () => useContext(CurrentViewContext);

// Create the provider component
export const CurrentViewProvider = ({ children }: { children: React.ReactNode }) => {
  //Lưu giá trị hiện tại của Navbar vào localStorage
  const [currentView, setCurrentView] = useState<List>(() => {
    if (typeof localStorage !== "undefined") {
      const storedValue = localStorage.getItem("currentView");
      return storedValue ? (storedValue as List) : List.NAVBAR;
    } else {
      return List.NAVBAR; // Sử dụng giá trị mặc định nếu không có localStorage
    }
  });

  //Dùng để lưu trang thái hiện tại của Navbar ở cục bộ
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      // Lưu trạng thái mới nhất vào localStorage
      localStorage.setItem("currentView", currentView);
    }
  }, [currentView]);

  return (
    <CurrentViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </CurrentViewContext.Provider>
  );
};

