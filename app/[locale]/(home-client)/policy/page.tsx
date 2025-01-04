"use client";
import Container from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Policy = () => {
  const t = useTranslations()

  useEffect(() => {
    document.title = t("policy.policy");
  }, []);

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {t("policy.orderPolicyAndLegality")}
        </h1>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          {t("policy.orderPolicyAndLegalityDetails")}
        </span>
        <div className="flex space-x-1">
          <h1 className="text-green-600 font-semibold">
            {t("policy.generalOrderRegulations")}:
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {t("policy.generalOrderRegulationsDetails")}
          </span>
        </div>
        <h1 className="text-red-600 font-semibold">
          {t("policy.pricingAndPaymentRegulations")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("policy.pricingAndPaymentDetails")}
        </span>
        <h1 className="text-red-600 font-semibold">
          {t("policy.returnAndExchangeRegulations")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("policy.orderConfirmation")}
        </span>
        <h1 className="text-red-600 font-semibold">
          {t("policy.informationSecurity")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("policy.personalInformationProtection")}
        </span>
        <h1 className="text-red-600 font-semibold">
          {t("policy.returnAndExchangePolicy")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("policy.returnExchangeRefundPolicy")}
        </span>
      </div>
    </Container>
  );
};

export default Policy;
