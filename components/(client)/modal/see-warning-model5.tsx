import { AlertTriangle } from "lucide-react";
import Modal from "@/components/ui/modal";
import {
  translateAmountNotSufficient,
  translateAmountTooLow,
  translateDirectPaymentConsultation,
  translateNote,
  translateOnlinePaymentNotification,
} from "@/translate/translate-client";

interface SeePaymentWarningProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  languageToUse: string;
}

const SeePaymentWarningModal: React.FC<SeePaymentWarningProps> = ({
  isOpen,
  onClose,
  message,
  title,
  languageToUse,
}) => {
  const onlinePaymentNotificationMessage =
    translateOnlinePaymentNotification(languageToUse);
  const amountNotSufficientMessage =
    translateAmountNotSufficient(languageToUse);
  const noteMessage = translateNote(languageToUse);
  const amountTooLowMessage = translateAmountTooLow(languageToUse);
  const directPaymentConsultationMessage =
    translateDirectPaymentConsultation(languageToUse);

  return (
    <Modal
      title={title || onlinePaymentNotificationMessage}
      description={message || `${amountNotSufficientMessage}.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full">
        <div className=" bg-yellow-400 rounded-md font-bold p-2  ">
          <h1 className="flex items-center justify-center font-bold">
            {noteMessage} <AlertTriangle className="w-5 h-5 ml-1" />
          </h1>
        </div>

        <p className="mt-4">
          {amountTooLowMessage}
          <span className="text-red-400 font-semibold">0352261103</span>{" "}
          {directPaymentConsultationMessage}.
        </p>
      </div>
    </Modal>
  );
};

export default SeePaymentWarningModal;
