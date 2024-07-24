import Image from "next/image";
import { useState } from "react";
import { ZoomImageAttendanceModal } from "./modals/zoom-image-one-modal";

const ImageCellOne: React.FC<{
  imageUrl: string;
  updateImage?: string | null;
  email?: string | null;
}> = ({ imageUrl, updateImage, email }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  return (
    <>
      <div className="cursor-pointer" onClick={openImageModal}>
        <Image
          src={imageUrl}
          alt="User Avatar"
          width="50"
          height="50"
          className="rounded-full cursor-pointer"
        />
      </div>
      {isImageModalOpen && (
        <ZoomImageAttendanceModal
          imageUrl={imageUrl}
          createdAt={updateImage}
          email={email}
          onClose={closeImageModal}
          isOpen={true}
        />
      )}
    </>
  );
};

export default ImageCellOne;
