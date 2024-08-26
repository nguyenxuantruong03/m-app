"use client";
import { Image as ImageType, Product, ProductDetail } from "@/types/type";
import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import NextImage from "next/image";
import "./gallery.css"
interface GalleryProps {
  images: ImageType[];
  data: Product;
}
const Gallery: React.FC<GalleryProps> = ({ images = [], data }) => {
  //Kiểm tra tất cả sản phẩm có === 0 không
  const productQuantityAll = [1, 2, 3, 4, 5].every(
    (i) => data.productdetail[`quantity${i}` as keyof ProductDetail] === 0
  );

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            // Còn đây là có thể select từng ảnh để xem
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>

      {/* Tấm ảnh bự trên gallery */}
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="relative aspect-square h-full w-full sm:rounded-lg overflow-hidden">
              {productQuantityAll && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
                  <div className="w-full h-16 flex items-center justify-center text-white text-center font-bold text-2xl zigzag">
                    Hết hàng
                  </div>
                </div>
              )}
              <NextImage fill src={image.url} className="object-cover" alt="" />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
