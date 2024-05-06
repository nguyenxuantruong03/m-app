"use client"

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

export const ZoomModal: React.FC<ZoomModalProps> = ({ isOpen, onClose,imageUrl,updateImage,email }) => {
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
            maxWidth="6xl"
            textCenter={true}
        >
              <Image 
              src={imageUrl} 
              width={1100}
              height={1100}
              className="max-w-6xl max-h-screen"
              alt=""
              />
        </Modal>
    );
};
