import Link from "next/link";
import { relatedTagHeadphonecolor } from "@/components/(client)/color/color";
import { useTranslations } from "next-intl";


const RelatedTagOngnhua = () => {
  const t = useTranslations()
  
  return (
    <div className=" my-2 relative">
      <div className="absolute hidden md:flex bottom-4  md:left-[23.3rem] xl:left-[49.4rem] space-x-4 ">
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong27binhminh">
            {t("relatedTag.pipe_27")}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong34binhminh">
            {t("relatedTag.pipe_34")}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong60binhminh">
            {t("relatedTag.pipe_60")}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong90binhminh">
            {t("relatedTag.pipe_90")}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong114binhminh">
            {t("relatedTag.pipe_114")}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category2/dc60b612-be53-4418-8e69-1ca10ca1ae53">
            {t("relatedTag.elbow")}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category2/074d4e14-db22-4df9-9c8c-031c9ce2984a">
            {t("relatedTag.tee")}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category2/388fcfa8-720d-4ca5-ace8-45370235e6eb">
            {t("relatedTag.see_all")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTagOngnhua;
