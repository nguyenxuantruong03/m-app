"use client";
import Container from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Guarantee = () => {
  const t = useTranslations()

  useEffect(() => {
    document.title = t("guarantee.guarantee")
  }, []);

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {t("guarantee.policy")}
        </h1>
        <div className="flex space-x-1">
          <h1 className="text-green-600 font-semibold">
            {t("guarantee.period")}:
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {t("guarantee.description")}
          </span>
        </div>
        <h1 className="text-red-600 font-semibold">
          {t("guarantee.content")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("guarantee.policyDetails")}
        </span>
        <h1 className="text-red-600 font-semibold">
          {t("guarantee.submissionMethod")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("guarantee.process")}
        </span>
        <h1 className="text-red-600 font-semibold">
          {" "}
          {t("guarantee.fee")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("guarantee.feeDetail")}
        </span>
        <h1 className="text-red-600 font-semibold">
          {t("guarantee.support")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("guarantee.supportDetails")}
        </span>
        <h1 className="text-red-600 font-semibold">
          {t("guarantee.consumerRights")}:
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {t("guarantee.consumerRightsDetails")}
        </span>
      </div>
    </Container>
  );
};

export default Guarantee;
