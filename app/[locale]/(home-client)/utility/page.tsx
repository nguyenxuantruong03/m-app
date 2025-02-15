"use client";
import { mainnavcolor } from "@/components/(client)/color/color";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { Gift, PackageSearch, TicketPercent } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const UtilityPage = () => {
  const t = useTranslations()
  const user = useCurrentUser();
  const pathname = usePathname();
  const param = useParams();

  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = t("utility.utility");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 640);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role !== "GUEST" && user.id) {
        const fetchData = async () => {
          try {
            setLoading(true);
            // Load totalCoins from the server using GET request
            await axios
              .get(`/api/${param.storeId}/wheelSpin`)
              .then((response) => {
                setRotation(response.data.latestRotation);
              });
          } catch (error) {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              // Hiển thị thông báo lỗi cho người dùng
              toast.error(
                (error as { response: { data: { error: string } } }).response
                  .data.error
              );
            } else {
              // Hiển thị thông báo lỗi mặc định cho người dùng
              toast.error("Something went wrong!");
            }
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
    }
  }, [param.storeId]);

  const typeList = [
    {
      key: "spinlucky",
      name: t("utility.spin"),
      name2: t("utility.lucky"),
      link: "/spinlucky",
      icon: Gift,
      rotation: rotation,
    },
    {
      key: "warehouse",
      name: t("utility.discountCode"),
      name2: t("utility.superSpeed"),
      link: "/warehouse",
      icon: TicketPercent,
      rotation: undefined,
    },
    {
      key: "PackageProduct",
      name: t("utility.shipping"),
      name2: t("utility.order"),
      link: "/warehouse/package-product",
      icon: PackageSearch,
      rotation: undefined,
    },
  ];

  if (isMobile)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-xl font-bold text-slate-900 dark:text-slate-200">
          {t("utility.mobileOnly")}
        </div>
      </div>
    );

  return (
    <>
      {!isMobile && (
        <div className="block md:hidden mt-24 p-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-200 mb-5">
            {t("utility.utility")}
          </h2>
          <div className="space-y-2">
            {typeList.map((type) => (
              <div
                key={type.key}
                className={`${mainnavcolor.bghover} dark:bg-slate-600 bg-slate-200 hover:text-slate-200 group`}
              >
                <Link href={`${type.link}`}>
                  <div className="flex flex-col items-center">
                    <div className="basis-1/2 flex gap-2">
                      <div className="basis-1/3 flex flex-col items-center justify-center relative">
                        <type.icon className="w-6 h-6 text-slate-900 dark:text-slate-200 group-hover:text-slate-200" />
                        {!loading && type.rotation !== undefined && (
                          <span className="w-5 h-5 absolute bg-[#e53350] rounded-full left-[10px] top-0 -mt[1px] shadow-lg">
                            <p className="text-[0.75rem] text-center font-semibold text-white">
                              {type.rotation}
                            </p>
                          </span>
                        )}
                      </div>
                      <div className="basis-2/3 text-red-500">
                        <div
                          className={cn(
                            "text-xs w-20",
                            pathname === `/warehouse`
                              ? "text-sky-500"
                              : "text-slate-900 dark:text-slate-200 group-hover:text-slate-200"
                          )}
                        >
                          {type.name}
                        </div>
                        <div
                          className={cn(
                            "text-xs w-20",
                            pathname === `/warehouse`
                              ? "text-sky-500"
                              : "text-slate-900 dark:text-slate-200 group-hover:text-slate-200"
                          )}
                        >
                          {type.name2}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UtilityPage;
