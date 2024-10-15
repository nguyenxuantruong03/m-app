import Gallery from "@/components/(client)/gallery/gallery";
import InfoProduct from "@/components/(client)/info-product/info-product";
import InfoPromotion from "@/components/(client)/info-product/info-promotion";
import InfoWarranty from "@/components/(client)/info-product/info-warranty";
import { Product, Image as Images } from "@/types/type";
import InfoProductDetail from "./info-detail-product";
import Comment from "@/components/(client)/comment/comment";
import ProductListSingleSuggest from "@/components/(client)/product/product-list/product-list-signle-suggest";
import ProductListSuggest from "@/components/(client)/product/product-list/product-list-suggest";

interface ProductDetailProps {
  data: Product;
  images: Images[];
  productlistsuggest?: boolean;
  productlistsuggest2?: boolean
  otherSuggestions: Product[];
  routeOtherSuggestions?: string;
  other: Product[];
  routeOther?: string;
  routeProductType?: "ongnhua" | "quat" | "bongden" | "daydien"
}

const DetailProduct: React.FC<ProductDetailProps> = ({
  data,
  images,
  productlistsuggest,
  otherSuggestions,
  routeOtherSuggestions = "",
  other,
  routeOther="",
  routeProductType,
  productlistsuggest2
}) => {
  return (
    <>
      <div className="px-4 py-8 sm:px-6 xl:px-8 mt-20">
        <div className="xl:grid xl:grid-cols-2 xl:item-start xl:gap-x-8 mt-5">
          <Gallery images={images} data={data}/>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 xl:mt-0">
            <InfoProduct data={data} />
          </div>
        </div>
      </div>
      {/* Infomation khuyen mai va bao hanh */}
      <div className="xl:max-w-7xl grid xl:grid-cols-2">
        <InfoPromotion data={data} />
        <div className="h-[580px] md:h-[460px] w-full shadow-lg mb-5 rounded-md overflow-hidden">
          <InfoWarranty data={data} />
        </div>
      </div>
      <hr className="my-10" />
      <h1 className="font-bold text-3xl my-3">Gợi ý khác </h1>
      {productlistsuggest ? (
        <ProductListSuggest data={otherSuggestions} productType={routeProductType as "ongnhua" | "quat" | "bongden" | "daydien"} />
      ) : (
        <ProductListSingleSuggest
          data={otherSuggestions}
          route={routeOtherSuggestions}
        />
      )}
      <h1 className="font-bold text-3xl my-3">Loại khác </h1>
      {/* Kiểm tra giá trị của suggest để hiển thị component phù hợp */}
      {productlistsuggest2 ? (
        <ProductListSuggest data={other} productType={routeProductType as "ongnhua" | "quat" | "bongden" | "daydien"} />
      ) : (
        <ProductListSingleSuggest
          data={other}
          route={routeOther}
        />
      )}
      <hr className="my-8" />
      <InfoProductDetail data={data} />
      <Comment data={data.id} nameProduct={data.heading} commentData={data.comment} responsecommentData={data.responsecomment}/>
    </>
  );
};

export default DetailProduct;
