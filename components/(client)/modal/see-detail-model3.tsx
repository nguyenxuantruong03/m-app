import Modal from "@/components/ui/modal";
import {
  getProcessingTime,
  translate12Months,
  translateApplicableProduct,
  translateDamageExclusions,
  translateDamagePolicy,
  translateExchangeForIrreparable,
  translateItems,
  translateRepairTimes,
  translateSupportPolicy,
  translateUnlimitedExchanges,
  translateUpgradeSupport,
  translateVipWarrantyBenefits,
  translateVipWarrantyExclusions,
  translateWarrantyBenefitsAndServices,
  translateWarrantyConditions,
  translateWarrantyFund,
  translateWarrantyPeriod,
} from "@/translate/translate-client";

interface SeeDetail3Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  languageToUse: string;
}

const SeeDetail3Modal: React.FC<SeeDetail3Props> = ({
  isOpen,
  onClose,
  message,
  title,
  languageToUse,
}) => {
  //languages
  const damagePolicyMessage = translateDamagePolicy(languageToUse);
  const supportPolicyMessage = translateSupportPolicy(languageToUse);
  const applicableProductMessage = translateApplicableProduct(languageToUse);
  const itemsMessage = translateItems(languageToUse);
  const warrantyPeriodMessage = translateWarrantyPeriod(languageToUse);
  const month12Message = translate12Months(languageToUse);
  const warrantyBenefitAndServiceMessage =
    translateWarrantyBenefitsAndServices(languageToUse);
  const VIPWarrantyBenefitMessage = translateVipWarrantyBenefits(languageToUse);
  const unLimitedExchangesMessage = translateUnlimitedExchanges(languageToUse);
  const exchangedForIrreparableMessage =
    translateExchangeForIrreparable(languageToUse);
  const upgradeSupportMessage = translateUpgradeSupport(languageToUse);
  const warrantyFundMessage = translateWarrantyFund(languageToUse);
  const damageExcluesionMessage = translateDamageExclusions(languageToUse);
  const VIPWarrantyExclusionMessage =
    translateVipWarrantyExclusions(languageToUse);
  const warrantyConditionMessage = translateWarrantyConditions(languageToUse);
  const processingTimeMessage = getProcessingTime(languageToUse);
  const repairTimeMessage = translateRepairTimes(languageToUse);

  return (
    <Modal
      title={title || damagePolicyMessage}
      description={message || supportPolicyMessage}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className=" rounded-md">
        <h1 className=" bg-[#e5002d] rounded-md text-white font-bold p-2">
          {damagePolicyMessage}
        </h1>
        <p className="font-bold">{applicableProductMessage}:</p>
        <p>+ {itemsMessage}.</p>
        <div className="flex">
          <p className="font-bold">{warrantyPeriodMessage}:</p>
          <p className="ml-2">{month12Message}</p>
        </div>
        <p className="font-bold">{warrantyBenefitAndServiceMessage}:</p>
        <p className="mt-3">+ {VIPWarrantyBenefitMessage}</p>
        <p>+ {unLimitedExchangesMessage}.</p>
        <p>+ {exchangedForIrreparableMessage}.</p>
        <p>+ {upgradeSupportMessage}.</p>
        <p>+ {warrantyFundMessage}.</p>

        <p className="font-bold">{warrantyConditionMessage}:</p>
        <p>+ {damageExcluesionMessage}.</p>

        <p>{VIPWarrantyExclusionMessage}.</p>
        <p className="font-bold">{processingTimeMessage}:</p>
        <p>+ {repairTimeMessage}.</p>
      </div>
    </Modal>
  );
};

export default SeeDetail3Modal;
