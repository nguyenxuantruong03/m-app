"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import { getAllProductNotQuery } from "@/actions/client/products/get-products";
import { Product, User } from "@/types/type";
import { getAllUser } from "@/actions/client/get-user";
import ShowInfoUserModal from "./show-user-modal";
import { root } from "@/components/(client)/color/color";
import { useCurrentUser } from "@/hooks/use-current-user";
import toast from "react-hot-toast";
import {
  getToastError,
  translateEmployees,
  translateExplore,
  translateOverviewStore,
  translateQuantitySold,
  translateStoreDescriptionShort,
  translateTotalCustomers,
  translateTotalProduct,
} from "@/translate/translate-client";
import { useRouter } from "next/navigation";

const OverViewStore = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [allProduct, setDataAllProduct] = useState<Product[]>([]);
  const [allUser, setDataAllUser] = useState<any[]>([]);
  const [totalSold, setTotalSold] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [staffUsers, setStaffUsers] = useState<any[]>([]);
  const [totalStaff, setTotlaStaff] = useState<number>(0);
  const [totalUser, setTotlaUser] = useState<number>(0);
  const [isopen, setOpen] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  //languages
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const toastErrorMessage = getToastError(languageToUse);
  const overviewStoreMessage = translateOverviewStore(languageToUse);
  const storeDescriptionShortMessage =
    translateStoreDescriptionShort(languageToUse);
  const exploreMessage = translateExplore(languageToUse);
  const totalProductMessage = translateTotalProduct(languageToUse);
  const quantitySoldMessage = translateQuantitySold(languageToUse);
  const employeeMessage = translateEmployees(languageToUse);
  const totalCustomerMessage = translateTotalCustomers(languageToUse);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getAllProductNotQuery();
        const allUser = await getAllUser();
        setDataAllProduct(allProducts);
        setDataAllUser(allUser);
      } catch (error) {
        toast.error(toastErrorMessage);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total sold whenever allProduct changes
    const total = allProduct.reduce(
      (acc, product) => acc + (product.sold || 0),
      0
    );
    setTotalSold(total);
    setTotalProducts(allProduct.length);
  }, [allProduct]);

  useEffect(() => {
    // Filter users with roleStaff whenever allUser changes
    const staff = allUser.filter((user) => user.role === "STAFF");
    setStaffUsers(staff);
    setTotlaStaff(staff.length);
    setTotlaUser(allUser.length);
  }, [allUser]);

  return (
    <>
      <ShowInfoUserModal
        isOpen={isopen}
        onClose={() => setOpen(false)}
        staffUsers={staffUsers}
      />
      <div className={` pb-16 ${root.bgwhite}`}>
        <div className="relative">
          {/* Outer element with responsive width and center alignment */}
          <div className="bg-[#372f6a] rounded-md bg-opacity-50 shadow-[0_0_20px_rgba(0,0,0,0.2)] w-[90%] md:w-[80%] lg:w-[75%] mx-auto flex items-center justify-center min-h-[550px] lg:min-h-[450px]">
            {/* Inner element that is wider with responsive design */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-center p-4 md:p-0">
              <div className="bg-[#57417c] rounded-md shadow-[0_0_20px_rgba(0,0,0,0.2)] w-full md:w-[90%] lg:w-[80%] py-16 relative">
                <div className="flex flex-col lg:flex-row items-center justify-center space-y-10 lg:space-y-0 lg:space-x-16">
                  <div className="space-y-5 mb-8">
                    <p className="font-semibold text-white text-xl">
                      {overviewStoreMessage}
                    </p>
                    <p className="max-h-80 max-w-xs text-white">
                      {storeDescriptionShortMessage}
                    </p>
                    <Button
                      className="bg-[#372f6a] hover:bg-[#372f6a] hover:bg-opacity-50 text-white"
                      onClick={() => router.push("/home-product")}
                    >
                      {exploreMessage}
                    </Button>
                  </div>
                  <div className="relative flex items-center justify-center">
                    {/* Vertical Separator */}
                    <Separator
                      orientation="vertical"
                      className="absolute h-40 left-1/2 transform -translate-x-1/2 z-10 border-zinc-400 "
                    />
                    {/* Horizontal Separator */}
                    <div className="border w-80 border-zinc-400 my-8" />
                    {/* Number positions */}
                    <div className="absolute top-0 left-20 transform -translate-x-10 -translate-y-10 text-center">
                      <p className="font-semibold text-4xl text-white">
                        {totalProducts > 0 && <span>+</span>}
                        <CountUp start={0} end={totalProducts} />
                      </p>
                      <p className="text-xs text-gray-400">
                        {totalProductMessage}
                      </p>
                    </div>
                    <div className="absolute top-0 right-20 transform translate-x-10 -translate-y-10 text-center">
                      <p className="font-semibold text-4xl text-white">
                        {totalSold > 0 && <span>+</span>}
                        <CountUp start={0} end={totalSold} />
                      </p>
                      <p className="text-xs text-gray-400">
                        {quantitySoldMessage}
                      </p>
                    </div>
                    <div
                      className="absolute bottom-0 left-20 transform -translate-x-10 translate-y-10 text-center cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      <p className="font-semibold text-4xl text-white">
                        {totalStaff > 0 && <span>+</span>}
                        <CountUp start={0} end={totalStaff} />
                      </p>
                      <p className="text-xs text-gray-400">{employeeMessage}</p>
                    </div>
                    <div className="absolute bottom-0 right-20 transform translate-x-10 translate-y-10 text-center">
                      <p className="font-semibold text-4xl text-white">
                        {totalUser > 0 && <span>+</span>}
                        <CountUp start={0} end={totalUser} />
                      </p>
                      <p className="text-xs text-gray-400">
                        {totalCustomerMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverViewStore;
