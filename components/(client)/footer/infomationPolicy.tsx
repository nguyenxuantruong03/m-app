import {
  translateDiscountCode,
  translateOrderingPolicyAndLegalTerms,
  translatePreOrderAndPayOnDelivery,
  translatePurchaseAndPayOnline,
} from "@/translate/translate-client";
import Link from "next/link";

interface InformationPolicyProps {
  languageToUse: string;
}

const InformationPolicy = ({ languageToUse }: InformationPolicyProps) => {
  //language
  const purchaseAndPayOnlineMessage =
    translatePurchaseAndPayOnline(languageToUse);
  const preOrderAndPayOnDeliveryMessage =
    translatePreOrderAndPayOnDelivery(languageToUse);
  const orderingToPolicyandLegaltermsMesage =
    translateOrderingPolicyAndLegalTerms(languageToUse);
  const discountCodeMessage = translateDiscountCode(languageToUse);

  return (
    <>
      <Link href="/payment-online">
        <div>{purchaseAndPayOnlineMessage}</div>
      </Link>
      <Link href="/preorder">
        <div>{preOrderAndPayOnDeliveryMessage}</div>
      </Link>
      <Link href="/policy">
        <div>{orderingToPolicyandLegaltermsMesage}</div>
      </Link>
      <Link href="/promotional-code">
        <div>{discountCodeMessage}</div>
      </Link>
    </>
  );
};

export default InformationPolicy;
