import Modal from "@/components/ui/modal";
import { useTranslations } from "next-intl";

interface SeeDetailProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const SeeDetailModal: React.FC<SeeDetailProps> = ({
  isOpen,
  onClose,
  message,
  title,
}) => {
  const t = useTranslations()

  return (
    <Modal
      title={title || t("warranty.productProtection")}
      description={message || t("action.serviceSummary")}
      isOpen={isOpen}
      onClose={onClose}
      classNameCustom="max-h-[36rem] md:max-h-[55rem] xl:max-h-[40rem] overflow-y-auto"
    >
      <div>
        <h1 className="text-center font-bold text-2xl">
          {t("warranty.extendedServiceDetails")}
        </h1>

        <h2 className="font-bold">I. {t("warranty.VIPWarrantyUpperCase")}:</h2>
        <ul>
          <li>- {t("warranty.applicableProducts")}. </li>
          <li>- {t("warranty.warrantyPeriods")}.</li>
          <li>- {t("warranty.warrantyBenefitsAndServices")}: </li>
        </ul>

        <p>+ {t("warranty.oneToOneCheck")}.</p>
        <p>+ {t("warranty.equivalentProductExchange")}.</p>
        <ul>
          <li>- {t("warranty.warrantyCondition")}.</li>
          <li>- {t('warranty.warrantyNotice')}.</li>
          <li>- {t("warranty.processingTimes")} </li>
        </ul>

        <h2 className="font-bold">II {t("warranty.fallDamageUpperCase")}:</h2>
        <ul>
          <li>- {t("warranty.noWarranty")}.</li>
        </ul>

        <h2 className="font-bold">III {t("warranty.officialWarrantyFeeUpperCase")}</h2>
        <ul>
          <li>- {t("warranty.warrantyApplicable")}.</li>
          <li>- {t("warranty.warrantyTime")}</li>
        </ul>
        <p>+ {t("warranty.extendedWarranty")}.</p>
        <p>+ {t("warranty.exchangeForDefect")}.</p>
        <p>+ {t("warranty.tradeInDiscount")}.</p>
      </div>
    </Modal>
  );
};

export default SeeDetailModal;
