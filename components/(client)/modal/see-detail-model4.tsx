import Modal from "@/components/ui/modal";
import {
  getProcessingTime,
  translate6Months,
  translateApplicableProduct,
  translateExchangePolicy6Month,
  translateExchangeWarrantyProduct6Month,
  translateItems,
  translateManufacturerDefect,
  translateProcessingTime,
  translateTestPolicy,
  translateUnlimitedWarrantyPolicy,
  translateVIPExchange6Months,
  translateVIPExchangePolicy,
  translateWarrantyBenefitsAndServices,
  translateWarrantyConditions,
  translateWarrantyExclusionNote,
  translateWarrantyPeriod,
} from "@/translate/translate-client";

interface SeeDetail4Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  languageToUse: string;
}

const SeeDetail4Modal: React.FC<SeeDetail4Props> = ({
  isOpen,
  onClose,
  message,
  title,
  languageToUse,
}) => {
  //languages
  const VIPExchange6MonthMessage = translateVIPExchange6Months(languageToUse);
  const exchangePolocy6MonthMessage =
    translateExchangePolicy6Month(languageToUse);
  const VIPExchangePolicyMessage = translateVIPExchangePolicy(languageToUse);
  const applicableProductMessage = translateApplicableProduct(languageToUse);
  const itemMessage = translateItems(languageToUse);
  const warrantyPeriodMessage = translateWarrantyPeriod(languageToUse);
  const month6Message = translate6Months(languageToUse);
  const warrantyBenifitAndServiceMessage =
    translateWarrantyBenefitsAndServices(languageToUse);
  const testPolicyMessage = translateTestPolicy(languageToUse);
  const unlimitedWarrantyPolicyMessage =
    translateUnlimitedWarrantyPolicy(languageToUse);
  const exchangewarrantyProduct6MonthMessage =
    translateExchangeWarrantyProduct6Month(languageToUse);
  const warrantyCoditionMessage = translateWarrantyConditions(languageToUse);
  const manufactureDefectMessage = translateManufacturerDefect(languageToUse);
  const warrantyExclusionNoteMessage =
    translateWarrantyExclusionNote(languageToUse);
  const processingTimeMessage = getProcessingTime(languageToUse);
  const processingTimesmessage = translateProcessingTime(languageToUse);

  return (
    <Modal
      title={title || VIPExchange6MonthMessage}
      description={message || exchangePolocy6MonthMessage}
      isOpen={isOpen}
      onClose={onClose}
      classNameCustom="max-h-[36rem] md:max-h-[55rem] xl:max-h-[40rem] overflow-y-auto"
    >
      <div>
        <h1 className=" bg-[#e5002d] rounded-md text-white font-bold p-2">
          {VIPExchangePolicyMessage}
        </h1>
        <p className="font-bold">{applicableProductMessage}:</p>
        <p>+ {itemMessage}.</p>
        <div className="flex">
          <p className="font-bold">{warrantyPeriodMessage}:</p>
          <p className="ml-2">{month6Message}</p>
        </div>
        <p className="font-bold">{warrantyBenifitAndServiceMessage}:</p>
        <p className="mt-3">+ {testPolicyMessage}. </p>
        <p>+ {unlimitedWarrantyPolicyMessage}.</p>
        <p>+ {exchangewarrantyProduct6MonthMessage}.</p>
        <div className="flex mt-3">
          <p className="font-bold">{warrantyCoditionMessage}:</p>
          <p className="ml-2">{manufactureDefectMessage}.</p>
        </div>
        <p>{warrantyExclusionNoteMessage}.</p>
        <p className="font-bold">{processingTimeMessage}:</p>
        <p className="">+ {processingTimesmessage}.</p>
      </div>
    </Modal>
  );
};

export default SeeDetail4Modal;
