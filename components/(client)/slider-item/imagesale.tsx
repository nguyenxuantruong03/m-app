import { Billboard } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

interface ImageSaleProps {
  data: Billboard | null;
}

const ImageSale: React.FC<ImageSaleProps> = ({ data }) => {
  if (!data?.imagebillboard || data.imagebillboard.length === 0) {
    return null; // Không hiển thị gì nếu không có dữ liệu
  }

  const firstImage = data.imagebillboard[0]; // Lấy ảnh đầu tiên

  return (
    <div className="h-[75px] rounded-xl my-4 mt-[4.5rem] xl:mt-[2.5rem] md:mb-2 relative">
        <Link href={firstImage.link ? firstImage.link : "/home-product"}>
        <div className="rounded-xl w-full h-[75px] overflow-hidden bg-cover">
          <Image
            src={firstImage.url}
            fill
            alt={firstImage.label || "Image"}
            className="object-cover rounded-md"
            placeholder="blur"
            blurDataURL="/images/signup-ipad.png"
            loading="lazy"
          />
        </div>
        </Link>
    </div>
  );
};

export default ImageSale;
