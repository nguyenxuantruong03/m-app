import { Billboard } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageMiniProps {
  loading: boolean;
  data: Billboard | null;
}

const ImageMini: React.FC<ImageMiniProps> = ({ data,loading }) => {
  const isLoading = !data?.imagebillboard || data.imagebillboard.length === 0 || loading;

  const skeletonComponents = Array.from({ length: 3 }).map((_, index) => (
    <div
      key={index}
      className="relative rounded-md shadow-md overflow-hidden h-[138px] space-y-2"
    >
      <Skeleton className="w-full h-full rounded-md" />
    </div>
  ));

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
            blurDataURL="/images/image-placeholder.webp"
            loading="lazy"
          />
        </Link>
      </div>
    ));

  return <>{isLoading ? skeletonComponents : imageComponents}</>;
};

export default ImageMini;
