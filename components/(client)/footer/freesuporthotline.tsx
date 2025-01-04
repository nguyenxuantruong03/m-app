import Link from "next/link";
import { freeSupportHotlinecolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";

const FreeSupportHotline = () => {
  const t = useTranslations()

  return (
    <>
      <Link href="tel:0352261103">
        <div className={freeSupportHotlinecolor.text}>
          {t("footer.callToOrder")}{" "}
          <span className={freeSupportHotlinecolor.textfont}>035.222.111</span>{" "}
          (7h30- 22h00)
        </div>
      </Link>
      <Link href="tel:0352261103">
        <div className={freeSupportHotlinecolor.text}>
          {t("footer.callToComplaint")}{" "}
          <span className={freeSupportHotlinecolor.textfont}>035.222.333</span>{" "}
          (7h30- 22h00)
        </div>
      </Link>
      <Link href="tel:0352261103">
        <div className={freeSupportHotlinecolor.text}>
          {t("footer.callToWarranty")}{" "}
          <span className={freeSupportHotlinecolor.textfont}>035.222.444</span>{" "}
          (7h30- 22h00)
        </div>
      </Link>
    </>
  );
};

export default FreeSupportHotline;
