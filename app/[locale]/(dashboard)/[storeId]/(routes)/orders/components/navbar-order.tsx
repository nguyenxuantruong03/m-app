"use client";
import { Home, Package, PackageCheck, Truck, Undo2 } from "lucide-react";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import "./style.css";

const NabarOrder = () => {
  const t = useTranslations();
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const navbarOrder = [
    {
      href: `/${params.storeId}/orders/order-confirmation`,
      label: t("order.navbar.confirmOrder"),
      icon: <Package className="w-4 h-4" />,
      match: pathname.includes(`/${params.storeId}/orders/order-confirmation`),
    },
    {
      href: `/${params.storeId}/orders/pickup-store`,
      label: t("order.navbar.pickUpAtStore"),
      icon: <Home className="w-4 h-4" />,
      match: pathname.includes(`/${params.storeId}/orders/pickup-store`),
    },
    {
      href: `/${params.storeId}/orders/order-process-prepare`,
      label: t("order.navbar.prepareGoods"),
      icon: <Truck className="w-4 h-4" />,
      match: pathname.includes(
        `/${params.storeId}/orders/order-process-prepare`
      ),
    },
    {
      href: `/${params.storeId}/orders`,
      label: t("order.navbar.orderOverview"),
      icon: <PackageCheck className="w-4 h-4" />,
      match: pathname === `/${params.locale}/${params.storeId}/orders`, // exact match cho trang chính
    },
    {
      href: `/${params.storeId}/orders/return-product`,
      label: t("order.navbar.returnGoods"),
      icon: <Undo2 className="w-4 h-4" />,
      match: pathname.includes(`/${params.storeId}/orders/return-product`),
    },
  ];

  useEffect(() => {
    const activeIndex = navbarOrder.findIndex((item) => item.match);
    if (activeIndex !== -1) {
      setCurrentStep(activeIndex + 1);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-between">
        {navbarOrder.map((item, i) => {
          const isActive = item.match;
          const isReturnPage = pathname.includes(
            `/${params.storeId}/orders/return-product`
          );
          const isComplete = !isReturnPage && i + 1 < currentStep;

          return (
            <div
              key={i}
              className={`step-item ${isActive ? "active" : ""} ${
                isComplete && !isReturnPage ? "complete" : ""
              } ${isReturnPage ? "return-page" : ""}`} // 👈 thêm class phụ trợ
            >
              <div
                className="step cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                {item.icon}
              </div>
              <p className="dark:text-white text-slate-900 text-sm">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NabarOrder;
