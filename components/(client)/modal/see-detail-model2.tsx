import Modal from "@/components/ui/modal";
import {
  getProcessingTime,
  translate12Months,
  translateApplicableProduct,
  translateApplicableProducts,
  translateExchangePolicy,
  translateExchangeWarrantyProduct,
  translateFullExchangePolicy,
  translateManufacturerDefect,
  translateNotWarrantyNote,
  translateProcessingTime,
  translateVIPExchange,
  translateVIPExchangePolicy,
  translateWarrantyBenefitsAndServices,
  translateWarrantyConditions,
  translateWarrantyPeriod,
} from "@/translate/translate-client";

interface SeeDetail2Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  languageToUse: string;
}

const SeeDetail2Modal: React.FC<SeeDetail2Props> = ({
  isOpen,
  onClose,
  message,
  title,
  languageToUse,
}) => {
  const VIPExchangeMessage = translateVIPExchange(languageToUse);
  const exchangePolicyMessage = translateExchangePolicy(languageToUse);
  const VIPExchangePolicyMessage = translateVIPExchangePolicy(languageToUse);
  const applicableProductMessage = translateApplicableProduct(languageToUse);
  const applicableProductsMessage = translateApplicableProducts(languageToUse);
  const warrantyPeriodMessage = translateWarrantyPeriod(languageToUse);
  const month12Message = translate12Months(languageToUse);
  const warrantyBenefitAndServiceMessage =
    translateWarrantyBenefitsAndServices(languageToUse);
  const fullExchangePolicyMessage = translateFullExchangePolicy(languageToUse);
  const exchangeWarrantyProductMessage =
    translateExchangeWarrantyProduct(languageToUse);
  const warrantyConditionMessage = translateWarrantyConditions(languageToUse);
  const ManufacturerDefectMessage = translateManufacturerDefect(languageToUse);
  const notWarrantyNoteMessage = translateNotWarrantyNote(languageToUse);
  const processingTimeMessage = getProcessingTime(languageToUse);
  const processingTimeMessages = translateProcessingTime(languageToUse);

  return (
    <Modal
      title={title || VIPExchangeMessage}
      description={message || exchangePolicyMessage}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <h1 className=" bg-[#e5002d] rounded-md text-white font-bold p-2">
          {" "}
          {VIPExchangePolicyMessage}
        </h1>
        <p className="font-bold">{applicableProductMessage}:</p>
        <p>+ {applicableProductsMessage}.</p>
        <div className="flex">
          <p className="font-bold">{warrantyPeriodMessage}:</p>
          <p className="ml-2">{month12Message}</p>
        </div>
        <p className="font-bold">{warrantyBenefitAndServiceMessage}:</p>
        <p className="mt-3">+ {fullExchangePolicyMessage}. </p>
        <p>+ {exchangeWarrantyProductMessage}.</p>
        <div className="flex mt-3">
          <p className="font-bold">{warrantyConditionMessage}:</p>
          <p className="ml-2">{ManufacturerDefectMessage}.</p>
        </div>
        <p>{notWarrantyNoteMessage}.</p>
        <p className="font-bold"> {processingTimeMessage}:</p>
        <p className="">+ {processingTimeMessages}.</p>
      </div>
    </Modal>
  );
};

export default SeeDetail2Modal;
