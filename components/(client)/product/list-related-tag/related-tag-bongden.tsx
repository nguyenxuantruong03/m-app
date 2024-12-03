import Link from "next/link";
import { relatedTagLaptopcolor } from "@/components/(client)/color/color";
import { translateRelatedTagBongden } from "@/translate/translate-client";

interface RelatedTagBongdenProps {
  languageToUse: string;
}

const RelatedTagBongden = ({ languageToUse }: RelatedTagBongdenProps) => {
  //language
  const relatedTagBongdenMessage = translateRelatedTagBongden(languageToUse);
  return (
    <div className=" my-2 relative">
      <div className="absolute hidden md:flex bottom-4 md:left-[12.3rem] xl:left-[37.4rem] space-x-4 ">
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/dienquang40w">
            {relatedTagBongdenMessage.name}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/denbanhocledrangdong">
            {relatedTagBongdenMessage.name2}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/denledmpe40w">
            {relatedTagBongdenMessage.name3}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/denledthuytinh1m2">
            {relatedTagBongdenMessage.name4}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/bongdienquang4u50w">
            {relatedTagBongdenMessage.name5}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/bongden/bongdenledcana">
            {relatedTagBongdenMessage.name6}
          </Link>
        </div>
        <div className={relatedTagLaptopcolor.bg_opacity_border}>
          <Link href="https://vlxdxuantruong.vercel.app/category10/fd46f2da-a6a2-4f46-890a-7bc951dd1aa4">
            {relatedTagBongdenMessage.name7}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedTagBongden;
