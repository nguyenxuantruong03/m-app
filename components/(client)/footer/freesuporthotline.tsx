import Link from "next/link";
import { freeSupportHotlinecolor } from "@/components/(client)/color/color";
import {
  translateCallToComplaints,
  translateCallToOrder,
  translateCallToWarranty,
} from "@/translate/translate-client";

interface FreeSupportHotlineProps {
  languageToUse: string;
}
const FreeSupportHotline = ({ languageToUse }: FreeSupportHotlineProps) => {
  //languages
  const callToOrderMessage = translateCallToOrder(languageToUse);
  const callToComplaintMessage = translateCallToComplaints(languageToUse);
  const callToWarrantyMessage = translateCallToWarranty(languageToUse);

  return (
    <>
      <Link href="tel:0352261103">
        <div className={freeSupportHotlinecolor.text}>
          {callToOrderMessage}{" "}
          <span className={freeSupportHotlinecolor.textfont}>035.222.111</span>{" "}
          (7h30- 22h00)
        </div>
      </Link>
      <Link href="tel:0352261103">
        <div className={freeSupportHotlinecolor.text}>
          {callToComplaintMessage}{" "}
          <span className={freeSupportHotlinecolor.textfont}>035.222.333</span>{" "}
          (7h30- 22h00)
        </div>
      </Link>
      <Link href="tel:0352261103">
        <div className={freeSupportHotlinecolor.text}>
          {callToWarrantyMessage}{" "}
          <span className={freeSupportHotlinecolor.textfont}>035.222.444</span>{" "}
          (7h30- 22h00)
        </div>
      </Link>
    </>
  );
};

export default FreeSupportHotline;
