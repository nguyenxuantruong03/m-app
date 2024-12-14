import { Billboard } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageSaleProps {
  data: Billboard | null;
  loading: boolean;
}

const ImageSale: React.FC<ImageSaleProps> = ({ data, loading }) => {
  if (!data?.imagebillboard || data.imagebillboard.length === 0 || loading) {
    return (
      <div className="h-[75px] rounded-xl m-4 md:m-2 xl:m-0 xl:my-4 xl:mt-[2.5rem]">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    );
  }

  const firstImage = data.imagebillboard[0]; // Lấy ảnh đầu tiên

  return (
    <div className="h-[75px] rounded-xl m-4 md:m-2 xl:m-0 xl:my-4 xl:mt-[2.5rem] relative">
      <Link href={firstImage.link ? firstImage.link : "/home-product"}>
        <div className="rounded-xl w-full h-[75px] overflow-hidden bg-cover">
          <Image
            src={firstImage.url}
            fill
            alt={firstImage.label || "Image"}
            className="object-cover rounded-md"
            placeholder="blur"
            blurDataURL="/images/image-placeholder.webp"
            loading="lazy"
          />
        </div>
      </Link>
    </div>
  );
};

export default ImageSale;
