"use client";
import { useEffect, useState } from "react";
import InfomationWebsite from "./InfomationWebsite";
import ConnectForme from "./connectForme";
import FreeSupportHotline from "./freesuporthotline";
import InformationPolicy from "./infomationPolicy";
import InformationCompanyFooter from "./infomationcompanyfooter";
import PaymentMethod from "./paymentMethod";
import ServiceInfomation from "./serviceInfomation";
import { footercolor, root } from "@/components/(client)/color/color";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  translateInfoAndPolicy,
  translateOtherContact,
  translatePaymentMethod,
  translatePersonalWebsite,
  translateServicesAndInfo,
  translateSupportExchange,
} from "@/translate/translate-client";

const Footer = () => {
  const user = useCurrentUser();

  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const supportExchangeMessage = translateSupportExchange(languageToUse);
  const paymentMethodMessage = translatePaymentMethod(languageToUse);
  const infoAndPolicyMessage = translateInfoAndPolicy(languageToUse);
  const serviceAndInfoMessage = translateServicesAndInfo(languageToUse);
  const personalWebsiteMessage = translatePersonalWebsite(languageToUse);
  const otherContactMessage = translateOtherContact(languageToUse);

  return (
    <>
      <div
        className={`border-t border-gray-500 pb-0.5 ${root.bgwhite}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="md:grid md:grid-cols-4 md:mt-4">
            <div>
              <p className={footercolor.textml}>{supportExchangeMessage}</p>
              <div className="grid grid-rows-3 m-2 space-y-1 ">
                <FreeSupportHotline languageToUse={languageToUse} />
              </div>
              <p className={footercolor.textml}>{paymentMethodMessage}</p>
              <div>
                <div className="grid grid-cols-4 m-2 text-sm md:gap-14 lg:gap-0">
                  <PaymentMethod />
                </div>
              </div>
            </div>
            <div>
              <p className={footercolor.text}>{infoAndPolicyMessage}</p>
              <div className={footercolor.gridrows10}>
                <InformationPolicy languageToUse={languageToUse} />
              </div>
            </div>
            <div>
              <p className={footercolor.textml}>{serviceAndInfoMessage}</p>
              <div className={footercolor.gridrows8}>
                <ServiceInfomation languageToUse={languageToUse} />
              </div>
            </div>

            <div>
              <p className={footercolor.text}>{personalWebsiteMessage}</p>
              <div className={footercolor.gridrows3}>
                <InfomationWebsite languageToUse={languageToUse} />
              </div>
              <p className={footercolor.textmt}>{otherContactMessage}</p>
              <div className={footercolor.gridcols5}>
                <ConnectForme />
              </div>
            </div>
          </div>
        </div>

        <div className={root.bgwhite}>
          <div className="md:max-w-3xl lg:max-w-7xl mx-auto">
            <footer>
              <div className="m-2 space-y-1 text-[11px]">
                <InformationCompanyFooter languageToUse={languageToUse} />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
