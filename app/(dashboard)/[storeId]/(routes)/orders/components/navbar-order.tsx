"use client";
import { Check, Home, Package, PackageCheck, Truck, Undo2 } from "lucide-react";
import { usePathname, useRouter, useParams } from "next/navigation";

import "./style.css";
import { useState, useEffect } from "react";
const NabarOrder = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const navbarOrder = [
    {
      href: `/${params.storeId}/orders/order-confirmation`,
      label: "Xác nhận đơn hàng",
      icon: <Package className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/orders/order-confirmation`,
    },
    {
      href: `/${params.storeId}/orders/pickup-store`,
      label: "Nhận tại cửa hàng",
      icon: <Home className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/orders/pickup-store`,
    },
    {
      href: `/${params.storeId}/orders/order-process-prepare`,
      label: "Soạn hàng",
      icon: <Truck className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/orders/order-process-prepare`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Tổng quan đơn hàng",
      icon: <PackageCheck className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/orders/return-product`,
      label: "Trả hàng",
      icon: <Undo2 className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/orders/return-product`,
    },
  ];

  // Update currentStep based on the active item in navbarOrder
  useEffect(() => {
    const activeItem = navbarOrder.findIndex((item) => item.active);
    if (activeItem !== -1) {
      setCurrentStep(activeItem + 1); // Set current step to active item's index + 1
    }
  }, [pathname]); // Trigger when pathname changes

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-between">
          {navbarOrder?.map((item, i) => (
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                i + 1 < currentStep && "complete"
              } `}
            >
              <div
                className="step cursor-pointer"
                onClick={() => router.push(`${item.href}`)}
              >
                {item.icon}
              </div>
              <p className="dark:text-white text-slate-900 text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NabarOrder;
