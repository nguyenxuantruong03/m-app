import {
  translateCorporateCustomer,
  translateWarrantyPolicy,
} from "@/translate/translate-client";
import Link from "next/link";

interface ServiceInfomationProps {
  languageToUse: string;
}

const ServiceInfomation = ({ languageToUse }: ServiceInfomationProps) => {
  //language
  const corporateCustomerMessage = translateCorporateCustomer(languageToUse);
  const warrantyPolicyMessage = translateWarrantyPolicy(languageToUse);

  return (
    <>
      <Link href="/enterprise">
        <div>{corporateCustomerMessage}</div>
      </Link>
      <Link href="/guarantee">
        <div>{warrantyPolicyMessage}</div>
      </Link>
    </>
  );
};

export default ServiceInfomation;
