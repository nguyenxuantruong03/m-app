"use client";
import Container from "@/components/ui/container";
import Accessory from "./accessory";
import Accessory2 from "./accessory2";
import Accessory3 from "./accessory3";
import { suggestcolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";

const Suggest = () => {
  const t = useTranslations()

  return (
    <Container>
      <div className=" mt-3 md:mt-10">
        <p className={suggestcolor.textcolor}>{t("suggest.homegoods")}</p>
        <Accessory />
      </div>

      <div className="mt-3 md:mt-10">
        <p className={suggestcolor.textcolor}>{t("suggest.interior")}</p>
        <Accessory2 />
      </div>

      <div className="mt-3 md:mt-10">
        <p className={suggestcolor.textcolor}>{t("suggest.construction")}</p>
        <Accessory3 />
      </div>
    </Container>
  );
};

export default Suggest;
