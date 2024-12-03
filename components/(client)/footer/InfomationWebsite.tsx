import { InfomationWebsitecolor } from "@/components/(client)/color/color";
import {
  translateContact,
  translateOrZalo,
  translateWebsiteBelongsToXuanTruong,
} from "@/translate/translate-client";
import Link from "next/link";

interface InfomationWebsiteProps {
  languageToUse: string;
}

const InfomationWebsite = ({ languageToUse }: InfomationWebsiteProps) => {
  //language
  const websiteBelongsToXuanTruongMessage =
    translateWebsiteBelongsToXuanTruong(languageToUse);
  const contactMessage = translateContact(languageToUse);
  const orZaloMessage = translateOrZalo(languageToUse);

  return (
    <>
      <div>{websiteBelongsToXuanTruongMessage}</div>
      <div>
        {contactMessage}{" "}
        <span className={InfomationWebsitecolor.textfont}>
          <Link href="tel:0352261103">035.261.103</Link>
        </span>
      </div>
      <div>
        {orZaloMessage}{" "}
        <span className={InfomationWebsitecolor.textfont}>
          <Link href="tel:0352261103">035.261.103</Link>
        </span>{" "}
        (7h00-21h00)
      </div>
    </>
  );
};

export default InfomationWebsite;
