import Image from "next/image";
import { Product } from "@/types/type";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface DetailProductProps {
  data: Product;
}

const InfoProductDetail: React.FC<DetailProductProps> = ({
  data,
}) => {
  const t = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  const images = data.imagesalientfeatures;

  const openModal = (url: string, alt: string) => {
    setSelectedImage({ url, alt });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="my-2">
          <div className="shadow-inner pt-5 px-5 rounded-lg mx-auto md:mx-0 md:max-w-3xl xl:max-w-7xl">
            <div className="p-2 bg-slate-400 bg-opacity-10 rounded-lg">
              <h1 className="text-center text-lg font-bold text-red-500">
                {t("action.keyFeatures")}
              </h1>
              <p className="text-sm text-slate-900 dark:text-slate-200">
                {data.productdetail.descriptionsalientfeatures}
              </p>
            </div>
            <p className="my-1 text-slate-900 dark:text-slate-200">
              {data.productdetail.description2salientfeatures}
            </p>
            <span className="font-bold text-lg text-slate-900 dark:text-slate-200">
              {t("product.productNewFeatures", {name: data.productdetail.name1})}
            </span>
            <div className="pl-2 my-1 text-slate-900 dark:text-slate-200">
              <p>{data.productdetail.description3salientfeatures}</p>
            </div>
            <p className="text-sm font-bold my-2 text-slate-900 dark:text-slate-200">
              {data.productdetail.description4salientfeatures}
            </p>

            <div className="flex flex-col items-center">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  width={800}
                  height={200}
                  alt={`Image ${index + 1}`}
                  className="rounded-md mt-3 cursor-pointer"
                  onClick={() => openModal(image.url, `Image ${index + 1}`)}
                />
              ))}
            </div>

            <p className="text-sm my-2 text-slate-900 dark:text-slate-200">
              {data.productdetail.contentsalientfeatures}
            </p>
        </div>
      </div>

      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
          >
            <Image
              className="rounded-lg"
              src={selectedImage.url}
              alt={selectedImage.alt}
              width={500}
              height={500}
            />
            <button
              onClick={closeModal}
              className="absolute cursor-pointer top-2 right-2 flex items-center justify-center text-xl rounded-full text-slate-900 w-6 h-6 bg-gray-300 hover:bg-gray-400"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoProductDetail;
