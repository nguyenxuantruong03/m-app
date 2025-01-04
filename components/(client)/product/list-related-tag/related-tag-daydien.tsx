import Link from "next/link";
import { relatedTagWatchcolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";


const RelatedTagDaydien = () => {
  const t = useTranslations()
  
  return (
    <div className=" my-2 relative">
      <div className="absolute hidden md:flex bottom-4 md:left-[16rem] xl:left-[48.2rem] space-x-4 ">
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/daydiendaphaco1.5">
            {t("relatedTag.daphaco_1_5")}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/day-dien-daphaco-2.5">
            {t("relatedTag.daphaco_2_5")}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/daydiendoncadivi1.5">
            {t("relatedTag.cadivi_1_5")}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/daydiencadivi2.5">
            {t("relatedTag.cadivi_2_5")}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/daydiendaphaco4.0">
            {t("relatedTag.daphaco_4_0")}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category3/37e650f8-c1aa-49dc-9c34-22b1c038bbeb">
            {t("relatedTag.see_all")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTagDaydien;
