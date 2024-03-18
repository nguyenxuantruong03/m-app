"use client";
import { useEffect, useState } from "react";
import { Wifi, WifiOff, X } from "lucide-react";
import "./internet-status.css";
const InternetConnectionStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false); // Ban đầu ẩn trạng thái

  useEffect(() => {
    const updateConnectionStatus = () => {
      setOnline(navigator.onLine);
      setShowStatus(true); // Hiển thị thông báo khi kết nối lại
      // Đặt timeout để ẩn thông báo sau 15 giây
      const timeout = setTimeout(() => {
        setShowStatus(false);
      }, 15000);

      return () => clearTimeout(timeout); // Clear timeout khi component bị unmounted
    };

    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);

    return () => {
      window.removeEventListener("online", updateConnectionStatus);
      window.removeEventListener("offline", updateConnectionStatus);
    };
  }, []);

  const hideStatus = () => {
    setShowStatus(false); // Ẩn thông báo khi click vào nút đóng
  };

  // Chỉ hiển thị nếu showStatus được thiết lập thành true
  if (!showStatus) {
    return null;
  }

  return (
    <div
      className={`main-internetstatus bg-white border-2 border-solid border-gray-300 rounded-md mx-auto fixed bottom-10 left-5 shadow-md p-6  ${
        showStatus ? "block" : "none"
      }`}
    >
      {online ? (
        <div className="flex items-center justify-between">
          <Wifi className="w-5  h-5 text-green-500" />
          <span className="text-black text-md">
            Đã khôi phục kết nối internet.
          </span>
          <span
            onClick={hideStatus}
            className="main-internetstatus-close text-black flex justify-center items-center w-6 h-6 rounded-full "
          >
            <X className="w-4 h-4" />
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <WifiOff className="w-5  h-5 text-red-500" />
          <span className="text-black">Bạn đã offline. </span>
          <a
            className="no-underline ml-4 text-blue-500 hover:underline"
            href="#"
            onClick={() => {
              window.location.reload();
              return false;
            }}
          >
            Làm mới
          </a>{" "}
          <span
            onClick={hideStatus}
            className="main-internetstatus-close text-black flex justify-center items-center w-6 h-6 rounded-full"
          >
            <X className="w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  );
};

export default InternetConnectionStatus;
