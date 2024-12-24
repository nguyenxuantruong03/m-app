"use client";
import { Image as ImageType, Product, ProductDetail } from "@/types/type";
import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./gallery.css";
import { getOutOfStockMessage } from "@/translate/translate-client";
import { Expand, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  images: ImageType[];
  data: Product;
  languageToUse: string;
}
const Gallery: React.FC<GalleryProps> = ({
  images = [],
  data,
  languageToUse,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{ src: string; index: number }>({
    src: "",
    index: 0,
  });

  const openModal = (src: string, index: number) => {
    setModalImage({ src, index });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // language
  const outOfStockMessage = getOutOfStockMessage(languageToUse);

  // Kiểm tra tất cả sản phẩm có === 0 không
  const productQuantityAll = [1, 2, 3, 4, 5].every(
    (i) => data.productdetail[`quantity${i}` as keyof ProductDetail] === 0
  );

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

  // Functions to navigate between images
  const nextImage = () => {
    if (modalImage.index < images.length - 1) {
      setModalImage({
        src: images[modalImage.index + 1].url,
        index: modalImage.index + 1,
      });
    }
  };

  const prevImage = () => {
    if (modalImage.index > 0) {
      setModalImage({
        src: images[modalImage.index - 1].url,
        index: modalImage.index - 1,
      });
    }
  };

  // Keyboard navigation for next and previous image
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "ArrowLeft") {
        prevImage();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, modalImage]);

  return (
    <>
      <Tab.Group as="div" className="flex flex-col-reverse">
        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {images.map((image) => (
              <GalleryTab key={image.id} image={image} />
            ))}
          </Tab.List>
        </div>

        {/* Tấm ảnh bự trên gallery */}
        <Tab.Panels className="aspect-square w-full">
          {images.map((image, index) => (
            <Tab.Panel key={image.id}>
              <div
                className={`relative aspect-square h-full w-full sm:rounded-lg overflow-hidden group ${
                  productQuantityAll ? "pointer-events-none" : "" // Disable pointer events when out of stock
                }`}
              >
                {productQuantityAll && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
                    <div className="w-full h-16 flex items-center justify-center text-white text-center font-bold text-2xl zigzag">
                      {outOfStockMessage}
                    </div>
                  </div>
                )}

                {/* Hover effect and Expand icon */}
                {!productQuantityAll && !isModalOpen && (
                  <div
                    onClick={() => openModal(image.url || "", index)}
                    className="absolute cursor-pointer inset-0 hover:bg-black hover:bg-opacity-20 group-hover:bg-opacity-40 flex items-center justify-center z-10 transition-opacity"
                  >
                    <Expand className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                <Image fill src={image.url} className="object-cover" alt="" />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="relative rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the image
          >
            <Image
              className="rounded-lg"
              src={modalImage.src}
              alt=""
              width={500}
              height={500}
            />
            <button
              onClick={closeModal}
              className="absolute cursor-pointer top-2 right-2 text-2xl rounded-full w-8 h-8 bg-gray-300 hover:bg-gray-400"
            >
              &times;
            </button>

            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-slate-900 bg-black bg-opacity-50 hover:bg-black hover:bg-opacity-30 rounded-full p-2"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-slate-900 bg-black bg-opacity-50 hover:bg-black hover:bg-opacity-30 rounded-full p-2"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
