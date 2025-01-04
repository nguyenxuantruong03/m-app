import { useTranslations } from "next-intl";
import Link from "next/link";

const ServiceInfomation = () => {
  const t = useTranslations()

  return (
    <>
      <Link href="/enterprise">
        <div>{t("footer.corporateCustomer")}</div>
      </Link>
      <Link href="/guarantee">
        <div>{t("footer.warrantyPolicy")}</div>
      </Link>
    </>
  );
};

export default ServiceInfomation;
