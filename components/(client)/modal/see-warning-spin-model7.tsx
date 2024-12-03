import { AlertTriangle } from "lucide-react";
import Modal from "@/components/ui/modal";
import {
  translateInsufficientSpins,
  translateInsufficientSpinsDetails,
  translateLuckyWheelNotification,
  translateNote,
} from "@/translate/translate-client";

interface SeeWarningSpinModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  languageToUse: string;
}

const SeeWarningSpinModal: React.FC<SeeWarningSpinModalProps> = ({
  isOpen,
  onClose,
  message,
  title,
  languageToUse,
}) => {
  //languages
  const luckyWheelNotificationMessage =
    translateLuckyWheelNotification(languageToUse);
  const insufficientSpinMessage = translateInsufficientSpins(languageToUse);
  const noteMessage = translateNote(languageToUse);
  const insufficientSpinDetailMessage =
    translateInsufficientSpinsDetails(languageToUse);

  return (
    <Modal
      title={title || luckyWheelNotificationMessage}
      description={message || insufficientSpinMessage}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full">
        <div className=" bg-yellow-400 rounded-md font-bold p-2  ">
          <h1 className="flex items-center justify-center font-bold">
            {noteMessage} <AlertTriangle className="w-5 h-5 ml-1" />
          </h1>
        </div>

        <p className="mt-4">{insufficientSpinDetailMessage}</p>
      </div>
    </Modal>
  );
};

export default SeeWarningSpinModal;
