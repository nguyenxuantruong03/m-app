"use client";
import { Cake, Captions, ChevronRight, Contact, ImageUp, MapPin, Phone, SquareUser, Trash, User, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAccountByUserId } from "@/data/account";
import { redirect } from "next/navigation";
import SheetInfomation from "../showsheet/sheet-infomation";
import { format } from "date-fns";

interface InfoUserProps {
  user: any;
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

const InfoUser: React.FC<InfoUserProps> = ({ user }) => {
  const [account, setAccount] = useState<AccountItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        redirect("/auth/login");
      }

      try {
        const accountData = await getAccountByUserId(user.id);
        setAccount(accountData || null);
      } catch (error) {
        toast.error("Invalid Error");
      }
    };

    fetchData();
  }, [user]);

  const imageCredentials = user?.imageCredential[0] || undefined;
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
    user?.image;

    const formatDate = (dateString:Date) => {
      if (!dateString) return 'Chưa cập nhật';
      const formattedDate = format(new Date(dateString), 'dd/MM/yyyy');
      return formattedDate;
    };

  const infousers = [
    {
      name: <span className="flex items-center"><Contact className="h-4 w-4 mr-1"/>Họ và tên</span>,
      state: user.name || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "name", // Add a key to identify the item
    },
    {
      name: <span className="flex items-center"><SquareUser className="h-4 w-4 mr-1"/>Tên người dùng</span>,
      state: user.nameuser || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "nameuser",
    },
    {
      name: <span className="flex items-center"><User className="h-4 w-4 mr-1"/>Email</span>,
      state: user.email || "Chưa cập nhật",
    },
    {
      name: <span className="flex items-center"><Captions className="h-4 w-4 mr-1"/>Giới thiệu trang cá nhân</span>,
      state: user.bio || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "bio",
    },
    {
      name: <span className="flex items-center"><Users className="h-4 w-4 mr-1"/>Giới tính</span>,
      state: user.gender || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "gender",
    },
    {
      name: <span className="flex items-center"><Phone className="h-4 w-4 mr-1"/>Số điện thoại</span>,
      state: user.phonenumber || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "phonenumber",
    },
    {
      name: <span className="flex items-center"><Cake className="h-4 w-4 mr-1"/>Sinh nhật</span>,
      state: formatDate(user.dateofbirth) || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "dateofbirth",
    },
    {
      name: <span className="flex items-center"><MapPin className="h-4 w-4 mr-1"/>Địa chỉ</span>,
      state: user.address || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "address",
    },
    {
      name: <span className="flex items-center"><MapPin className="h-4 w-4 mr-1"/>Địa chỉ khác</span>,
      state: user.addressother || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "addressother",
    },
    {
      name: <span className="flex items-center"><Trash className="h-4 w-4 mr-1"/>Xóa tài khoản</span>,
      state: user.email || "Chưa cập nhật",
      icons: (
        <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
      ),
      key: "email",
    },
    {
      name: <span className="flex items-center mb-2"><ImageUp className="h-4 w-4 mr-1"/>Ảnh đại diện</span>,
      state: (
        <Avatar>
          {isGitHubOrGoogleUser && avatarImage ? (
            <AvatarImage src={avatarImage} />
          ) : avatarImage ? (
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
  ];

  const wrapWithSheet = (infouser: any, content: React.ReactNode) => {
    if (
      infouser.key === "name" ||
      infouser.key === "nameuser" ||
      infouser.key === "bio" ||
      infouser.key === "gender" ||
      infouser.key === "phonenumber" ||
      infouser.key === "dateofbirth" ||
      infouser.key === "address" ||
      infouser.key === "addressother" || 
      infouser.key === "avatar" ||
      infouser.key === "email"
    ) {
      return (
        <SheetInfomation
          name={user.name}
          nameuser={user.nameuser}
          bio={user.bio}
          gender={user.gender}
          phonenumber={user.phonenumber}
          dateofbirth={user.dateofbirth}
          address={user.address}
          addressother={user.addressother}
          type={infouser.key} // Pass the key as type
        >
          {content}
        </SheetInfomation>
      );
    }
    return content;
  };

  return (
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
                    <div className="text-gray-600 break-all line-clamp-2">{infouser.state}</div>
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
  );
};

export default InfoUser;