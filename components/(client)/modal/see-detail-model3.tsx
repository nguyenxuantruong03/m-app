import Modal from "@/components/ui/modal";
import { useTranslations } from "next-intl";

interface SeeDetail3Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const SeeDetail3Modal: React.FC<SeeDetail3Props> = ({
  isOpen,
  onClose,
  message,
  title,
}) => {
  const t = useTranslations()

  return (
    <Modal
      title={title || t("warranty.damagePolicy")}
      description={message || t("warranty.repairSupportProduct")}
      isOpen={isOpen}
      onClose={onClose}
      classNameCustom="max-h-[36rem] md:max-h-[55rem] xl:max-h-[40rem] overflow-y-auto"
    >
      <div className=" rounded-md">
        <h1 className=" bg-[#e5002d] rounded-md text-white font-bold p-2">
          {t("warranty.damagePolicy")}
        </h1>
        <p className="font-bold">{t("warranty.applicableProduct")}:</p>
        <p>+ {t("warranty.items")}.</p>
        <div className="flex">
          <p className="font-bold">{t("warranty.warrantyPeriod")}:</p>
          <p className="ml-2">{t("warranty.12Month")}</p>
        </div>
        <p className="font-bold">{t("warranty.warrantyBenefitsAndServices")}:</p>
        <p className="mt-3">+ {t("warranty.VIPWarrantyBenefit")}</p>
        <p>+ {t("warranty.unlimitedExchanges")}.</p>
        <p>+ {t("warranty.exchangeForIrreparable")}.</p>
        <p>+ {t("warranty.upgradeSupport")}.</p>
        <p>+ {t("warranty.warrantyFund")}.</p>

        <p className="font-bold">{t("warranty.warrantyConditions")}:</p>
        <p>+ {t("warranty.damageExclusions")}.</p>

        <p>{t("warranty.VIPWarrantyExclusions")}.</p>
        <p className="font-bold">{t("warranty.processingTime")}:</p>
        <p>+ {t('warranty.repairTimes')}.</p>
      </div>
    </Modal>
  );
};

export default SeeDetail3Modal;
