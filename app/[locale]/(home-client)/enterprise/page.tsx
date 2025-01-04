"use client";
import Container from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Enterprise = () => {
  const t = useTranslations()

  useEffect(() => {
    document.title = t("enterPrise.enterprise");
  }, []);

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {t("enterPrise.businessContact")}
        </h1>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          {t("enterPrise.businessPartnership")}
        </span>
        <div className="flex space-x-1">
          <h1 className="text-green-600 font-semibold">
            {t("enterPrise.demandAndPotentialEvaluation")}: 
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {t("enterPrise.partnershipPreparation")}
          </span>
        </div>
        <div className="flex space-x-2">
          <h1 className="text-red-600 font-semibold">
            {t("enterPrise.additionalContactInfo")}: 
          </h1>
          <span className="text-red-500">0352261103</span>
        </div>
      </div>
    </Container>
  );
};

export default Enterprise;
