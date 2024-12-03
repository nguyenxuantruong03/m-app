"use client";
import { Check, Package, PackageCheck, Truck } from "lucide-react";
import { usePathname, useRouter, useParams } from "next/navigation";

import "./style.css";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getNavDelivery } from "@/translate/translate-dashboard";
const NabarOrder = () => {
  //language
  const user = useCurrentUser();
  const languageToUse = user?.language || "vi";
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  //language
  const navDeliveryMessage = getNavDelivery(languageToUse)

  const navbarOrder = [
    {
      href: `/${params.storeId}/delivery`,
      label: navDeliveryMessage.receiveOrder,
      icon: <Package className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/delivery`,
    },
    {
      href: `/${params.storeId}/delivery/delivery-confirmation`,
      label: navDeliveryMessage.delivery,
      icon: <Truck className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/delivery/delivery-confirmation`,
    },
    {
      href: `/${params.storeId}/delivery/my-order-delivered`,
      label: navDeliveryMessage.deliveredOrders,
      icon: <PackageCheck className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/delivery/my-order-delivered`,
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
              <p className="text-white text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NabarOrder;
