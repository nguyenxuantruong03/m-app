import Currency from "@/components/ui/currency";
import Image from "next/image";
import { Product } from "@/types/type";
import Link from "next/link";

interface ShowResultProps {
  data: Product
}
const ProductTrending = ({ data }: ShowResultProps) => {

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
    <Link href={`/${route}/${data.name}`}>
    <div className="flex space-x-5 cursor-pointer hover:bg-slate-500 hover:bg-opacity-10">
      <Image
        src={data.images[0].url}
        alt={`404 ${data.heading}`}
        width={50}
        height={50}
      />
      <div>
        <p className="font-semibold">{data.heading}</p>
        <Currency value={priceSale} valueold={priceold} />
      </div>
    </div>
    </Link>
  );
};

export default ProductTrending;
