"use client";
import Container from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Preorder = () => {
  const t = useTranslations()

  useEffect(() => {
    document.title = t("preorder.preorder");
  }, []);

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {t("preorder.orderMethod")}
        </h1>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          {t("preorder.orderModel")}
        </span>
        <div className="flex space-x-2">
          <h1 className="text-green-600 font-semibold">
            {" "}
            {t("preorder.riskReduction")}:
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {t("preorder.paymentOnDelivery")}
          </span>
        </div>
        <h1 className="text-red-600 font-semibold">
          {t("preorder.increaseReliability")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("preorder.trustBuildingModel")}
        </span>
        <h1 className="text-red-600 font-semibold">
          {t("preorder.orderConfirmation")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("preorder.orderProcess")}
        </span>
      </div>
    </Container>
  );
};

export default Preorder;
