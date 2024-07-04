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
import FormLinkWebSite from "../components/form/form-social/form-linkwebsite";
import FormLinkGithub from "../components/form/form-social/form-linkgithub";
import FormLinkLinkedIn from "../components/form/form-social/form-linklinkedin";
import FormLinkFaceBook from "../components/form/form-social/form-linkfacebook";
import FormLinkYoutube from "../components/form/form-social/form-linkyoutube";
import FormLinkTiktok from "../components/form/form-social/form-linktiktok";
import FormLinkInstagram from "../components/form/form-social/form-linkinstagram";
import FormLinkTwitter from "../components/form/form-social/form-linktwitter";
import FormLinkOther from "../components/form/form-social/form-linkother";

interface SheetLinkSocialProps {
  linkwebsite: string | null;
  linkgithub: string | null;
  linklinkedin: string | null;
  linkfacebook: string | null;
  linkyoutube: string | null;
  linktiktok: string | null;
  linkinstagram: string | null;
  linktwitter: string | null;
  linkother: string | null;
  children: React.ReactNode;
  type:
    | "linkwebsite"
    | "linkgithub"
    | "linklinkedin"
    | "linkfacebook"
    | "linkyoutube"
    | "linktiktok"
    | "linkinstagram"
    | "linktwitter"
    | "linkother"; // Add type to specify the prop to display
}

const SheetLinkSocial: React.FC<SheetLinkSocialProps> = ({
  linkwebsite,
  linkgithub,
  linklinkedin,
  linkfacebook,
  linkyoutube,
  linktiktok,
  linkinstagram,
  linktwitter,
  linkother,
  children,
  type,
}) => {
  const [open, setOpen] = useState(false);

  const links = {
    linkwebsite: {
      title: `Chỉnh sửa link web cá nhân: ${linkwebsite || "Chưa thay đổi"}`,
      description: `Chỉnh sửa trang web cá nhân của bạn: ${linkwebsite || "Chưa thay đổi"}`,
      form: <FormLinkWebSite />
    },
    linkgithub: {
      title: `Chỉnh sửa link Github: ${linkgithub || "Chưa thay đổi"}`,
      description: `Chỉnh sửa link GitHub để tham khảo source code: ${linkgithub || "Chưa thay đổi"}`,
      form: <FormLinkGithub />
    },
    linklinkedin: {
      title: `Chỉnh sửa link Linkedin: ${linklinkedin || "Chưa thay đổi"}`,
      description: `Chỉnh sửa link Linkedin để hiển thị ở trang cá nhân: ${linklinkedin || "Chưa thay đổi"}`,
      form: <FormLinkLinkedIn />
    },
    linkfacebook: {
      title: `Chỉnh sửa link Facebook: ${linkfacebook || "Chưa thay đổi"}`,
      description: `Chỉnh sửa link Facebook để hiển thị ở trang cá nhân: ${linkfacebook || "Chưa thay đổi"}`,
      form: <FormLinkFaceBook />
    },
    linkyoutube: {
      title: `Chỉnh sửa link Youtube: ${linkyoutube || "Chưa thay đổi"}`,
      description: `Chỉnh sửa link Youtube để hiển thị ở trang cá nhân: ${linkyoutube || "Chưa thay đổi"}`,
      form: <FormLinkYoutube />
    },
    linktiktok: {
      title: `Chỉnh sửa link Tiktok: ${linktiktok || "Chưa thay đổi"}`,
      description: `Chỉnh sửa link Tiktok để hiển thị ở trang cá nhân: ${linktiktok || "Chưa thay đổi"}`,
      form: <FormLinkTiktok />
    },
    linkinstagram: {
      title: `Chỉnh sửa link Instagram: ${linkinstagram || "Chưa thay đổi"}`,
      description: `Chỉnh sửa link Instagram để hiển thị ở trang cá nhân: ${linkinstagram || "Chưa thay đổi"}`,
      form: <FormLinkInstagram/>
    },
    linktwitter: {
      title: `Chỉnh sửa link Twitter: ${linktwitter || "Chưa thay đổi"}`,
      description: `Chỉnh sửa link Twitter để hiển thị ở trang cá nhân: ${linktwitter || "Chưa thay đổi"}`,
      form: <FormLinkTwitter/>
    },
    linkother: {
      title: `Chỉnh sửa link Other: ${linkother || "Chưa thay đổi"}`,
      description: `Chỉnh sửa link Other để hiển thị ở trang cá nhân: ${linkother || "Chưa thay đổi"}`,
      form: <FormLinkOther/>
    },
  };

  const { title, description,form } = links[type];

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

export default SheetLinkSocial;
