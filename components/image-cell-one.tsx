"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ZoomImageAttendanceModal } from "./modals/zoom-image-one-modal";
import { cn } from "@/lib/utils";
import { Camera, Image as ImageIcon, ImageUp, X, Radio  } from "lucide-react";
import FormImageCredential from "@/app/(setting-user)/components/form/form-infomation/form-imageCredential";
import { LiveBadge } from "./live-badge";
import Link from "next/link";

const ImageCellOne: React.FC<{
  imageUrl: string;
  createdAt?: string | null;
  email?: string | null;
  widthImage?: number;
  heightImage?: number;
  classNames?: string;
  showUpload?: boolean;
  user?: any;
  self?: any;
  showImage?: boolean;
  isClient?: boolean;
  customClassFeedBack?: string
}> = ({
  imageUrl,
  createdAt,
  email,
  widthImage = 50,
  heightImage = 50,
  classNames,
  showUpload = false,
  user,
  self,
  showImage,
  isClient= false,
  customClassFeedBack
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdateImage, setOpenupdateImage] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Khai báo ref cho dropdown

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  // Effect để đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false); // Đóng dropdown khi click ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {showUpload ? (
        <>
          <div
            className="relative cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Image
              src={imageUrl}
              alt="404"
              width={widthImage}
              height={heightImage}
              className={cn("rounded-full", self.stream?.isLive && "ring-2 ring-rose-500 border border-background",classNames)}
            />
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-200 hover:opacity-20 rounded-full" />
            <Camera className="absolute bottom-2.5 left-24 bg-slate-900 text-white rounded-full h-7 w-7 p-1" />
            {
              self.stream?.isLive && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <LiveBadge />
              </div>
              )
            }
          </div>

          {open && (
            <div className="absolute top-32 -inset-x-12 bg-slate-900 p-3 rounded-md">
              {self.stream?.isLive &&  (
                <Link href={`/live/${self.nameuser}`}>
                  <div
                    className="mb-2 flex items-center text-white hover:bg-white hover:bg-opacity-10 p-1 cursor-pointer rounded-md"
                  >
                    <Radio className="h-5 w-5 mr-2" /> Xem Live
                  </div>
                </Link>
              )}
              <div
                className="mb-2 flex items-center text-white hover:bg-white hover:bg-opacity-10 p-1 cursor-pointer rounded-md"
                onClick={openImageModal}
              >
                <ImageIcon className="h-5 w-5 mr-2" /> Xem ảnh đại diện
              </div>

              {user?.id === self?.id && (
                  <div
                    onClick={() => setOpenupdateImage(true)}
                    className="flex items-center text-white hover:bg-white hover:bg-opacity-10 p-1 cursor-pointer rounded-md"
                  >
                    <ImageUp className="h-5 w-5 mr-2" /> Thay ảnh đại diện
                  </div>
              )}
            </div>
          )}

          {openUpdateImage && (
            <>
              <div className="fixed inset-0 bg-black/80 h-full w-full z-[99999] flex items-center justify-center">
                <div className="h-max w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-50">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground break-all line-clamp-2 text-white">
                      Chỉnh sửa ảnh đại diện{" "}
                    </span>
                    <span
                      onClick={() => setOpenupdateImage(false)}
                      className="cursor-pointer rounded-sm hover:rounded-full hover:bg-gray-500 hover:bg-opacity-50 p-3 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none "
                    >
                      <X className="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground break-all line-clamp-3">
                    Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua
                    các bài viết, bình luận, tin nhắn...
                  </div>
                  <FormImageCredential setOpen={setOpenupdateImage} />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="cursor-pointer" onClick={openImageModal}>
            <Image
              src={imageUrl}
              alt="404"
              width={widthImage}
              height={heightImage}
              className={cn("rounded-full", classNames)}
            />
            {/* <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-200 hover:opacity-20 rounded-full" />
            <Camera className="absolute bottom-2.5 left-24 bg-slate-900 text-white rounded-full h-7 w-7 p-1" /> */}
          </div>
        </>
      )}

      {(isImageModalOpen || showImage) && (
        <ZoomImageAttendanceModal
          imageUrl={imageUrl}
          createdAt={createdAt}
          email={email}
          onClose={closeImageModal}
          isOpen={true}
          isClient={isClient}
          customClassFeedBack={customClassFeedBack}
        />
      )}
    </div>
  );
};

export default ImageCellOne;
