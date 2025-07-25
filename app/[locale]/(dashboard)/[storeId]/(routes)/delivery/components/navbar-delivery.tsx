"use client";
import { Package, PackageCheck, Truck } from "lucide-react";
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
      href: `/${params.storeId}/delivery`,
      label: t("delivery.navbar.receiveOrder"),
      icon: <Package className="w-4 h-4" />,
      match:
        pathname.includes(`/${params.storeId}/delivery`) &&
        !pathname.includes("delivery-confirmation") &&
        !pathname.includes("my-order-delivered"),
    },
    {
      href: `/${params.storeId}/delivery/delivery-confirmation`,
      label: t("delivery.delivery"),
      icon: <Truck className="w-4 h-4" />,
      match: pathname.includes(
        `/${params.storeId}/delivery/delivery-confirmation`
      ),
    },
    {
      href: `/${params.storeId}/delivery/my-order-delivered`,
      label: t("delivery.navbar.deliveredOrders"),
      icon: <PackageCheck className="w-4 h-4" />,
      match: pathname.includes(
        `/${params.storeId}/delivery/my-order-delivered`
      ),
    },
  ];

  // Update currentStep based on the active item in navbarOrder
  useEffect(() => {
    const activeItem = navbarOrder.findIndex((item) => item.match);
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
