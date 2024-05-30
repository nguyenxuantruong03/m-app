"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import Image from "next/image";

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  updateImage: string | null;
  email: string | null;
}

export const ZoomImageAttendanceModal: React.FC<ZoomModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  updateImage,
  email,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`Người dùng: ${email}`}
      description={`Ảnh được cập nhật vào ngày-${updateImage}`}
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      textCenter={true}
    >
      <div className="flex items-center justify-center">
      <Image
        src={imageUrl}
        width={750}
        height={750}
        className="max-w-6xl max-h-screen rounded-md"
        alt=""
      />
      </div>
    </Modal>
  );
};
