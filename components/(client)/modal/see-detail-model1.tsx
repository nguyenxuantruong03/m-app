import Modal from "@/components/ui/modal";
import { useTranslations } from "next-intl";

interface SeeDetail1Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const SeeDetail1Modal: React.FC<SeeDetail1Props> = ({
  isOpen,
  onClose,
  message,
  title,
}) => {
  const t = useTranslations()

  return (
    <Modal
      title={title || t("warranty.S24Plus12Months")}
      description={message || t("warranty.warrantyExchange")}
      isOpen={isOpen}
      onClose={onClose}
      classNameCustom="max-h-[36rem] md:max-h-[55rem] xl:max-h-[40rem] overflow-y-auto"
    >
      <div>
        <h1 className=" bg-[#e5002d] rounded-md text-white font-bold p-2">
          {t("warranty.warrantyDefectPolicy")}
        </h1>
        <div className="flex">
          <p className="font-bold">{t("warranty.applicableProduct")}:</p>
          <p className="ml-2">{t("warranty.items")}.</p>
        </div>
        <div className="flex">
          <p className="font-bold">{t("warranty.time")}: </p>
          <p className="ml-2">{t("warranty.warrantyDuration")}.</p>
        </div>
        <p className="font-bold">{t("warranty.warrantyBenefitsAndServices")}:</p>
        <p className="mt-3">+ {t("warranty.warranty")}. </p>
        <p>+ {t("warranty.warrantyExtension")}.</p>
        <p>+ {t("warranty.tradeInOffer")}.</p>
        <div className="flex mt-3">
          <p className="font-bold w-48">{t("warranty.warrantyConditions")}:</p>
          <p className="ml-0.5">{t("warranty.warrantyIssue")}</p>
        </div>
        <p>{t("warranty.warrantyNote")}.</p>
        <p className="font-bold">{t("warranty.processingTime")}:</p>
        <p className="">+ {t("warranty.repairTime")}.</p>
        <p className="font-bold">{t("warranty.warrantyLocation")}:</p>
        <p className="">+ {t("warranty.warrantyCenters")}.</p>
      </div>
    </Modal>
  );
};

export default SeeDetail1Modal;
