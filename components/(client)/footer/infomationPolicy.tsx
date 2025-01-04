import { useTranslations } from "next-intl";
import Link from "next/link";

const InformationPolicy = () => {
  const t = useTranslations()

  return (
    <>
      <Link href="/payment-online">
        <div>{t("footer.purchaseAndPayOnline")}</div>
      </Link>
      <Link href="/preorder">
        <div>{t("footer.preOrderAndPayOnDelivery")}</div>
      </Link>
      <Link href="/policy">
        <div>{t("footer.orderingToPolicyandLegalterms")}</div>
      </Link>
      <Link href="/promotional-code">
        <div>{t("footer.discountCode")}</div>
      </Link>
    </>
  );
};

export default InformationPolicy;
