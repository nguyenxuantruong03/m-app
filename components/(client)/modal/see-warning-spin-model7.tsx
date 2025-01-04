import { AlertTriangle } from "lucide-react";
import Modal from "@/components/ui/modal";
import { useTranslations } from "next-intl";

interface SeeWarningSpinModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const SeeWarningSpinModal: React.FC<SeeWarningSpinModalProps> = ({
  isOpen,
  onClose,
  message,
  title,
}) => {
  const t = useTranslations()

  return (
    <Modal
      title={title || t("spinLucky.luckyWheelNotification")}
      description={message || t("spinLucky.insufficientSpin")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full">
        <div className=" bg-yellow-400 rounded-md font-bold p-2  ">
          <h1 className="flex items-center justify-center font-bold">
            {t("action.note")} <AlertTriangle className="w-5 h-5 ml-1" />
          </h1>
        </div>

        <p className="mt-4">{t("spinLucky.insufficientSpinDetail")}</p>
      </div>
    </Modal>
  );
};

export default SeeWarningSpinModal;
