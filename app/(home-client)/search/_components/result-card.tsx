import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Image as ImageData } from "@/types/type";
import Currency from "@/components/ui/currency";
import { Decimal } from "@prisma/client/runtime/library";

interface ResultCardProps {
  data: {
    images: ImageData[];
    id: string;
    name: string;
    heading: string;
    sold: number | null;
    description: string;
    productType: string;
    productdetail: {
      price1: Decimal;
      percentpromotion1: Decimal;
  }
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  const getRouteBasedOnProductType = (productType: any) => {
    switch (productType.toLowerCase()) {
      case "product":
        return "product0";
      case "product1":
        return "product1";
      case "product2":
        return "product2";
      case "product3":
        return "product3";
      case "product4":
        return "product4";
      case "product5":
        return "product5";
      case "product6":
        return "product6";
      case "product7":
        return "product7";
      case "product8":
        return "product8";
      case "product9":
        return "product9";
      case "product10":
        return "product10";
      case "product11":
        return "product11";
      default:
        return ""; // Handle the default case as needed
    }
  };

  const route = getRouteBasedOnProductType(data.productType);

  const priceSale =
    Number(data.productdetail.price1) *
    ((100 - Number(data.productdetail.percentpromotion1)) / 100);
  const priceold = Number(data.productdetail.price1);

  return (
    <>
      <Link href={`/${route}/${data.name}`}>
        <div className="w-full h-full gap-x-4">
          <div className="relative h-[5rem] w-[9rem] md:h-[9rem] md:w-[16rem]">
            <div className="group aspect-video relative rounded-md cursor-pointer">
              <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
              <Image
                src={data.images[0].url}
                fill
                alt={`404 ${data.heading}`}
                className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
              />
            </div>
          </div>
          <div className="space-y-1 mt-1">
          <Currency value={priceSale} valueold={priceold} />
            <p className="font-bold text-md cursor-pointer hover:text-blue-500 trancate max-w-[8rem] md:max-w-[15rem] overflow-hidden text-ellipsis whitespace-nowrap">
              {data.heading}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
};
