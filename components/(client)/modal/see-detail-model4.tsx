import Modal from "@/components/ui/modal";
import { useTranslations } from "next-intl";

interface SeeDetail4Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const SeeDetail4Modal: React.FC<SeeDetail4Props> = ({
  isOpen,
  onClose,
  message,
  title,
}) => {
  const t = useTranslations()

  return (
    <Modal
      title={title || t("warranty.VIPExchange6Months")}
      description={message || t("warranty.exchangeNewProduct6Months")}
      isOpen={isOpen}
      onClose={onClose}
      classNameCustom="max-h-[36rem] md:max-h-[55rem] xl:max-h-[40rem] overflow-y-auto"
    >
      <div>
        <h1 className=" bg-[#e5002d] rounded-md text-white font-bold p-2">
          {t("warranty.VIPExchangePolicy")}
        </h1>
        <p className="font-bold">{t("warranty.applicableProduct")}:</p>
        <p>+ {t("warranty.items")}.</p>
        <div className="flex">
          <p className="font-bold">{t("warranty.warrantyPeriod")}:</p>
          <p className="ml-2">{t("warranty.6Month")}</p>
        </div>
        <p className="font-bold">{t("warranty.warrantyBenefitsAndServices")}:</p>
        <p className="mt-3">+ {t("warranty.testPolicy")}. </p>
        <p>+ {t("warranty.unlimitedWarrantyPolicy")}.</p>
        <p>+ {t("warranty.exchangeWarrantyProduct6Month")}.</p>
        <div className="flex mt-3">
          <p className="font-bold">{t("warranty.warrantyConditions")}:</p>
          <p className="ml-2">{t("warranty.manufacturerDefect")}.</p>
        </div>
        <p>{t("warranty.warrantyExclusionNote")}.</p>
        <p className="font-bold">{t("warranty.processingTime")}:</p>
        <p className="">+ {t("warranty.processing24hTime")}.</p>
      </div>
    </Modal>
  );
};

export default SeeDetail4Modal;
