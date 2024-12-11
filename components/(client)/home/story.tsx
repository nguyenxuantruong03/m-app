"use client";
import Image from "next/image";
import Container from "@/components/ui/container";
import { root } from "@/components/(client)/color/color";
import HeadingEffect from "../uis-home/HeadingEffect";
import "./index.scss";
import {
  getAddressMessage,
  getPhoneNumberMessage,
  translateEstablishmentDate,
  translateQualityCommitment,
  translateQualityCommitmentText,
  translateSpecializeIn,
  translateSpecializeInProducts,
  translateStore,
  translateStoreHistory,
  translateStoreInfo,
} from "@/translate/translate-client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

const Story = () => {
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
  const storeMessage = translateStore(languageToUse);
  const storeInfoMessage = translateStoreInfo(languageToUse);
  const establishmentDateMessage = translateEstablishmentDate(languageToUse);
  const storeHistoryMessage = translateStoreHistory(languageToUse);
  const specializeInMessage = translateSpecializeIn(languageToUse);
  const specializeOnProductMessage =
    translateSpecializeInProducts(languageToUse);
  const qualityCommitmentMessage = translateQualityCommitment(languageToUse);
  const qualityCommitmentTextMessage =
    translateQualityCommitmentText(languageToUse);
  const addressMessage = getAddressMessage(languageToUse);
  const phoneNumberMessage = getPhoneNumberMessage(languageToUse);

  return (
    <div className={root.bgwhite}>
      <Container>
        <div className="mx:auto xl:grid xl:grid-cols-2 ">
          <div className="my-2 md:mt-20 mb-10 relative">
            <Image
              className="hidden xl:block bg-cover bg-center relative z-10 ml-24 "
              src="/images/vlxd.webp"
              alt="image"
              width="471"
              height="606"
            />
            <Image
              className="hidden xl:block -top-10 left-10 z-0 absolute "
              src="/images/coating.webp"
              alt="image"
              width="471"
              height="606"
            />
          </div>

          <div className="p-5 xl:mt-20 mb-10">
            <HeadingEffect heading={storeInfoMessage} />
            <span
              className="font-bold text-3xl text-[#ec2f4b]"
              id="cuahangtruongdat"
            >
              {storeMessage} Trường Đạt
            </span>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-slate-200">
                {establishmentDateMessage}:
              </h2>
              <p className="text-slate-900 dark:text-slate-200">
                {storeHistoryMessage}
              </p>
              <h2 className="font-bold text-slate-900 dark:text-slate-200">
                {specializeInMessage}:
              </h2>
              <p className="text-slate-900 dark:text-slate-200">
                {specializeOnProductMessage}
              </p>
              <h2 className="font-bold text-slate-900 dark:text-slate-200">
                {qualityCommitmentMessage}:
              </h2>
              <p className="text-slate-900 dark:text-slate-200">
                {qualityCommitmentTextMessage}
              </p>
              <div className="border-t-2 border-dashed border-gray-500 mt-10 mb-3" />
              <div className="flex">
                <p className="font-bold text-slate-900 dark:text-slate-200">
                  {addressMessage}:
                </p>
                <p className="ml-2 text-slate-400">
                  457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân, TpHCM
                </p>
              </div>
              <div className="flex">
                <p className="font-bold text-slate-900 dark:text-slate-200">
                  {phoneNumberMessage}:
                </p>
                <p className="ml-2 text-slate-400">0352261103</p>
              </div>
              <div className="flex">
                <p className="font-bold text-slate-900 dark:text-slate-200">
                  Email:
                </p>
                <p className="ml-2 text-slate-400">nxt159753@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Story;
