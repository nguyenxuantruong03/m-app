"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Trash2, Image as Imageicon } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useTranslations } from "next-intl";

interface UploadAvatarNavbarProps {
  classNamesForm?: string | undefined;
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const UploadAvatarNavbar: React.FC<UploadAvatarNavbarProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  classNamesForm,
}) => {
  const t = useTranslations()
  const [isMounted, setIsMounted] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [showImageOverlay, setShowImageOverlay] = useState(false);

  //Ngăn chặn hành khi cuộn chuột khi đã xuất hiện showImageOverlay
  useEffect(() => {
    if (showImageOverlay) {
      // Disable scroll on body
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll on body when modal is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      // Clean up: enable scroll on body when component unmounts
      document.body.style.overflow = "auto";
    };
  }, [showImageOverlay]);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
    setIsImageUploaded(true);
    setShowImageOverlay(true);
  };

  const CancelEdit = () => {
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
  let overlayClass = "";

  if (typeof window !== "undefined") {
    overlayClass = `fixed ${
      showImageOverlay ? "bg-white" : "hidden"
    } z-20 rounded-md bottom-12 h-max w-3/4 max-w-md border rounded-md gap-4 bg-background p-6 shadow-lg transition ease-in-out`;
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
        {t("navbardashboard.imageForm.backgroundImage")}
      </Button>
    );
  };

  return (
    <div>
      {value.length === 1 ? (
        renderUploadButton()
      ) : (
        <CldUploadWidget
          onUpload={onUpload}
          uploadPreset="ktkokc1o"
          options={{ maxFiles: 1 }}
        >
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
                  className={`flex items-center justify-center ${classNamesForm}`}
                >
                  <Imageicon className="w-4 h-4 mr-1" />{" "}
                  {t("navbardashboard.imageForm.backgroundImage")}
                </Button>
              </>
            );
          }}
        </CldUploadWidget>
      )}

      {showImageOverlay && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={CancelEdit}
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
                      disabled={disabled}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Image fill className="object-cover" alt="Image" src={url} />
                </div>
              ))}
            </div>
            <div className="mx-auto">
              <p className="text-gray-500 font-bold my-2">
                {t("navbardashboard.imageForm.changeImage")}{" "}
              </p>
              <p className="text-sm text-gray-400">
                {t("navbardashboard.imageForm.note")}
                <span className="ml-1">
                  {t("navbardashboard.imageForm.avatarDescription")}
                </span>
              </p>
            </div>

            <Button
              className="mt-2 mr-2"
              type="submit"
              variant="secondary"
              disabled={disabled}
            >
              {t("action.save")}
            </Button>

            <Button
              className="mt-2"
              onClick={CancelEdit}
              variant="destructive"
              disabled={disabled}
            >
              {t("action.cancel")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadAvatarNavbar;
