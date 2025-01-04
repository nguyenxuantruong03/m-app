import { InfomationWebsitecolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";
import Link from "next/link";


const InfomationWebsite = () => {
  const t = useTranslations()
  return (
    <>
      <div>{t("footer.websiteBelongsToXuanTruong")}</div>
      <div>
        {t("footer.contact")}{" "}
        <span className={InfomationWebsitecolor.textfont}>
          <Link href="tel:0352261103">035.261.103</Link>
        </span>
      </div>
      <div>
        {t("footer.orZalo")}{" "}
        <span className={InfomationWebsitecolor.textfont}>
          <Link href="tel:0352261103">035.261.103</Link>
        </span>{" "}
        (7h00-21h00)
      </div>
    </>
  );
};

export default InfomationWebsite;
