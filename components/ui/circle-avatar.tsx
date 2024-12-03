"use client";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "lucide-react";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { LiveBadge } from "../live-badge";
import { cn } from "@/lib/utils";
import ImageCellOne from "../image-cell-one";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const getFrameDimensions = (frame: string | undefined) => {
  if (frame?.startsWith("/avatar-frame/frame-special")) {
    switch (frame) {
      case "/avatar-frame/frame-special-2.png":
        return { width: 52, height: 52 };
      case "/avatar-frame/frame-special-5.gif":
        return { width: 48, height: 48 };
      case "/avatar-frame/frame-special-7.gif":
        return { width: 75, height: 75 };
      case "/avatar-frame/frame-special-8.gif":
        return { width: 100, height: 100 };
      case "/avatar-frame/frame-special-9.gif":
        return { width: 70, height: 70 };
      case "/avatar-frame/frame-special-10.gif":
        return { width: 80, height: 80 };
      case "/avatar-frame/frame-special-11.gif":
        return { width: 65, height: 65 };
      case "/avatar-frame/frame-special-12.gif":
      case "/avatar-frame/frame-special-13.gif":
        return { width: 70, height: 70 };
      case "/avatar-frame/frame-special-14.gif":
        return { width: 120, height: 120 };
      case "/avatar-frame/frame-special-15.gif":
        return { width: 60, height: 60 };
      case "/avatar-frame/frame-special-16.gif":
      case "/avatar-frame/frame-special-17.gif":
      case "/avatar-frame/frame-special-18.gif":
        return { width: 65, height: 65 };

      default:
        return { width: 50, height: 50 };
    }
  } else if (frame?.startsWith("/avatar-frame/frame-")) {
    switch (frame) {
      case "/avatar-frame/frame-2.png":
        return { width: 75, height: 75 };
      case "/avatar-frame/frame-22.png":
        return { width: 95, height: 95 };
      case "/avatar-frame/frame-61.png":
      case "/avatar-frame/frame-68.png":
      case "/avatar-frame/frame-69.png":
        return { width: 60, height: 60 };
      default:
        return { width: 65, height: 65 }; // Default size for frames /avatar-frame/frame-1.png to /avatar-frame/frame-80.png
    }
  } else {
    return { width: 65, height: 65 }; // Default size for any other frames
  }
};

interface CircleAvatarProps extends VariantProps<typeof avatarSizes> {
  selectedFrame?: string;
  classImage?: string;
  srcFrame?: string;
  srcAvatar?: string;
  classAvatar?: string;
  widthFrame?: string | number;
  heightFrame?: string | number;
  isCitizen?: boolean;
  role?: string;
  isLive?: boolean;
  nameuser?: string;
  showBadge?: boolean;
  notLink?: boolean;
  isResultCustom?: boolean;
  hideCitizenandBadge?: boolean;
  isSizeLg?: boolean;
  notShowBadge?: boolean;
  isVideoCustom?: boolean;
  isCustomItemCard?: boolean;
  isCustomCard?: boolean;
}

const CircleAvatar = ({
  selectedFrame,
  srcAvatar,
  classImage,
  srcFrame,
  classAvatar,
  widthFrame,
  heightFrame,
  isCitizen,
  role,
  isLive,
  nameuser,
  size,
  showBadge,
  notShowBadge = false,
  notLink = false,
  isResultCustom = false,
  hideCitizenandBadge = false,
  isSizeLg = false,
  isVideoCustom = false,
  isCustomItemCard= false,
  isCustomCard= false,
}: CircleAvatarProps) => {
  const canShowBadge =
    showBadge && isLive && !isResultCustom && !isSizeLg && !notLink;
  const user = useCurrentUser();
  const { width, height } = getFrameDimensions(user?.frameAvatar);
  const [showImage, setShowImage] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []); 

  //language
  const languageToUse =
  user?.id && user?.role !== "GUEST" ? user?.language : storedLanguage || "vi";

  const openImage = () => setShowImage(true);

  const imageCredentials = user?.imageCredential || undefined;
  // Use the first image from imageCredential hoăc ảnh iamge nêu ko có thì dùng deafault
  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials : null) ||
    user?.image;

  return (
    <>
      <div className={`relative`}>
        <div
            className={cn(
            "absolute w-full h-full flex items-center justify-center",
            classAvatar,
            isVideoCustom ? "-top-12 left-2" : "top-0 left-0",
            isLive && isCustomItemCard ? "-left-5 -top-0.5" : "",
            isLive && isCustomCard ? "top-5 -left-10" : "" // Thêm class khi cả isLive và isCustomCard là true
          )}
        >
          {notLink ? (
            <>
              <Avatar
                className={cn(
                  isLive && "ring-2 ring-rose-500 border border-background",
                  avatarSizes({ size })
                )}
              >
                {avatarImage ? (
                <ImageCellOne imageUrl={avatarImage} showImage={showImage} languageToUse={languageToUse}/>
                ) : (
                  <AvatarFallback className="bg-sky-500">
                    <User className="text-white" />
                  </AvatarFallback>
                )}
              </Avatar>
            </>
          ) : (
            <>
              {isLive ? (
                <Link href={`/live/${nameuser}`}>
                  <Avatar
                    className={cn(
                      isLive && "ring-2 ring-rose-500 border border-background",
                      avatarSizes({ size })
                    )}
                  >
                    {srcAvatar ? (
                      <AvatarImage src={srcAvatar} />
                    ) : avatarImage ? (
                      <AvatarImage src={avatarImage} />
                    ) : (
                      <AvatarFallback className="bg-sky-500">
                        <User className="text-white" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Link>
              ) : (
                  <Avatar>
                    {srcAvatar ? (
                      <AvatarImage src={srcAvatar} />
                    ) : avatarImage ? (
                      <AvatarImage src={avatarImage} />
                    ) : (
                      <AvatarFallback className="bg-sky-500">
                        <User className="text-white" />
                      </AvatarFallback>
                    )}
                  </Avatar>
              )}
            </>
          )}
          {!hideCitizenandBadge && (
            <>
              {isLive &&
                !notShowBadge &&
                !showBadge &&
                !isResultCustom &&
                !isSizeLg &&
                !notLink && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                  </div>
                )}
              {canShowBadge && (
                <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2">
                  <LiveBadge />
                </div>
              )}
              {isLive && isResultCustom && (
                <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2">
                  <LiveBadge />
                </div>
              )}
              {isLive && isSizeLg && !notLink && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <LiveBadge />
                </div>
              )}
            </>
          )}
          {
            !isVideoCustom && (
              <>
          {isLive && notLink && (
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
              <LiveBadge />
            </div>
          )}
          </>
            )
          }
        </div>
        {!isLive && !hideCitizenandBadge && (
          <Link href={`/user/${nameuser}`}>
            <Image
              onClick={openImage}
              src={selectedFrame || srcFrame || "/avatar-frame/frame-0.png"}
              alt="Avatar Frame"
              width={typeof widthFrame === "number" ? widthFrame : width}
              height={typeof heightFrame === "number" ? heightFrame : height}
              className={`relative z-50 cursor-pointer ${classImage}`}
            />
          </Link>
        )}
        <>
          {!hideCitizenandBadge && (
            <>
              {isCitizen ? (
                role === UserRole.ADMIN ? (
                  //Tích xanh dương
                  <svg
                  className={`absolute z-50 ${
                    isLive && isCustomCard
                      ? "-left-8 -bottom-11" // Nếu cả isLive và isCustomCard là true
                      : isLive && isCustomItemCard
                      ? "-left-3 -bottom-5" // Nếu cả isLive và isCustomItemCard đều true
                      : isLive && notShowBadge
                      ? "left-1 -bottom-6" // Nếu chỉ isLive và notShowBadge là true
                      : isLive
                      ? isResultCustom
                        ? "left-2 -bottom-5" // Nếu chỉ isLive và isResultCustom là true
                        : "left-2 -bottom-6" // Nếu chỉ isLive là true
                      : "bottom-2 right-2" // Nếu không thỏa điều kiện nào ở trên
                  }`}
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                  >
                    <polygon
                      fill="#42a5f5"
                      points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                    ></polygon>
                    <polygon
                      fill="#fff"
                      points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                    ></polygon>{" "}
                  </svg>
                ) : role === UserRole.USER || role === UserRole.GUEST ? (
                  "" // Không hiển thị gì
                ) : (
                  //Tích xanh lá
                  <svg
                    className="absolute bottom-2 z-50 right-2"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="18"
                    height="18"
                    viewBox="0,0,256,256"
                    style={{ fill: "#000000" }}
                  >
                    {" "}
                    <g
                      fill="none"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(5.33333,5.33333)">
                        <path
                          d="M29.62,3l3.433,5.308l6.314,0.316l0.319,6.313l5.311,3.43l-2.881,5.628l2.884,5.625l-5.308,3.433l-0.316,6.314l-6.313,0.319l-3.43,5.311l-5.628,-2.881l-5.625,2.884l-3.433,-5.308l-6.314,-0.316l-0.319,-6.313l-5.311,-3.43l2.881,-5.628l-2.884,-5.625l5.308,-3.433l0.316,-6.314l6.313,-0.319l3.43,-5.311l5.628,2.881z"
                          fill="#53e066"
                        ></path>
                        <path
                          d="M21.396,31.255l-6.497,-6.495l2.122,-2.121l4.407,4.407l9.568,-9.274l2.088,2.154z"
                          fill="#ffffff"
                        ></path>
                      </g>
                    </g>{" "}
                  </svg>
                )
              ) : (
                ""
              )}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default CircleAvatar;


export const UserAvatarSkeleton = ({
  size,
}: VariantProps<typeof avatarSizes>) => {
  return (
    <Skeleton
      className={cn("rounded-full", avatarSizes({ size }))}
    />
  );
};
