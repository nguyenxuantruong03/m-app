import Image from "next/image";
import { ZoomImageModal } from "./modals/zoom-image-mutiple";
import { useState } from "react";

const ImageCellMutiple: React.FC<{
    image: string[] | null;
    imageUrl: { url: string }[];
  }> = ({ image, imageUrl }) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0); // New state variable for selected index
  
    const openImageModal = (index: number) => {
      setSelectedIndex(index);
      setIsImageModalOpen(true);
    };
  
    const closeImageModal = () => setIsImageModalOpen(false);
  
    return (
      <>
        <div>
          {image && image.map((imageUrl, index) => (
            <span key={index} className="avatar-overlapping-multiple-image" onClick={() => openImageModal(index)}>
              <Image
                className="avatar-image-overlapping-multiple-image rounded-full cursor-pointer"
                src={imageUrl}
                alt={`Image ${index + 1}`}
                width="50"
                height="50"
              />
            </span>
          ))}
        </div>
        {isImageModalOpen && (
          <ZoomImageModal
            imageUrl={imageUrl}
            onClose={closeImageModal}
            isOpen={true}
            initialIndex={selectedIndex} // Pass the selected index to the modal
          />
        )}
      </>
    );
  };

  export default ImageCellMutiple