import Link from "next/link";
import { relatedTagWatchcolor } from "@/components/(client)/color/color";
import { translateRelatedTagDayDien } from "@/translate/translate-client";

interface RelatedTagDaydienProps {
  languageToUse: string;
}

const RelatedTagDaydien = ({ languageToUse }: RelatedTagDaydienProps) => {
  //language
  const relatedTagDayDienMessage = translateRelatedTagDayDien(languageToUse);
  return (
    <div className=" my-2 relative">
      <div className="absolute hidden md:flex bottom-4 md:left-[16rem] xl:left-[48.2rem] space-x-4 ">
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/daydiendaphaco1.5">
            {relatedTagDayDienMessage.name}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/day-dien-daphaco-2.5">
            {relatedTagDayDienMessage.name2}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/daydiendoncadivi1.5">
            {relatedTagDayDienMessage.name3}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/daydiencadivi2.5">
            {relatedTagDayDienMessage.name4}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/daydien/daydiendaphaco4.0">
            {relatedTagDayDienMessage.name5}
          </Link>
        </div>
        <div className={relatedTagWatchcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category3/37e650f8-c1aa-49dc-9c34-22b1c038bbeb">
            {relatedTagDayDienMessage.name6}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTagDaydien;
