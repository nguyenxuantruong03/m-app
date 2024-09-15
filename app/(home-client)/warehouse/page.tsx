"use client";
import Image from "next/image";
import "./components/style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Coupon } from "@/types/type";
import FormatDate from "@/components/format-Date";
import LoadingPageComponent from "@/components/ui/loading";
import toast from "react-hot-toast";

const Voucher = () => {
  const [data, setData] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/coupon`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(
      () => {
        // Optional: Show a success message or notification
        toast.success("Đã lưu thành công!");
      },
      (err) => {
        toast.error("Failed to copy coupon code: ", err);
      }
    );
  };

  return (
    <>
      {loading && <LoadingPageComponent />}

      {!loading && data.length === 0 && (
        <>
          <div className="flex justify-center">
            <Image src="/images/no-cart.png" alt="" width="108" height="98" />
          </div>
          <div className="flex justify-center my-2">
            <p className="text-neutral-500">Không có mã giảm giá.</p>
          </div>
        </>
      )}

      <div className="grid grid-cols-3 mx-auto">
        {data.map((item) => (
          <div key={item.id} className="w-[350px] mb-4 relative">
            {" "}
            {/* Added mb-4 for spacing */}
            <div className="flex items-center bg-white border border-gray-300 rounded-md p-2">
              <div
                style={{
                  borderRight: "8px dashed red",
                }}
                className="relative h-32 w-32" // Fixed height and width
              >
                <Image
                  src={item.imagecoupon[0].url}
                  alt="Coupon Image"
                  layout="fill" // Ensures the image fills its parent container
                  objectFit="cover" // Keeps the aspect ratio
                  className="rounded-l-md"
                />
              </div>
              <div className="flex items-center">
                <div
                  className="flex-1 p-4"
                  style={{
                    color: "black",
                  }}
                >
                  <h3 className="text-lg font-bold">
                    Giảm tối đa {item.percent}%
                  </h3>
                  <p className="text-sm">code: {item.name}</p>
                  <span>
                    Thời hạn:{" "}
                    <span className="text-xs text-gray-500 ml-1">
                      <FormatDate data={item.redeemby} />
                    </span>
                  </span>
                </div>
                <button
                  disabled={item.maxredemptions === 0 || loading}
                  className={`mt-2 p-2 rounded-md text-sm bg-red-500 text-white hover:bg-red-600 ${
                    item.maxredemptions === 0 || loading
                      ? "cursor-not-allowed bg-opacity-50 hover:bg-opacity-50"
                      : ""
                  }`}
                  onClick={() => handleCopy(item.name)}
                >
                  Lưu
                </button>
              </div>
            </div>
            <div className="home-product-item__favorite mt-2">
              <span className="ml-1">x{item.maxredemptions}</span>
            </div>
          </div>
        ))}
      </div>

      <p> 
      <span className="text-yellow-500 font-semibold">Lưu ý:</span> Mã giảm giá chỉ áp dụng cho khách hàng thanh toán trực tuyến. Khi khách hàng ấn vào lưu hãy đến chỗ thanh toán để dán mã code mã vào.
      </p>
    </>
  );
};

export default Voucher;
