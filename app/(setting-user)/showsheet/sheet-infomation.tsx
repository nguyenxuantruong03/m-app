"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FormName from "../components/form/form-infomation/form-name";
import FormPhoneNumber from "../components/form/form-infomation/form-phonenumber";
import FormNameUser from "../components/form/form-infomation/form-nameuser";
import FormGender from "../components/form/form-infomation/form-gender";
import FormDateOfBirth from "../components/form/form-infomation/form-dateofbirth";
import FormAddress from "../components/form/form-infomation/form-address";
import FormAddressOther from "../components/form/form-infomation/form-addressother";
import FormBio from "../components/form/form-infomation/form-bio";
import FormImageCredential from "../components/form/form-infomation/form-imageCredential";

interface SheetInfomationProps {
  name?: string;
  nameuser?: string;
  bio?: string;
  gender?: string;
  phonenumber?: string;
  dateofbirth?: string;
  address?: string;
  addressother?: string;
  children: React.ReactNode;
  type: "name" | "nameuser" | "bio" | "gender" | "phonenumber" | "dateofbirth" | "address" | "addressother" | "avatar"; // Add type to specify the prop to display
}

const SheetInfomation: React.FC<SheetInfomationProps> = ({
  name,
  nameuser,
  bio,
  gender,
  phonenumber,
  dateofbirth,
  address,
  addressother,
  children,
  type,
}) => {
  const [open, setOpen] = useState(false);

  const infoMap = {
    name: {
      title: `Chỉnh sửa tên: ${name || "Chưa thay đổi"}`,
      description: `Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn.: ${name || "Chưa thay đổi"}`,
      form: <FormName />
    },
    nameuser: {
      title: `URL trang cá nhân VLXD Xuân Trường của bạn sẽ bị thay đổi: ${nameuser || "Chưa thay đổi"}`,
      description: `Chỉnh sửa tên người dùng bắt buộc có @: ${nameuser || "Chưa thay đổi"}`,
      form: <FormNameUser />,
    },
    bio: {
      title: `Chỉnh sửa giới thiệu: ${bio || "Chưa thay đổi"}`,
      description: `Chỉnh sửa giới thiệu hiển thị ở trang cá nhân: ${bio || "Chưa thay đổi"}`,
      form: <FormBio />
    },
    gender: {
      title: `Chỉnh sửa giới tính: ${gender || "Chưa thay đổi"}`,
      description: `Chỉnh sửa giới tính của bản thân: ${gender || "Chưa thay đổi"}`,
      form: <FormGender />
    },
    phonenumber: {
      title: `Chỉnh sửa số điện thoại: ${phonenumber || "Chưa thay đổi"}`,
      description: `Chỉnh sửa số điện thoại phù hợp 10-11 số: ${phonenumber || "Chưa thay đổi"}`,
      form: <FormPhoneNumber />
    },
    dateofbirth: {
      title: `Chỉnh sửa sinh nhật: ${dateofbirth || "Chưa thay đổi"}`,
      description: `Chỉnh sửa sinh nhật: ${dateofbirth || "Chưa thay đổi"}`,
      form: <FormDateOfBirth/>
    },
    address: {
      title: `Chỉnh sửa địa chỉ: ${address || "Chưa thay đổi"}`,
      description: `Chỉnh sửa địa chỉ để không cần nhập lúc thanh toán: ${address || "Chưa thay đổi"}`,
      form: <FormAddress />
    },
    addressother: {
      title: `Chỉnh sửa địa chỉ khác: ${addressother || "Chưa thay đổi"}`,
      description: `Chỉnh sửa địa chỉ khác để không cần nhập lúc thanh toán: ${addressother || "Chưa thay đổi"}`,
      form: <FormAddressOther/>
    },
    avatar: {
      title: `Chỉnh sửa ảnh đại diện`,
      description: `Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết, bình luận, tin nhắn...`,
      form: <FormImageCredential/>
    },
  };

  const { title, description,form } = infoMap[type];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="space-y-4" side="center">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {form}
      </SheetContent>
    </Sheet>
  );
};

export default SheetInfomation;
