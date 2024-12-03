import Link from "next/link";
import { relatedTagHeadphonecolor } from "@/components/(client)/color/color";
import { translateRelatedTagOngnhua } from "@/translate/translate-client";

interface RelatedTagOngnhuaProps {
  languageToUse: string;
}

const RelatedTagOngnhua = ({ languageToUse }: RelatedTagOngnhuaProps) => {
  //language
  const relatedTagOngnhuaMessage = translateRelatedTagOngnhua(languageToUse);
  return (
    <div className=" my-2 relative">
      <div className="absolute hidden md:flex bottom-4  md:left-[23.3rem] xl:left-[49.4rem] space-x-4 ">
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong27binhminh">
            {relatedTagOngnhuaMessage.name}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong34binhminh">
            {relatedTagOngnhuaMessage.name1}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong60binhminh">
            {relatedTagOngnhuaMessage.name2}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong90binhminh">
            {relatedTagOngnhuaMessage.name3}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ongnhua/ong114binhminh">
            {relatedTagOngnhuaMessage.name4}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category2/dc60b612-be53-4418-8e69-1ca10ca1ae53">
            {relatedTagOngnhuaMessage.name5}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category2/074d4e14-db22-4df9-9c8c-031c9ce2984a">
            {relatedTagOngnhuaMessage.name6}
          </Link>
        </div>
        <div className={relatedTagHeadphonecolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category2/388fcfa8-720d-4ca5-ace8-45370235e6eb">
            {relatedTagOngnhuaMessage.name7}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTagOngnhua;
