"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash, User } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "./avatar";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";
import { format } from "date-fns";
import { ZoomImageModal } from "../modals/zoom-image-mutiple";
import { getImageUpload } from "@/translate/translate-dashboard";

interface ImageUploadProps {
  disabled?: boolean;
  onChange?: (value: string) => void;
  onRemove?: (value: string) => void;
  value?: string[];
  maxFiles?: number;
  showAvatar?: boolean;
  selectedAvatar?: string;
  language: string
}

interface AccountItem {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value = [],
  maxFiles = 10,
  showAvatar = false,
  selectedAvatar,
  language
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const userId = useCurrentUser();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // New state variable for selected index

  //language
  const imageUploadMessage = getImageUpload(language)

  const openImageModal = (index: number) => {
    setSelectedIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => setIsImageModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !userId.id) {
        redirect("/auth/login");
      }
    };

    fetchData();
  }, [userId]);

  const imageCredentials = userId?.imageCredential || undefined;
  // Use the first image from imageCredential hoăc ảnh iamge nêu ko có thì dùng deafault
  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials : null) ||
    userId?.image;

  const onUpload = (result: any) => {
    onChange?.(result.info.secure_url); // Gọi onChange để thêm URL vào danh sách
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const zonedSubtractedDate = utcToZonedTime(
    new Date(new Date(userId?.createdAt).getTime() - 7 * 60 * 60 * 1000),
    vietnamTimeZone
  );
  const formatcreatedAt = format(
    zonedSubtractedDate,
    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
    { locale: viLocale }
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset="ktkokc1o"
        options={{ maxFiles: maxFiles }}
      >
        {({ open }) => {
          return (
            <>
              {showAvatar && value.length === 0 && (
                <>
                  { avatarImage ? (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                      <Image
                        fill
                        className="object-cover cursor-pointer"
                        alt="Image"
                        src={selectedAvatar || avatarImage}
                        onClick={() => {
                          if (open) {
                            open();
                          } else {
                            toast.error(
                              imageUploadMessage.errorAddingImage
                            );
                          }
                        }}
                      />
                    </div>
                  ) : avatarImage ? (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                      <Image
                        fill
                        className="object-cover cursor-pointer"
                        alt="Image"
                        src={selectedAvatar || avatarImage}
                        onClick={() => {
                          if (open) {
                            open();
                          } else {
                            toast.error(
                              imageUploadMessage.errorAddingImage
                            );
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <Avatar className="w-40 h-40">
                      <AvatarFallback
                        className="bg-sky-500 cursor-pointer"
                        onClick={() => {
                          if (open) {
                            open();
                          } else {
                            toast.error(
                              imageUploadMessage.errorAddingImage
                            );
                          }
                        }}
                      >
                        <User className="text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </>
              )}

              <div className="max-w-[1750px] overflow-x-auto">
                <div className="flex items-center gap-3 w-max">
                  {value.map((url, index) => (
                    <div
                      key={url}
                      className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
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
                      {showAvatar && (
                        <Image
                          fill
                          className="object-cover cursor-pointer"
                          alt="Image"
                          src={selectedAvatar || url}
                          onClick={() => {
                            if (value.length === 1 || !showAvatar) {
                              if (open) {
                                open();
                              } else {
                                toast.error(
                                  imageUploadMessage.errorAddingImage
                                );
                              }
                            } else {
                              openImageModal(index);
                            }
                          }}
                        />
                      )}

                      {!showAvatar && (
                        <>
                          <Image
                            fill
                            className="object-cover cursor-pointer"
                            alt="Image"
                            src={selectedAvatar || url}
                            onClick={() => {
                              if (open) {
                                open();
                              } else {
                                toast.error(
                                  imageUploadMessage.errorAddingImage
                                );
                              }
                            }}
                          />
                          {value.length > 9 && (
                            <Image
                              fill
                              className="object-cover"
                              alt="Image"
                              src={selectedAvatar || url}
                              onClick={() => openImageModal(index)}
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
                {((showAvatar && value.length < 2) ||
                  (!showAvatar)) && (
                  <Button
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      if (open) {
                        open();
                      } else {
                        toast.error(
                          imageUploadMessage.errorAddingImage
                        );
                      }
                    }}
                    variant="outline"
                    className="mt-3 text-slate-500 flex items-center justify-center w-full max-w-sm"
                  >
                    <ImagePlus className="w-4 h-4" />
                    {imageUploadMessage.uploadImage}
                  </Button>
                )}
            </>
          );
        }}
      </CldUploadWidget>
      {isImageModalOpen && selectedIndex >= 0 && (
        <ZoomImageModal
          imageUrl={value.map((url) => ({ url }))}
          onClose={closeImageModal}
          isOpen={true}
          initialIndex={selectedIndex}
        />
      )}
    </div>
  );
};

export default ImageUpload;
