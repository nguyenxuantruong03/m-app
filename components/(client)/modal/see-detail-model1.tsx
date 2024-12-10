import Modal from "@/components/ui/modal";
import {
  getProcessingTime,
  translateApplicableProduct,
  translateExchangeOrRepairPolicy,
  translateItems,
  translateRepairTime,
  translateS24Plus12Months,
  translateTime,
  translateTradeInOffer,
  translateWarranty,
  translateWarrantyBenefitsAndServices,
  translateWarrantyCenters,
  translateWarrantyConditions,
  translateWarrantyDefectPolicy,
  translateWarrantyDuration,
  translateWarrantyExtension,
  translateWarrantyIssue,
  translateWarrantyLocation,
  translateWarrantyNote,
} from "@/translate/translate-client";

interface SeeDetail1Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  languageToUse: string;
}

const SeeDetail1Modal: React.FC<SeeDetail1Props> = ({
  isOpen,
  onClose,
  message,
  title,
  languageToUse,
}) => {
  const s24Plus12MonthMessage = translateS24Plus12Months(languageToUse);
  const ExchangeOrRepairPolicyMessage =
    translateExchangeOrRepairPolicy(languageToUse);
  const warrantyDefectPolicyMessage =
    translateWarrantyDefectPolicy(languageToUse);
  const applocableProductMessage = translateApplicableProduct(languageToUse);
  const itemMessage = translateItems(languageToUse);
  const timeMessage = translateTime(languageToUse);
  const warrantyDurationMessage = translateWarrantyDuration(languageToUse);
  const warrantyBenefitsAndServicesMessage =
    translateWarrantyBenefitsAndServices(languageToUse);
  const warrantyMessage = translateWarranty(languageToUse);
  const warrantyExtensionMessage = translateWarrantyExtension(languageToUse);
  const tradeInOfferMessage = translateTradeInOffer(languageToUse);
  const warrantyCoditionMessage = translateWarrantyConditions(languageToUse);
  const warrantyIssueMessage = translateWarrantyIssue(languageToUse);
  const warrantyNoteMessage = translateWarrantyNote(languageToUse);
  const processingTimeMessage = getProcessingTime(languageToUse);
  const repairTimeMessage = translateRepairTime(languageToUse);
  const warrantyLocationMessage = translateWarrantyLocation(languageToUse);
  const warrantyCentersMessage = translateWarrantyCenters(languageToUse);

  return (
    <Modal
      title={title || s24Plus12MonthMessage}
      description={message || ExchangeOrRepairPolicyMessage}
      isOpen={isOpen}
      onClose={onClose}
      classNameCustom="max-h-[36rem] md:max-h-[55rem] xl:max-h-[40rem] overflow-y-auto"
    >
      <div>
        <h1 className=" bg-[#e5002d] rounded-md text-white font-bold p-2">
          {" "}
          {warrantyDefectPolicyMessage}
        </h1>
        <div className="flex">
          <p className="font-bold">{applocableProductMessage}:</p>
          <p className="ml-2">{itemMessage}.</p>
        </div>
        <div className="flex">
          <p className="font-bold">{timeMessage}: </p>
          <p className="ml-2">{warrantyDurationMessage}.</p>
        </div>
        <p className="font-bold">{warrantyBenefitsAndServicesMessage}:</p>
        <p className="mt-3">+ {warrantyMessage}. </p>
        <p>+ {warrantyExtensionMessage}.</p>
        <p>+ {tradeInOfferMessage}.</p>
        <div className="flex mt-3">
          <p className="font-bold w-48">{warrantyCoditionMessage}:</p>
          <p className="ml-0.5">{warrantyIssueMessage}</p>
        </div>
        <p>{warrantyNoteMessage}.</p>
        <p className="font-bold">{processingTimeMessage}:</p>
        <p className="">+ {repairTimeMessage}.</p>
        <p className="font-bold">{warrantyLocationMessage}:</p>
        <p className="">+ {warrantyCentersMessage}.</p>
      </div>
    </Modal>
  );
};

export default SeeDetail1Modal;
