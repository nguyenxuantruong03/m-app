"use client";
import Image from "next/image";
import "./components/style.css";
import { useEffect, useState } from "react";
import { Coupon } from "@/types/type";
import FormatDate from "@/components/format-Date";
import LoadingPageComponent from "@/components/ui/loading";
import toast from "react-hot-toast";
import { getCoupon } from "@/actions/client/coupon/get-coupon";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Info } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import {
  getToastError,
  translateNoDiscountCode,
  translateMaximumDiscount,
  translateDiscountCodeNotice,
  translateNote,
  translateSave,
  translateCode,
  translateExpiryDate,
  translateWarehouse,
  translateSavedSuccessfully,
} from "@/translate/translate-client";
const Voucher = () => {
  const user = useCurrentUser();
  const [data, setData] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";

  const toastErrorMessage = getToastError(languageToUse);
  const tranlasteWarehouseMessage = translateWarehouse(languageToUse);
  const noDiscountCodeMessage = translateNoDiscountCode(languageToUse);
  const savedSuccessfullyMessage = translateSavedSuccessfully(languageToUse);
  const maximumDiscountMessage = translateMaximumDiscount(languageToUse);
  const expriryDateMessage = translateExpiryDate(languageToUse);
  const codeMessage = translateCode(languageToUse);
  const saveMessage = translateSave(languageToUse);
  const noteMessage = translateNote(languageToUse);
  const discountCodeNotice = translateDiscountCodeNotice(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coupon = await getCoupon(languageToUse);

        // Lọc dữ liệu để chỉ lấy những coupon có redeemBy > now
        const now = new Date();
        const filteredData = coupon.filter(
          (coupon: Coupon) => new Date(coupon.redeemby) > now
        );
        setData(filteredData);
      } catch (error) {
        toast.error(toastErrorMessage);
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
        toast.success(savedSuccessfullyMessage);
      },
      (err) => {
        toast.error(toastErrorMessage);
      }
    );
  };

  return (
    <>
      {loading && <LoadingPageComponent />}

      {!loading && (
        <>
          <h2 className="text-xl text-center font-bold text-slate-900 dark:text-slate-200 mb-5 md:hidden">
            {tranlasteWarehouseMessage.name}
          </h2>
        </>
      )}

      {!loading && data.length === 0 && (
        <>
          <div className="flex justify-center">
            <Image src="/images/no-cart.png" alt="" width="108" height="98" />
          </div>
          <div className="flex justify-center my-2">
            <p className="text-slate-900 dark:text-slate-200">
              {noDiscountCodeMessage}
            </p>
          </div>
        </>
      )}

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 m-2">
        {data.map((item) => (
          <div key={item.id} className=" mb-4 relative">
            {/* Added mb-4 for spacing */}
            <div className="md:flex items-center bg-white border border-gray-300 rounded-md">
              <div className="relative h-32 md:w-32">
                <Image
                  src={item.imagecoupon[0].url}
                  alt="Coupon Image"
                  layout="fill" // Ensures the image fills its parent container
                  objectFit="cover" // Keeps the aspect ratio
                  className="rounded-md p-2"
                />
              </div>

              <div className="hidden lg:block separatorCustomForWarehouse"></div>

              <div className="flex items-center p-2">
                <div
                  className="flex-1 px-1"
                  style={{
                    color: "black",
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm md:text-lg font-bold">
                      {maximumDiscountMessage} {item.percent}%
                    </h3>
                    <Hint label={item.description}>
                      <Info className="w-5 h-5" />
                    </Hint>
                  </div>
                  <p className="text-sm">
                    {codeMessage} {item.name}
                  </p>
                  <span className="text-sm">
                    {expriryDateMessage}
                    <span className="text-xs text-gray-500 ml-1">
                      <FormatDate data={item.redeemby} language={languageToUse}/>
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
                  {saveMessage}
                </button>
              </div>
            </div>
            <div className="home-product-item__favorite mt-2">
              <span className="ml-1">x{item.maxredemptions}</span>
            </div>
          </div>
        ))}
      </div>

      {data.length > 0 && (
        <p>
          <span className="text-yellow-500 font-semibold">{noteMessage}:</span>
          <span className="text-slate-900 dark:text-slate-200">
            {discountCodeNotice}
          </span>
        </p>
      )}
    </>
  );
};

export default Voucher;
