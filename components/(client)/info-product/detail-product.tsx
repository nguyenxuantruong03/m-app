import Gallery from "@/components/(client)/gallery/gallery";
import InfoProduct from "@/components/(client)/info-product/info-product";
import InfoPromotion from "@/components/(client)/info-product/info-promotion";
import InfoWarranty from "@/components/(client)/info-product/info-warranty";
import { Product, Image as Images } from "@/types/type";
import InfoProductDetail from "./info-detail-product";
import Comment from "@/components/(client)/comment/comment";
import ProductListSingleSuggest from "@/components/(client)/product/product-list/product-list-signle-suggest";
import ProductListSuggest from "@/components/(client)/product/product-list/product-list-suggest";
import ErrorComponent from "@/components/ui/error";
import ProductSkeleton from "../skeleton/product-skeleton";
import { useTranslations } from "next-intl";

interface ProductDetailProps {
  data: Product | null;
  images: Images[] | undefined;
  productlistsuggest?: boolean;
  productlistsuggest2?: boolean;
  otherSuggestions: Product[];
  routeOtherSuggestions?: string;
  other: Product[];
  routeOther?: string;
  loading: boolean;
}

const DetailProduct: React.FC<ProductDetailProps> = ({
  data,
  images,
  productlistsuggest,
  otherSuggestions,
  routeOtherSuggestions = "",
  other,
  routeOther = "",
  productlistsuggest2,
  loading
}) => {
  const t = useTranslations()

  if (loading) return <ProductSkeleton />;

  if (!data) return <ErrorComponent />;

  return (
    <>
    <div className="px-4 py-8 sm:px-6 xl:px-8 mt-20">
      <div className="xl:grid xl:grid-cols-2 xl:item-start xl:gap-x-8 mt-5">
        <div className="xl:sticky xl:top-20 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto z-[9999]">
          <Gallery
            images={images || []}
            data={data}
          />
        </div>
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
    <h1 className="font-bold text-3xl my-3 text-slate-900 dark:text-slate-200">
      {t("action.otherSuggestion")}
    </h1>
    {productlistsuggest ? (
      <ProductListSuggest
        data={otherSuggestions}
        route={routeOtherSuggestions}
      />
    ) : (
      <ProductListSingleSuggest
        data={otherSuggestions}
        route={routeOtherSuggestions}
      />
    )}
    <h1 className="font-bold text-3xl my-3 text-slate-900 dark:text-slate-200">
      {t("action.otherType")}
    </h1>
    {/* Kiểm tra giá trị của suggest để hiển thị component phù hợp */}
    {productlistsuggest2 ? (
      <ProductListSuggest
        data={other}
        route={routeOther}
      />
    ) : (
      <ProductListSingleSuggest
        data={other}
        route={routeOther}
      />
    )}
    <hr className="my-8" />
    <InfoProductDetail data={data} />
    <Comment
      data={data.id}
      nameProduct={data.heading}
      commentData={data.comment}
      responsecommentData={data.responsecomment}
    />
  </>
  );
};

export default DetailProduct;
