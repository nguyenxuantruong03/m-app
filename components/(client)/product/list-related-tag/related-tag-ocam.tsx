import Link from "next/link";
import { relatedTagTivicolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";


const RelatedTagOcam = () => {
  const t = useTranslations()

  return (
    <div className=" my-2 relative">
      <div className="absolute hidden md:flex bottom-4 md:left-[26rem] xl:left-[58.1rem] space-x-4 ">
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/mat-3-lo-cam-sino">
            {t("relatedTag.three_hole_plate")}
          </Link>
        </div>
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/congtac1chieusino">
            {t("relatedTag.switch")}
          </Link>
        </div>
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/caudaotudong06a">
            {t("relatedTag.circuit_breaker")}
          </Link>
        </div>
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/mat1congtacsino">
            {t("relatedTag.one_hole_plate")}
          </Link>
        </div>
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/mat-3-lo-cam-sino">
            {t("relatedTag.see_all")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTagOcam;
