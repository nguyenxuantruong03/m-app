"use client";
import { useTranslations } from "next-intl";
import InfomationWebsite from "./InfomationWebsite";
import ConnectForme from "./connectForme";
import FreeSupportHotline from "./freesuporthotline";
import InformationPolicy from "./infomationPolicy";
import InformationCompanyFooter from "./infomationcompanyfooter";
import PaymentMethod from "./paymentMethod";
import ServiceInfomation from "./serviceInfomation";
import { footercolor, root } from "@/components/(client)/color/color";

const Footer = () => {
  const t = useTranslations()

  return (
    <>
      <div
        className={`border-t border-gray-500 pb-0.5 ${root.bgwhite}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="md:grid md:grid-cols-4 md:mt-4">
            <div>
              <p className={footercolor.textml}>{t("footer.supportExchange")}</p>
              <div className="grid grid-rows-3 m-2 space-y-1 ">
                <FreeSupportHotline />
              </div>
              <p className={footercolor.textml}>{t("footer.paymentMethod")}:</p>
              <div>
                <div className="grid grid-cols-4 m-2 text-sm md:gap-14 lg:gap-0">
                  <PaymentMethod />
                </div>
              </div>
            </div>
            <div>
              <p className={footercolor.text}>{t("footer.infoAndPolicy")}</p>
              <div className={footercolor.gridrows10}>
                <InformationPolicy />
              </div>
            </div>
            <div>
              <p className={footercolor.textml}>{t("footer.serviceAndInfo")}</p>
              <div className={footercolor.gridrows8}>
                <ServiceInfomation />
              </div>
            </div>

            <div>
              <p className={footercolor.text}>{t("footer.personalWebsite")}</p>
              <div className={footercolor.gridrows3}>
                <InfomationWebsite />
              </div>
              <p className={footercolor.textmt}>{t("footer.otherContact")}</p>
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
                <InformationCompanyFooter />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
