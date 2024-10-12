"use client";
import {
  Cake,
  Captions,
  ChevronRight,
  Contact,
  Frame,
  Heart,
  MapPin,
  Phone,
  SquareUser,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import SheetInfomation from "../showsheet/sheet-infomation";
import { format } from "date-fns";
import { Favorite, User as Userdata } from "@prisma/client";
import FormImageCredential from "./form/form-infomation/form-imageCredential";
import Image from "next/image";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";

interface InfoUserProps {
  user: Userdata;
  favorite: Favorite[];
  imageCredential: string;
}

interface InfoUser {
  key?: string;
  name: JSX.Element;
  state: React.ReactNode;
  icons?: JSX.Element;
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

const InfoUser: React.FC<InfoUserProps> = ({
  user,
  favorite,
  imageCredential,
}) => {
  const [open, setOpen] = useState(false);
  const [alertGuestModal, setAlertGuestModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        redirect("/auth/login");
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'; // Ngăn chặn cuộn
    } else {
      document.body.style.overflow = 'auto'; // Khôi phục cuộn
    }

    // Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const imageCredentials = imageCredential || undefined;
  // Use the first image from imageCredential hoăc ảnh iamge nêu ko có thì dùng deafault
  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials : null) ||
    user?.image;

  const formatDate = (dateString: Date | null) => {
    if (!dateString) return "Chưa cập nhật"; // Return a default message if date is null
    const formattedDate = format(dateString, "dd/MM/yyyy"); // Safe to use dateString here as it's guaranteed to be non-null
    return formattedDate;
  };

  const infousers = [
    {
      name: (
        <span className="flex items-center mb-2">
          <Contact className="h-4 w-4 mr-1" />
          Ảnh đại diện
        </span>
      ),
      state: (
        <Avatar>
          {avatarImage ? (
            <AvatarImage src={avatarImage} />
          ) : (
            <AvatarFallback className="bg-sky-500">
              <User className="text-white" />
            </AvatarFallback>
          )}
        </Avatar>
      ),
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "avatar",
    },
    {
      name: (
        <span className="flex items-center">
          <Frame className="h-4 w-4 mr-1" />
          Khung ảnh
        </span>
      ),
      state: (
        <Image
          alt="404"
          width="60"
          height="60"
          src={user.frameAvatar || "/avatar-frame/frame-1.png"}
          loading="lazy"
        />
      ),
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "frame", // Add a key to identify the item
    },
    {
      name: (
        <span className="flex items-center">
          <Contact className="h-4 w-4 mr-1" />
          Họ và tên
        </span>
      ),
      state: user.name || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "name", // Add a key to identify the item
    },
    {
      name: (
        <span className="flex items-center">
          <SquareUser className="h-4 w-4 mr-1" />
          Tên người dùng
        </span>
      ),
      state: user.nameuser || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "nameuser",
    },
    {
      name: (
        <span className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          Email
        </span>
      ),
      state: user.email || "Chưa cập nhật",
    },
    {
      name: (
        <span className="flex items-center">
          <Captions className="h-4 w-4 mr-1" />
          Giới thiệu trang cá nhân
        </span>
      ),
      state: user.bio || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "bio",
    },
    {
      name: (
        <span className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          Giới tính
        </span>
      ),
      state: (
        <>
          {user.gender ? (
            <span className="flex items-center">
              {user.gender === "Male" ? (
                <Image
                  src="/images/male.png"
                  width="50"
                  height="50"
                  alt="Nam"
                  className="h-4 w-4 mr-2"
                  loading="lazy"
                />
              ) : user.gender === "Female" ? (
                <Image
                  src="/images/female.png"
                  alt="Nữ"
                  width="50"
                  height="50"
                  className="h-4 w-4 mr-2"
                  loading="lazy"
                />
              ) : user.gender === "None" ? (
                <Image
                  src="/images/other.png"
                  alt="Khác"
                  width="50"
                  height="50"
                  className="h-4 w-4 mr-2"
                  loading="lazy"
                />
              ) : null}
              {user.gender === "Male"
                ? "Nam"
                : user.gender === "Female"
                ? "Nữ"
                : "Khác"}
            </span>
          ) : (
            "Chưa cập nhật"
          )}
        </>
      ),
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "gender",
    },
    {
      name: (
        <span className="flex items-center">
          <Phone className="h-4 w-4 mr-1" />
          Số điện thoại
        </span>
      ),
      state: user.phonenumber || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "phonenumber",
    },
    {
      name: (
        <span className="flex items-center">
          <Cake className="h-4 w-4 mr-1" />
          Sinh nhật
        </span>
      ),
      state: formatDate(user?.dateofbirth) || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "dateofbirth",
    },
    {
      name: (
        <span className="flex items-center">
          <Heart className="h-4 w-4 mr-1" />
          Ưa thích
        </span>
      ),
      state:
        user.favorite.length > 0
          ? user.favorite
              .map((item: string) =>
                item === "phobien" ? "Phổ biến" : item || "Chưa thay đổi"
              )
              .join(", ") + "."
          : ["Chưa thay đổi"],

      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "favorite",
    },
    {
      name: (
        <span className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          Địa chỉ
        </span>
      ),
      state: user.address || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "address",
    },
    {
      name: (
        <span className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          Địa chỉ khác
        </span>
      ),
      state: user.addressother || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "addressother",
    },
    {
      name: (
        <span className="flex items-center">
          <Trash2 className="h-4 w-4 mr-1" />
          Xóa tài khoản
        </span>
      ),
      state: user.email || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "email",
    },
  ];

  const wrapWithSheet = (infouser: InfoUser, content: React.ReactNode) => {
    if (infouser.key === "avatar") {
      // Handle click event for avatar
      if (user.role !== "GUEST" && user?.id) {
        return <div onClick={() => setOpen(true)}>{content}</div>;
      } else {
        return <div onClick={() => setAlertGuestModal(true)}>{content}</div>;
      }
    } else if (
      infouser.key === "name" ||
      infouser.key === "nameuser" ||
      infouser.key === "bio" ||
      infouser.key === "gender" ||
      infouser.key === "phonenumber" ||
      infouser.key === "dateofbirth" ||
      infouser.key === "address" ||
      infouser.key === "addressother" ||
      infouser.key === "email" ||
      infouser.key === "favorite" ||
      infouser.key === "frame"
    ) {
      return (
        <SheetInfomation
          name={user.name}
          nameuser={user.nameuser}
          bio={user.bio}
          gender={user.gender}
          phonenumber={user.phonenumber}
          dateofbirth={formatDate(user.dateofbirth)}
          address={user.address}
          addressother={user.addressother}
          favorite={user.favorite}
          type={infouser.key} // Pass the key as type
          dataallfavorite={favorite}
          role={user.role}
          userId={user?.id || ""}
          setAlertGuestModal={setAlertGuestModal}
        >
          {content}
        </SheetInfomation>
      );
    }
    return content;
  };

  return (
    <>
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
      />
      {open && (
        <>
          <div className="fixed inset-0 bg-black/80 h-full w-full z-40 flex items-center justify-center">
            <div className="h-max w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-50">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground break-all line-clamp-2 text-white">
                  Chỉnh sửa ảnh đại diện{" "}
                </span>
                <span
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-sm hover:rounded-full hover:bg-gray-500 hover:bg-opacity-50 p-3 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none "
                >
                  <X className="h-5 w-5 text-white" />
                </span>
              </div>
              <div className="text-sm text-muted-foreground break-all line-clamp-3">
                Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các
                bài viết, bình luận, tin nhắn...
              </div>
              <FormImageCredential setOpen={setOpen}/>
            </div>
          </div>
        </>
      )}

      <div className="dark:bg-white bg-slate-900 rounded-md overflow-hidden my-2">
        {infousers.map((infouser) => (
          <div key={infouser.key}>
            {wrapWithSheet(
              infouser,
              <div className="cursor-pointer hover:bg-slate-300 hover:bg-opacity-40">
                <div>
                  <div className="flex items-center justify-between px-4 py-2">
                    <div>
                      <div className="font-semibold text-white dark:text-slate-900">
                        {infouser.name}
                      </div>
                      <div className="text-gray-600 break-all line-clamp-2">
                        {infouser.state}
                      </div>
                    </div>
                    <div>{infouser.icons}</div>
                  </div>
                </div>
              </div>
            )}
            <Separator className="border-[1px] border-gray-400" />
          </div>
        ))}
      </div>
    </>
  );
};

export default InfoUser;
