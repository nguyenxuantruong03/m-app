import Image from "next/image";
import NewsPageProduct from "@/components/(client)/news/news-product";
import { Product } from "@/types/type";
import NewsPage from "../news/news";

interface DetailProductProps {
  data: Product;
}

const InfoProductDetail: React.FC<DetailProductProps> = ({ data }) => {
  const images = data.imagesalientfeatures;

  return (
    <>
      <div className="my-2">
        <div className="flex justify-between space-x-3">
        <div className=" shadow-inner pt-5 px-5 rounded-lg mx-auto md:mx-0 max-w-[360px] md:max-w-3xl xl:max-w-7xl">
          <div className="p-2 bg-slate-400 bg-opacity-10 rounded-lg">
            <h1 className="text-center text-lg font-bold text-red-500">
              Đặc điểm nổi bật
            </h1>
            <p className="text-sm text-slate-900 dark:text-slate-200">
              {data.productdetail.descriptionsalientfeatures}
            </p>
          </div>
          <p className="my-1 text-slate-900 dark:text-slate-200">
            {data.productdetail.description2salientfeatures}
          </p>
          <span className="font-bold text-lg text-slate-900 dark:text-slate-200">
            Sản phẩm {data.productdetail.name1} có gì mới ?
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
              width="1000"
              height={index === 0 ? "200" : "300"}
              alt="Image"
              className="rounded-md mt-3"
            />
          ))}
          <p className="text-sm my-2 text-slate-900 dark:text-slate-200">
            {data.productdetail.contentsalientfeatures}
          </p>
        </div>
        {/* News */}
        <div className="max-w-[288px] max-h-[1200px] p-2 bg-slate-500 bg-opacity-20 rounded-lg hidden lg:block">
          <h1 className="text-center text-lg font-bold text-red-500">
            Tin tức
          </h1>
          <div
            className="h-[1145px] overflow-y-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            <style>{`
    .overflow-y-auto::-webkit-scrollbar {
      width: 6px;
    }
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background-color: transparent; 
    }
  `}</style>
            <NewsPageProduct />
          </div>
        </div>
        </div>
        <div className="md:block lg:hidden">
          <NewsPage />
        </div>
      </div>
    </>
  );
};

export default InfoProductDetail;
