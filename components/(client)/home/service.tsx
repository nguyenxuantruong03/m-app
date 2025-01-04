"use client";
import { root } from "@/components/(client)/color/color";
import "./index.scss";
import HeadingEffect from "../uis-home/HeadingEffect";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useTranslations } from "next-intl";

const Service = () => {
  const t = useTranslations()

  const router = useRouter();
  const handleClickProduct = () => {
    router.push("/home-product");
  };
  return (
    <div className={`pb-20 ${root.bgwhite}`}>
      <Container>
        <div className="bg-service">
          <div className="w-full">
            <HeadingEffect heading={t("home.furnitureService")} />
          </div>
          <div className=" md:flex md:space-x-5 mt-20 md:justify-between">
            <div className=" w-[300px] h-[285px] text-center rotate-on-hover relative mx-auto">
              <div className="w-[100px] h-[100px] mx-auto">
                <Image
                  src="/images/apartment-icon.png"
                  className="rotate-on-hover-image"
                  alt="iamge"
                  width="300"
                  height="100"
                />
              </div>
              <p className="font-bold text-x text-slate-900">
                {t("home.project")}
              </p>
              <p className="text-slate-900">{t("home.bestPriceForContractor")}</p>
              <Button
                onClick={handleClickProduct}
                className="absolute bottom-7 md:bottom-0 left-[30%]"
              >
                {t("action.seeMore")}
              </Button>
            </div>
            <div className=" w-[300px] h-[285px] text-center rotate-on-hover relative mx-auto">
              <div className="w-[100px] h-[100px] mx-auto">
                <Image
                  src="/images/home-icon.png"
                  className="rotate-on-hover-image"
                  alt="iamge"
                  width="300"
                  height="100"
                />
              </div>
              <p className="font-bold text-xl text-slate-900">
                {t("home.housing")}
              </p>
              <p className="text-slate-900">{t("home.alwayProvideAccessories")}</p>
              <Button
                onClick={handleClickProduct}
                className="absolute bottom-7 md:bottom-0 left-[30%]"
              >
                {t("action.seeMore")}
              </Button>
            </div>
            <div className=" w-[300px] h-[285px] text-center rotate-on-hover relative mx-auto">
              <div className="w-[100px] h-[100px] mx-auto">
                <Image
                  src="/images/daydien-icon.png"
                  className="rotate-on-hover-image"
                  alt="iamge"
                  width="300"
                  height="100"
                />
              </div>
              <p className="font-bold text-xl text-slate-900">
                {t("home.electricWide")}
              </p>
              <p className="text-slate-900">{t("home.specializeInWires")}</p>
              <Button
                onClick={handleClickProduct}
                className="absolute bottom-7 md:bottom-0 left-[30%]"
              >
                {t("action.seeMore")}
              </Button>
            </div>
            <div className=" w-[300px] h-[285px] text-center rotate-on-hover relative mx-auto">
              <div className="w-[100px] h-[70px] mx-auto">
                <Image
                  src="/images/ongnhua-icon.png"
                  className=" mt-10 rotate-on-hover-image"
                  alt="iamge"
                  width="300"
                  height="100"
                />
              </div>
              <p className="font-bold text-xl text-slate-900">
                {t("home.plasticPipe")}
              </p>
              <p className="text-slate-900">{t("home.cooperateWithBinhMinh")}</p>
              <Button
                onClick={handleClickProduct}
                className="absolute bottom-7 md:bottom-0 left-[30%]"
              >
                {t("action.seeMore")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Service;
