import { AlertTriangle } from "lucide-react";
import Modal from "@/components/ui/modal";
import { useTranslations } from "next-intl";

interface SeePaymentWarningProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const SeePaymentWarningModal: React.FC<SeePaymentWarningProps> = ({
  isOpen,
  onClose,
  message,
  title,
}) => {
  const t = useTranslations()

  return (
    <Modal
      title={title || t("cart.onlinePaymentNotification")}
      description={message || `${t("cart.amountNotSufficient")}.`}
      isOpen={isOpen}
      onClose={onClose}
      classNameCustom="max-h-[36rem] md:max-h-[55rem] xl:max-h-[40rem] overflow-y-auto"
    >
      <div className="w-full">
        <div className=" bg-yellow-400 rounded-md font-bold p-2  ">
          <h1 className="flex items-center justify-center font-bold">
            {t("action.note")} <AlertTriangle className="w-5 h-5 ml-1" />
          </h1>
        </div>

        <p className="mt-4">
          {t("cart.amountTooLowContact")}
          <span className="text-red-400 font-semibold">0352261103</span>{" "}
          {t("cart.directPaymentConsulation")}.
        </p>
      </div>
    </Modal>
  );
};

export default SeePaymentWarningModal;
