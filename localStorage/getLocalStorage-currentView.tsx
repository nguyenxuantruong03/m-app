"use client";
import React, { useEffect, useState } from "react";
import { useCurrentView } from "./useLocalStorage-currentView";
import { List } from "@/components/navbar/custom-nav";

function GetLocalStorage({ children }: { children: React.ReactNode }) {
  const context = useCurrentView();
  const currentView = context ? context.currentView : ""; // Giá trị mặc định nếu context là null
  const [localView, setLocalView] = useState(() => {
    // Kiểm tra xem localStorage có tồn tại không
    if (typeof window !== 'undefined') {
      const storedValue = window.localStorage.getItem("currentView");
      return storedValue ? storedValue : currentView;
    } else {
      return currentView;
    }
  });
  
  //Sử dụng useEffect ở đây đủ khi chuyển qua navBar nó sẽ thay đổi Navbar đó ngay lập tức không cần phải F5 trang
  useEffect(() => {
    localStorage.setItem("currentView", localView);
  }, [localView]);

  useEffect(() => {
    setLocalView(currentView);
  }, [currentView]);
  
  const marginTop = localView === List.NAVBAR ? "96px" : "0px"; // Kiểm tra điều kiện và gán giá trị marginTop tương ứng
  return <div style={{ marginTop }}>{children}</div>; // Sử dụng marginTop tại đây
}

export default GetLocalStorage;
