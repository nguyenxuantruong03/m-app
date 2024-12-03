import Image from "next/image";
import { Product } from "@/types/type";
import {
  translateKeyFeatures,
  translateNews,
  translateProductNewFeatures,
} from "@/translate/translate-client";

interface DetailProductProps {
  data: Product;
  languageToUse: string;
}

const InfoProductDetail: React.FC<DetailProductProps> = ({
  data,
  languageToUse,
}) => {
  const images = data.imagesalientfeatures;
  //languages
  const keyFeaturesMessage = translateKeyFeatures(languageToUse);
  const productNewFeatureMessage = translateProductNewFeatures(
    languageToUse,
    data.productdetail.name1
  );
  const newsMessage = translateNews(languageToUse);

  return (
    <>
      <div className="my-2">
        <div className=" shadow-inner pt-5 px-5 rounded-lg mx-auto md:mx-0 md:max-w-3xl xl:max-w-7xl">
          <div className="p-2 bg-slate-400 bg-opacity-10 rounded-lg">
            <h1 className="text-center text-lg font-bold text-red-500">
              {keyFeaturesMessage}
            </h1>
            <p className="text-sm text-slate-900 dark:text-slate-200">
              {data.productdetail.descriptionsalientfeatures}
            </p>
          </div>
          <p className="my-1 text-slate-900 dark:text-slate-200">
            {data.productdetail.description2salientfeatures}
          </p>
          <span className="font-bold text-lg text-slate-900 dark:text-slate-200">
            {productNewFeatureMessage}
          </span>
          <div className="pl-2 my-1 text-slate-900 dark:text-slate-200">
            <p>{data.productdetail.description3salientfeatures}</p>
          </div>
          <p className="text-sm font-bold my-2 text-slate-900 dark:text-slate-200">
            {data.productdetail.description4salientfeatures}
          </p>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              width="1500"
              height={index === 0 ? "200" : "300"}
              alt="Image"
              className="rounded-md mt-3"
            />
          ))}
          <p className="text-sm my-2 text-slate-900 dark:text-slate-200">
            {data.productdetail.contentsalientfeatures}
          </p>
        </div>
      </div>
    </>
  );
};

export default InfoProductDetail;
