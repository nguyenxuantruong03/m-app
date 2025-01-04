import Link from "next/link";
import { relatedTagMousecolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";

const RelatedTagVatlieunhatam = () => {
  const t = useTranslations()

  return (
    <div className=" my-2 relative">
      <div className="absolute hidden md:flex bottom-4 md:left-[27.5rem] xl:left-[63.5rem] space-x-4 ">
        <div className={relatedTagMousecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category8/595f6934-f5d2-49e0-84f0-71c1e6eba2f9">
            {t("relatedTag.showerhead")}
          </Link>
        </div>
        <div className={relatedTagMousecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category8/792fa51d-31b9-441a-91e7-882bfc47dcdd">
            {t("relatedTag.shower_bulb")}
          </Link>
        </div>
        <div className={relatedTagMousecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category8/5de119d8-c8f1-41e5-aea5-4710b2d65410">
            {t("relatedTag.spray_gun")}
          </Link>
        </div>
        <div className={relatedTagMousecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category8/595f6934-f5d2-49e0-84f0-71c1e6eba2f9">
            {t("relatedTag.see_all")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTagVatlieunhatam;
