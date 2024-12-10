import Modal from "@/components/ui/modal";
import {
  translateApplicableProducts,
  translateEquivalentProductExchange,
  translateExchangeForDefect,
  translateExtendedServiceDetails,
  translateExtendedWarranty,
  translateFallDamageUpperCase,
  translateNoWarranty,
  translateOfficialWarrantyFeeUpperCase,
  translateOneToOneCheck,
  translateProcessingTimes,
  translateProductProtection,
  translateServiceSummary,
  translateTradeInDiscount,
  translateVIPWarrantyUpperCase,
  translateWarrantyApplicable,
  translateWarrantyBenefitsAndServices,
  translateWarrantyCondition,
  translateWarrantyNotice,
  translateWarrantyPeriods,
  translateWarrantyTime,
} from "@/translate/translate-client";

interface SeeDetailProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  languageToUse: string;
}

const SeeDetailModal: React.FC<SeeDetailProps> = ({
  isOpen,
  onClose,
  message,
  title,
  languageToUse,
}) => {
  //language
  const productProtectionMessage = translateProductProtection(languageToUse);
  const serviceSummaryMessage = translateServiceSummary(languageToUse);
  const extendedServiceDetailMessage =
    translateExtendedServiceDetails(languageToUse);
  const VIPWarranty = translateVIPWarrantyUpperCase(languageToUse);
  const applicableProductMessage = translateApplicableProducts(languageToUse);
  const warrantyPeriodMessage = translateWarrantyPeriods(languageToUse);
  const warrantyBenefitAndServiceMessage =
    translateWarrantyBenefitsAndServices(languageToUse);
  const onetoOneCheckMessage = translateOneToOneCheck(languageToUse);
  const EquivalentProductExchangeMessage =
    translateEquivalentProductExchange(languageToUse);
  const warrantyConditionMessage = translateWarrantyCondition(languageToUse);
  const warrantyNoticeMessage = translateWarrantyNotice(languageToUse);
  const processingTimeMessage = translateProcessingTimes(languageToUse);
  const fallDamegeUpperCaseMessage =
    translateFallDamageUpperCase(languageToUse);
  const noWarrantyMessage = translateNoWarranty(languageToUse);
  const officiaWarrantyFeedUpperCaseMessage =
    translateOfficialWarrantyFeeUpperCase(languageToUse);
  const translateWarrantyApplicableMessage =
    translateWarrantyApplicable(languageToUse);
  const warrantyTimeMessage = translateWarrantyTime(languageToUse);
  const ExtendedWarrantyMessage = translateExtendedWarranty(languageToUse);
  const ExchangeForDefectMessage = translateExchangeForDefect(languageToUse);
  const tradeInDiscountMessage = translateTradeInDiscount(languageToUse);

  return (
    <Modal
      title={title || productProtectionMessage}
      description={message || serviceSummaryMessage}
      isOpen={isOpen}
      onClose={onClose}
      classNameCustom="max-h-[36rem] md:max-h-[55rem] xl:max-h-[40rem] overflow-y-auto"
    >
      <div>
        <h1 className="text-center font-bold text-2xl">
          {extendedServiceDetailMessage}
        </h1>

        <h2 className="font-bold">I. {VIPWarranty}:</h2>
        <ul>
          <li>- {applicableProductMessage}. </li>
          <li>- {warrantyPeriodMessage}.</li>
          <li>- {warrantyBenefitAndServiceMessage}: </li>
        </ul>

        <p>+ {onetoOneCheckMessage}.</p>
        <p>+ {EquivalentProductExchangeMessage}.</p>
        <ul>
          <li>- {warrantyConditionMessage}.</li>
          <li>- {warrantyNoticeMessage}.</li>
          <li>- {processingTimeMessage} </li>
        </ul>

        <h2 className="font-bold">II {fallDamegeUpperCaseMessage}:</h2>
        <ul>
          <li>- {noWarrantyMessage}.</li>
        </ul>

        <h2 className="font-bold">III {officiaWarrantyFeedUpperCaseMessage}</h2>
        <ul>
          <li>- {translateWarrantyApplicableMessage}.</li>
          <li>- {warrantyTimeMessage}</li>
        </ul>
        <p>+ {ExtendedWarrantyMessage}.</p>
        <p>+ {ExchangeForDefectMessage}.</p>
        <p>+ {tradeInDiscountMessage}.</p>
      </div>
    </Modal>
  );
};

export default SeeDetailModal;
