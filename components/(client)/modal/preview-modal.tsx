"use client";

import InfoProduct from "@/components/(client)//info-product/info-product";
import Gallery from "@/components/(client)//gallery/gallery";
import Modal from "@/components/ui/modal";
import { Product } from "@/types/type";
import InfoPromotion from "@/components/(client)//info-product/info-promotion";
import InfoWarranty from "@/components/(client)//info-product/info-warranty";
import Comment from "@/components/(client)//comment/comment";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  console.log("product", product)
  return (
    <Modal isOpen={isOpen} onClose={onClose} customClass="h-[680px] overflow-y-auto" customWidth="md:w-4/5" maxWidth="7xl">
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product?.images} data={product} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <InfoProduct data={product}/>
        </div>
      </div>
      <div className="xl:max-w-7xl grid-rows-2">
        <InfoPromotion data={product} />
        <div className="h-[580px] md:h-[460px] w-full shadow-lg mb-5 rounded-md overflow-hidden">
          <InfoWarranty data={product}/>
        </div>
      </div>
      <hr className="my-8" />
      <Comment 
        data={product.id} 
        nameProduct={product.heading} 
        commentData={product.comment}
        responsecommentData={product.responsecomment}
      />
    </Modal>
  );
};

export default PreviewModal;
