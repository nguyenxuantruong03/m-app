import { Billboard } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

interface ImageMiniProps {
  data: Billboard | null;
}

const ImageMini: React.FC<ImageMiniProps> = ({ data }) => {
  const imageComponents = data?.imagebillboard
    ?.slice(0, 3)
    .map((image, index) => (
      <div
        key={index}
        className="rounded-md shadow-md overflow-hidden h-[125px]"
      >
        <Link href="https://vlxdxuantruong.vercel.app/category1/52d11611-ccd2-4326-bf7f-bd224ebef89d" className="z-50">
          <Image
            src={image.url}
            width="285"
            height="115"
            alt={`Image ${index}`}
            className="object-cover rounded-md h-[125px]"
            placeholder="blur"
            blurDataURL="/images/signup-ipad.png"
            loading="lazy"
          />
        </Link>
      </div>
    ));

  return <>{imageComponents}</>;
};

export default ImageMini;
