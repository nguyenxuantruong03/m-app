import Link from "next/link";
import { relatedTagLaptopcolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";


const RelatedTagBongden = () => {
  const t = useTranslations()

  return (
    <div className=" my-2 relative">
      <div className="absolute hidden md:flex bottom-4 md:left-[12.3rem] xl:left-[37.4rem] space-x-4 ">
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/dienquang40w">
            {t("relatedTag.dien_quang_bulb_40w")}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/denbanhocledrangdong">
            {t("relatedTag.study_table")}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/denledmpe40w">
            {t("relatedTag.mpe_bulb_40w")}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/denledthuytinh1m2">
            {t("relatedTag.rang_dong_1m2")}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/bongdienquang4u50w">
            {t("relatedTag.u_shaped_bulb")}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/bongdenledcana">
            {t("relatedTag.cana_bulb")}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category10/fd46f2da-a6a2-4f46-890a-7bc951dd1aa4">
            {t("relatedTag.see_all")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTagBongden;
