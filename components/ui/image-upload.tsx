"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash, User } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { getAccountByUserId } from "@/data/account";
import { Avatar, AvatarFallback } from "./avatar";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";
import { format } from "date-fns";
import { ZoomImageModal } from "../modals/zoom-image-mutiple";

interface ImageUploadProps {
  disabled?: boolean;
  onChange?: (value: string) => void;
  onRemove?: (value: string) => void;
  value?: string[];
  maxFiles?: number;
  showAvatar?: boolean;
  selectedAvatar?: string;
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
  selectedAvatar
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const userId = useCurrentUser();
  const [account, setAccount] = useState<AccountItem | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // New state variable for selected index

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

      try {
        const accountData = await getAccountByUserId(userId?.id);
        setAccount(accountData || null);
      } catch (error) {
        toast.error("Invalid Error");
      }
    };

    fetchData();
  }, [userId]);

  const imageCredentials = userId?.imageCredential[0] || undefined;
  const isGitHubOrGoogleUser =
    account?.provider === "github" ||
    account?.provider === "google" ||
    account?.provider === "facebook" ||
    account?.provider === "gitlab" ||
    account?.provider === "reddit" ||
    account?.provider === "spotify" ||
    account?.provider === "twitter";

  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials[0] : null) ||
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
                  {isGitHubOrGoogleUser && avatarImage ? (
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
                              "Đã có vấn đề khi thêm ảnh. Hãy làm mới trang để thử lại!"
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
                              "Đã có vấn đề khi thêm ảnh. Hãy làm mới trang để thử lại!"
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
                              "Đã có vấn đề khi thêm ảnh. Hãy làm mới trang để thử lại!"
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
                                  "Đã có vấn đề khi thêm ảnh. Hãy làm mới trang để thử lại!"
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
                                  "Đã có vấn đề khi thêm ảnh. Hãy làm mới trang để thử lại!"
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
                          "Đã có vấn đề khi thêm ảnh. Hãy làm mới trang để thử lại!"
                        );
                      }
                    }}
                    variant="outline"
                    className="mt-3 flex items-center justify-center w-full max-w-sm"
                  >
                    <ImagePlus className="w-4 h-4" />
                    Upload an Image
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
