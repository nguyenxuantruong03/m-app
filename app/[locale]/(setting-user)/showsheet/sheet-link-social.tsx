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
import { useTranslations } from "next-intl";

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
  role: string | undefined;
  userId: string;
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
  languageToUse: string;
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
  role,
  userId,
  setAlertGuestModal,
  languageToUse
}) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      if (role !== "GUEST" && userId) {
        setOpen(true);
      } else {
        setAlertGuestModal(true);
      }
    } else {
      setOpen(false);
    }
  };

  const links = {
    linkwebsite: {
      title: t("info.editPersonalWebsiteLink", {linkwebsite: linkwebsite || t("info.notUpdated")}),
      description: t("info.editPersonalWebsiteLinkDescription", {linkwebsite: linkwebsite || t("info.notUpdated")}),
      form: <FormLinkWebSite languageToUse={languageToUse}/>,
    },
    linkgithub: {
      title: t("info.editGithubLink", {linkgithub: linkgithub || t("info.notUpdated")}),
      description: t("info.editGithubLinkDescription", {linkgithub: linkgithub || t("info.notUpdated")}),
      form: <FormLinkGithub languageToUse={languageToUse}/>,
    },
    linklinkedin: {
      title: t("info.editLinkedinLink", {linklinkedin: linklinkedin || t("info.notUpdated")}),
      description: t("info.editLinkedinLinkDescription", {linklinkedin: linklinkedin || t("info.notUpdated")}),
      form: <FormLinkLinkedIn languageToUse={languageToUse}/>,
    },
    linkfacebook: {
      title: t("info.editFacebookLink", {linkfacebook: linkfacebook || t("info.notUpdated")}),
      description: t("info.editFacebookLinkDescription", {linkfacebook: linkfacebook || t("info.notUpdated")}),
      form: <FormLinkFaceBook languageToUse={languageToUse}/>,
    },
    linkyoutube: {
      title: t("info.editYoutubeLink", {linkyoutube: linkyoutube || t("info.notUpdated")}),
      description: t("info.editYoutubeLinkDescription", {linkyoutube: linkyoutube || t("info.notUpdated")}),
      form: <FormLinkYoutube languageToUse={languageToUse}/>,
    },
    linktiktok: {
      title: t("info.editTiktokLink", {linktiktok: linktiktok || t("info.notUpdated")}),
      description: t("info.editTiktokLinkDescription", {linktiktok: linktiktok || t("info.notUpdated")}),
      form: <FormLinkTiktok languageToUse={languageToUse}/>,
    },
    linkinstagram: {
      title: t("info.editInstagramLink", {linkinstagram: linkinstagram || t("info.notUpdated")}),
      description: t("info.editInstagramLinkDescription", {linkinstagram: linkinstagram || t("info.notUpdated")}),
      form: <FormLinkInstagram languageToUse={languageToUse}/>,
    },
    linktwitter: {
      title: t("info.editTwitterLink", {linktwitter: linktwitter || t("info.notUpdated")}),
      description: t("info.editTwitterLinkDescription", {linktwitter: linktwitter || t("info.notUpdated")}),
      form: <FormLinkTwitter languageToUse={languageToUse}/>,
    },
    linkother: {
      title: t("info.editOtherLink", {linkother: linkother || t("info.notUpdated")}),
      description: t("info.editOtherLinkDescription", {linkother: linkother || t("info.notUpdated")}),
      form: <FormLinkOther languageToUse={languageToUse}/>,
    },
  };

  const { title, description, form } = links[type];

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
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
