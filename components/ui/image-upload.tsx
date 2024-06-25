"use client"
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import  toast  from 'react-hot-toast';

interface ImageUploadProps {
  disabled?: boolean;
  onChange?: (value: string) => void;
  onRemove?: (value: string) => void;
  value?: string[];
  classNamesForm?: string;
  classNameImage?: string;
  maxFiles?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value = [],
  classNamesForm,
  classNameImage,
  maxFiles = 10
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const onUpload = (result: any) => {
    onChange?.(result.info.secure_url); // Gọi onChange để thêm URL vào danh sách
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className={`mb-4 space-y-2 mx-auto xl:flex items-center gap-4 `}>
        {value.map((url) => (
          <div
            key={url}
            className={`relative w-[200px] h-[200px] rounded-md overflow-hidden ${classNameImage}`}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove?.(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <Image 
            fill 
            className="object-cover" 
            alt="Image" 
            src={url} 
            />

          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="ktkokc1o" options={{ maxFiles: maxFiles }}>
        {({ open }) => {
          const onClick = () => {
            if(open){
            open();
            }else{
              toast.error("Đã có vấn đề khi thêm ảnh. Hãy làm mới trang để thử lại!")
            }
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              onClick={onClick}
              variant="outline"
              className={classNamesForm}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
