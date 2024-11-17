import { AlertTriangle } from "lucide-react";
import Modal from "@/components/ui/modal";

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
  return (
    <Modal
      title={title || "Thông báo thanh toán online!"}
      description={message || "Số tiền không đáp ứng nhu cầu."}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full">
        <div className=" bg-yellow-400 rounded-md font-bold p-2  ">
          <h1 className="ml-[320px] flex items-center font-bold">
            Lưu ý <AlertTriangle className="w-5 h-5 ml-1" />{" "}
          </h1>
        </div>

        <p className="mt-4">
          Số tiền cần thanh toán của quý khách quá thấp để thanh toán,
          quý khách có thể liên hệ{" "}
          <span className="text-red-400 font-semibold">0352261103</span> tư vấn
          để được thanh toán trực tiếp.
        </p>
      </div>
    </Modal>
  );
};

export default SeePaymentWarningModal;
