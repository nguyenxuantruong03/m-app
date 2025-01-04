"use client";
import Container from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const PromotionalCode = () => {
  const t = useTranslations()

  useEffect(() => {
    document.title = t("promotionalCode.promotionalCode");
  }, []);

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {t("promotionalCode.discountCode")}
        </h1>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          {t("promotionalCode.discountCodeDescription")}
        </span>
        <div className="flex space-x-1">
          <h1 className="text-red-600 font-semibold">
            {t("promotionalCode.paymentMethodDescription")}:
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {t("promotionalCode.bulkPurchaseReward")}
          </span>
        </div>
        <h1 className="text-red-600 font-semibold">
          {t("promotionalCode.discountCodeInfo")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("promotionalCode.discountCodeProcess")}
        </span>
        <h1 className="text-red-600 font-semibold">
          {t("promotionalCode.luckyWheelOffer")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("promotionalCode.luckyWheelOfferDetails")}
        </span>
      </div>
    </Container>
  );
};

export default PromotionalCode;
