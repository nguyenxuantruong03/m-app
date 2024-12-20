"use client";

import getBillboard from "@/actions/client/billboard/get-billboard";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Ads = () => {
  const user = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billboard, setBillboard] = useState<any>(null);
  const [canClose, setCanClose] = useState(false); // Track if modal can be closed

  const openModal = async () => {
    await axios.patch("/api/client/ads");
    setIsModalOpen(true);
    setCanClose(false); // Disable close when the modal opens

    // Enable close after 3 seconds
    setTimeout(() => {
      setCanClose(true);
    }, 2000);
  };

  const closeModal = () => {
    if (canClose) {
      // Only close if canClose is true
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    // Chỉ fetchData nếu người dùng không tắt quảng cáo
    if (user?.id && !user?.isShowAds) {
      const fetchData = async () => {
        try {
          const data = await getBillboard(
            `${process.env.NEXT_PUBLIC_ADS}`,
            user?.language || "vi"
          );
          setBillboard(data);
        } catch (error) {
          console.error("Failed to fetch billboard:", error);
        }
      };

      fetchData();
    }
  }, [user?.isShowAds, user?.language]); // Cập nhật khi isShowAds hoặc language thay đổi

  // Kiểm tra nếu không có billboard hoặc quảng cáo không được hiển thị, không mở modal
  useEffect(() => {
    if (!billboard || !billboard.imagebillboard?.[0] || !user?.id ) {
      return; // Không mở modal nếu không có billboard, hoặc quảng cáo đã được người dùng xem
    }
    //----------Mở modal--------
    openModal();
  }, [billboard]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset overflow when the component is unmounted
    };
  }, [isModalOpen]);

  // Nếu không có billboard, không render gì
  if (!billboard || !billboard.imagebillboard?.[0]) {
    return null;
  }

  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999999998]"
          onClick={closeModal}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the image
          >
            <Link href={billboard.imagebillboard[0].link ? billboard.imagebillboard[0].link : "/home-product" }>
              <Image
                className="rounded-lg object-cover"
                src={billboard.imagebillboard[0].url}
                alt={billboard.imagebillboard[0].label}
                width={500}
                height={500}
              />
            </Link>
            <button
              onClick={closeModal}
              disabled={!canClose}
              className="absolute cursor-pointer top-2 right-2 flex items-center justify-center text-xl rounded-full text-slate-900 w-6 h-6 bg-gray-300 hover:bg-gray-400"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ads;
