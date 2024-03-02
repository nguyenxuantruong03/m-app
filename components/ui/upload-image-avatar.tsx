"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { Trash2, Image as Imageicon } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  classNamesUpload?: string | undefined;
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  classNamesUpload
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [showImageOverlay, setShowImageOverlay] = useState(false);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
    setIsImageUploaded(true);
    setShowImageOverlay(true);
  };

  const CancleEdit = () => {
    setIsImageUploaded(false);
    setShowImageOverlay(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (value.length === 0) {
      setIsImageUploaded(false);
      setShowImageOverlay(false);
    }
  }, [value]);

  if (!isMounted) {
    return null;
  }

  //Xử lý nếu như ,infouser thì không có bottom-12 còn tất cả page khác thì có
  let overlayClass = '';

  if (typeof window !== 'undefined') {
    const isInfoUserPage = window.location.pathname.includes("/infouser");
    overlayClass = `absolute ${showImageOverlay ? "bg-white" : "hidden"} z-20 rounded-md p-2 ${isInfoUserPage ? "" : "bottom-12"}`;
  } else {
    return null;
  }
  
  const renderUploadButton = () => {
    return (
      <Button
        type="button"
        disabled={disabled}
        onClick={() => {
          setIsImageUploaded(true);
          setShowImageOverlay(true);
        }}
        variant="outline"
      >
        Ảnh nền
      </Button>
    );
  };

  return (
    <div>
      {value.length === 1 ? (
        renderUploadButton()
      ) : (
        <CldUploadWidget onUpload={onUpload} uploadPreset="ktkokc1o">
          {({ open }) => {
            const onClick = () => {
              open();
            };
            return (
              <>
                <Button
                  type="button"
                  disabled={disabled}
                  onClick={onClick}
                  variant="outline"
                  className={`flex items-center justify-center ${classNamesUpload}`}
                >
                  <Imageicon className="w-4 h-4 mr-1" /> Ảnh nền
                </Button>
              </>
            );
          }}
        </CldUploadWidget>
      )}

      {showImageOverlay && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={CancleEdit}
        />
      )}

      <div className={overlayClass}>
        {isImageUploaded && (
          <>
            <div className="flex items-center gap-4 ">
              {value.map((url) => (
                <div
                  key={url}
                  className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                >
                  <div className="z-10 absolute top-2 right-2">
                    <Button
                      type="button"
                      onClick={() => onRemove(url)}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Image fill className="object-cover" alt="Image" src={url} />
                </div>
              ))}
            </div>
            <div className="mx-auto">
              <p className="text-gray-500 font-bold my-2">Thay đổi Ảnh </p>
              <p className="text-sm text-gray-400">
                Lưu ý:
                <span className="ml-1">
                  Khi bạn upload lên có thể sẽ lựa chọn 1 ảnh
                  <br />
                  nhưng nếu bạn không xóa, mặc định sẽ lấy ảnh đầu tiên upload.
                </span>
              </p>
            </div>

            <Button className="mt-2 mr-2" type="submit">
              Lưu
            </Button>
            
            <Button
              className="mt-2"
              onClick={CancleEdit}
              variant="secondary"
            >
              Hủy bỏ
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;