"use client"
import { Image as ImageType } from "@/types/type";
import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import NextImage from "next/image"


interface GalleryProps{
    images: ImageType[];
}
const Gallery:React.FC<GalleryProps> = ({images = []}) => {
    return ( 
            <Tab.Group as="div" className="flex flex-col-reverse">
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                            {images.map((image)=>(
                                // Còn đây là có thể select từng ảnh để xem
                                <GalleryTab key={image.id} image={image} />
                            ))}
                    </Tab.List>
                </div>

            {/* Tấm ảnh bự trên gallery */}
            <Tab.Panels className="aspect-square w-full">
                    {images.map((image)=>(
                        <Tab.Panel key={image.id}>
                            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                                <NextImage 
                                fill 
                                src={image.url}
                                className=""
                                alt=""
                                />
                            </div>
                        </Tab.Panel>
                    ))}
            </Tab.Panels>
            </Tab.Group>
     );
}
 
export default Gallery;