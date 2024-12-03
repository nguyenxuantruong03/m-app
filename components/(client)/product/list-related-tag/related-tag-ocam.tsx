import Link from "next/link";
import { relatedTagTivicolor } from "@/components/(client)/color/color";
import { translateRelatedTagOcam } from "@/translate/translate-client";

interface RelatedTagOcamProps {
  languageToUse: string;
}

const RelatedTagOcam = ({ languageToUse }: RelatedTagOcamProps) => {
  //language
  const relatedTagOCamMessage = translateRelatedTagOcam(languageToUse);
  return (
    <div className=" my-2 relative">
      <div className="absolute hidden md:flex bottom-4 md:left-[26rem] xl:left-[58.1rem] space-x-4 ">
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/mat-3-lo-cam-sino">
            {relatedTagOCamMessage.name}
          </Link>
        </div>
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/congtac1chieusino">
            {relatedTagOCamMessage.name2}
          </Link>
        </div>
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/caudaotudong06a">
            {relatedTagOCamMessage.name3}
          </Link>
        </div>
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/mat1congtacsino">
            {relatedTagOCamMessage.name4}
          </Link>
        </div>
        <div className={relatedTagTivicolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/ocam/mat-3-lo-cam-sino">
            {relatedTagOCamMessage.name5}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTagOcam;
