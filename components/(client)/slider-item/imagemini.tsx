import { Billboard } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

interface ImageMiniProps {
  data: Billboard | null;
}

const ImageMini: React.FC<ImageMiniProps> = ({ data }) => {
  const imageComponents = data?.imagebillboard
    ?.slice(0, 3)
    .map((image, index, array) => (
      <div
        key={index}
        className={`relative rounded-md shadow-md overflow-hidden h-[138px] ${
          index < array.length - 1 ? "space-y-2" : ""
        }`}
      >
        <Link
          href={`${image.link ? `${image.link}` : `/home-product`} `}
          className="z-50"
        >
          <Image
            src={image.url}
            fill
            alt={`Image ${index}`}
            className="object-cover rounded-md"
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
