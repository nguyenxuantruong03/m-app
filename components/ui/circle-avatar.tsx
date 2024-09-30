import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "lucide-react";
import { UserRole } from "@prisma/client";

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

interface CircleAvatarProps {
  selectedFrame?: string;
  classImage?: string;
  srcFrame?: string;
  srcAvatar?: string;
  classAvatar?: string;
  widthFrame?: string | number;
  heightFrame?: string | number;
  isCitizen?: boolean;
  role?: string;
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
}: CircleAvatarProps) => {
  const user = useCurrentUser();
  const { width, height } = getFrameDimensions(user?.frameAvatar);

  const imageCredentials = user?.imageCredential || undefined;
  // Use the first image from imageCredential hoăc ảnh iamge nêu ko có thì dùng deafault
  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials : null) ||
    user?.image;
  return (
    <>
      <div className="relative">
        <div
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${classAvatar}`}
        >
          <Avatar>
            { srcAvatar ? (
              <AvatarImage src={srcAvatar} />
            ) : avatarImage ? (
              <AvatarImage src={avatarImage} />
            ) : (
              <AvatarFallback className="bg-sky-500">
                <User className="text-white" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <Image
          src={selectedFrame || srcFrame || "/avatar-frame/frame-0.png"}
          alt="Avatar Frame"
          width={typeof widthFrame === "number" ? widthFrame : width}
          height={typeof heightFrame === "number" ? heightFrame : height}
          className={`relative z-50 ${classImage}`}
        />
        {isCitizen ? (
          role === UserRole.ADMIN ? (
            //Tích xanh dương
            <svg className="absolute bottom-2 z-50 right-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 48 48"> <polygon fill="#42a5f5" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon><polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon> </svg>
          ) : role === UserRole.USER || role === UserRole.GUEST ? (
            "" // Không hiển thị gì
          ) : (
            //Tích xanh lá
            <svg className="absolute bottom-2 z-50 right-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0,0,256,256" style={{ fill: "#000000" }}> <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.33333,5.33333)"><path d="M29.62,3l3.433,5.308l6.314,0.316l0.319,6.313l5.311,3.43l-2.881,5.628l2.884,5.625l-5.308,3.433l-0.316,6.314l-6.313,0.319l-3.43,5.311l-5.628,-2.881l-5.625,2.884l-3.433,-5.308l-6.314,-0.316l-0.319,-6.313l-5.311,-3.43l2.881,-5.628l-2.884,-5.625l5.308,-3.433l0.316,-6.314l6.313,-0.319l3.43,-5.311l5.628,2.881z" fill="#53e066"></path><path d="M21.396,31.255l-6.497,-6.495l2.122,-2.121l4.407,4.407l9.568,-9.274l2.088,2.154z" fill="#ffffff"></path></g></g> </svg>
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CircleAvatar;
