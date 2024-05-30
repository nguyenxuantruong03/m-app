"use client"
import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: { url: string }[];
  initialIndex: number; // New prop for initial index
}

export const ZoomImageModal: React.FC<ZoomModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  initialIndex, // Destructure initialIndex
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex); // Set initial index as the initial state

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex); // Update currentIndex when initialIndex changes
  }, [initialIndex]);

  if (!isMounted) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrl.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl" textCenter={true}>
      <div className="flex items-center justify-center space-x-3">
        <Button onClick={handlePrev}><ChevronLeft className="size-5"/></Button>
        <Image
          src={imageUrl[currentIndex].url}
          width={720}
          height={720}
          className="max-w-6xl max-h-screen rounded-md"
          alt={`Image ${currentIndex + 1}`}
        />
        <Button onClick={handleNext}><ChevronRight className="size-5"/></Button>
      </div>
    </Modal>
  );
};
