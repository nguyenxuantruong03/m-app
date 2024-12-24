"use client";
import getWareHouse from "@/actions/client/warehouse";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  translateAll,
  translateCancelledOrReturned,
  translateCompletedNormal,
  translateConfirmOrder,
  translateDeliveringNormal,
  translatePrepareOrder,
  translateWaitingForDelivery,
} from "@/translate/translate-client";
import { cn } from "@/lib/utils";
import { Order } from "@/types/type";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarDelivery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCurrentUser();
  const [data, setData] = useState<Order[]>([]);
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
  const allMessage = translateAll(languageToUse);
  const confirmOrderMessage = translateConfirmOrder(languageToUse);
  const prepareOrderMessage = translatePrepareOrder(languageToUse);
  const waitingForDeliveryMessage = translateWaitingForDelivery(languageToUse);
  const deliveringNormalMessage = translateDeliveringNormal(languageToUse);
  const completedNormalMessage = translateCompletedNormal(languageToUse);
  const cancelledOrReturnedMessage =
    translateCancelledOrReturned(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehouse = await getWareHouse();
        setData(warehouse);
      } catch (error) {
        console.error("Fetch data error!");
      }
    };
    fetchData();
  }, [user?.id]);

  const matchStatus = data.filter((item: Order) => item.userId === user?.id);
  const cofirmProduct = matchStatus.filter(
    (item) => item.status === "Cho_xac_nhan"
  );
  const prepareProduct = matchStatus.filter(
    (item) => item.status === "Soan_hang"
  );
  const transportProduct = matchStatus.filter(
    (item) => item.status === "Cho_lay_hang"
  );
  const deliveringProduct = matchStatus.filter(
    (item) => item.status === "Dang_giao"
  );
  const deliveredProduct = matchStatus.filter(
    (item) => item.status === "Da_giao"
  );
  const returnProduct = matchStatus.filter(
    (item) => item.status === "Tra_hang" || item.status === "Da_huy"
  );

  const navbarOrder = [
    {
      href: `/warehouse/package-product`,
      label: allMessage,
      active:
        pathname.startsWith(`/warehouse/package-product`) &&
        !pathname.includes(`/confirmation-product`) &&
        !pathname.includes(`/prepare-product`) &&
        !pathname.includes(`/transport-product`) &&
        !pathname.includes(`/delivering-product`) &&
        !pathname.includes(`/delivered-product`) &&
        !pathname.includes(`/return-product`),
      length: matchStatus.length,
    },
    {
      href: `/warehouse/package-product/confirmation-product`,
      label: confirmOrderMessage,
      active: pathname.startsWith(
        `/warehouse/package-product/confirmation-product`
      ),
      length: cofirmProduct.length,
    },
    {
      href: `/warehouse/package-product/prepare-product`,
      label: prepareOrderMessage,
      active: pathname.startsWith(`/warehouse/package-product/prepare-product`),
      length: prepareProduct.length,
    },
    {
      href: `/warehouse/package-product/transport-product`,
      label: waitingForDeliveryMessage,
      active: pathname.startsWith(
        `/warehouse/package-product/transport-product`
      ),
      length: transportProduct.length,
    },
    {
      href: `/warehouse/package-product/delivering-product`,
      label: deliveringNormalMessage,
      active: pathname.startsWith(
        `/warehouse/package-product/delivering-product`
      ),
      length: deliveringProduct.length,
    },
    {
      href: `/warehouse/package-product/delivered-product`,
      label: completedNormalMessage,
      active: pathname.startsWith(
        `/warehouse/package-product/delivered-product`
      ),
      length: deliveredProduct.length,
    },
    {
      href: `/warehouse/package-product/return-product`,
      label: cancelledOrReturnedMessage,
      active: pathname.startsWith(`/warehouse/package-product/return-product`),
      length: returnProduct.length,
    },
  ];
  return (
    <div className="overflow-x-auto bg-zinc-400 bg-opacity-10">
      <div className="flex items-center justify-between">
        {navbarOrder.map((item) => (
          <div
            key={item.href}
            className={`relative ${
              item.active
                ? "border-b border-red-600 hover:border-red-500"
                : "border-b border-slate-200 hover:border-slate-700 dark:hover:border-slate-300"
            } cursor-pointer w-full`} // Thêm w-full ở đây
            onClick={() => router.push(`${item.href}`)}
          >
            <div className="flex items-center justify-center w-full px-3">
              <span
                className={cn(
                  "font-semibold py-4 block mr-0.5 whitespace-nowrap",
                  item.active
                    ? "text-red-600 hover:text-red-500"
                    : "text-slate-900 dark:text-slate-200 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                {item.label}
              </span>
              {item.length > 0 && (
                <span className="text-red-600 hover:text-red-500">
                  ({item.length})
                </span>
              )}
            </div>
            {item.active && (
              <div className="absolute bottom-0 left-0 w-full border-b-2 border-red-600 hover:border-red-500"></div> // Đảm bảo border dưới kéo dài hết chiều rộng
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarDelivery;
