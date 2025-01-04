"use client";
import Image from "next/image";
import Container from "@/components/ui/container";
import { root } from "@/components/(client)/color/color";
import HeadingEffect from "../uis-home/HeadingEffect";
import "./index.scss";
import { useTranslations } from "next-intl";

const Story = () => {
  const t = useTranslations()

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
              src="/images/coating.png"
              alt="image"
              width="471"
              height="606"
            />
          </div>

          <div className="p-5 xl:mt-20 mb-10">
            <HeadingEffect heading={t("home.infoStore")} />
            <span
              className="font-bold text-3xl text-[#ec2f4b]"
              id="cuahangtruongdat"
            >
              {t("home.store")} Trường Đạt
            </span>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-slate-200">
                {t("home.establishmentDate")}:
              </h2>
              <p className="text-slate-900 dark:text-slate-200">
                {t("home.storeHistory")}
              </p>
              <h2 className="font-bold text-slate-900 dark:text-slate-200">
                {t("home.specializeIn")}:
              </h2>
              <p className="text-slate-900 dark:text-slate-200">
                {t("home.specializeOnProduct")}
              </p>
              <h2 className="font-bold text-slate-900 dark:text-slate-200">
                {t("home.qualityCommitment")}:
              </h2>
              <p className="text-slate-900 dark:text-slate-200">
                {t("home.qualityCommitmentText")}
              </p>
              <div className="border-t-2 border-dashed border-gray-500 mt-10 mb-3" />
              <div className="flex">
                <p className="font-bold text-slate-900 dark:text-slate-200">
                  {t("info.address")}:
                </p>
                <p className="ml-2 text-slate-400">
                  457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân, TpHCM
                </p>
              </div>
              <div className="flex">
                <p className="font-bold text-slate-900 dark:text-slate-200">
                  {t("info.phoneNumber")}:
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
