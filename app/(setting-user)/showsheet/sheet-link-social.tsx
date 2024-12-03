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
import {
  translateEditFacebookLink,
  translateEditFacebookLinkForProfile,
  translateEditGithubLink,
  translateEditGithubLinkForCode,
  translateEditInstagramLink,
  translateEditInstagramLinkForProfile,
  translateEditLinkedinLink,
  translateEditLinkedinLinkForProfile,
  translateEditOtherLink,
  translateEditOtherLinkForProfile,
  translateEditPersonalWebsiteLink,
  translateEditTiktokLink,
  translateEditTiktokLinkForProfile,
  translateEditTwitterLink,
  translateEditTwitterLinkForProfile,
  translateEditYourPersonalWebsite,
  translateEditYoutubeLink,
  translateEditYoutubeLinkForProfile,
} from "@/translate/translate-client";

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
  languageToUse: string;
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  languageToUse,
}) => {
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
      title: translateEditPersonalWebsiteLink(languageToUse, linkwebsite),
      description: translateEditYourPersonalWebsite(languageToUse, linkwebsite),
      form: <FormLinkWebSite languageToUse={languageToUse} />,
    },
    linkgithub: {
      title: translateEditGithubLink(languageToUse, linkgithub),
      description: translateEditGithubLinkForCode(languageToUse, linkgithub),
      form: <FormLinkGithub languageToUse={languageToUse} />,
    },
    linklinkedin: {
      title: translateEditLinkedinLink(languageToUse, linklinkedin),
      description: translateEditLinkedinLinkForProfile(
        languageToUse,
        linklinkedin
      ),
      form: <FormLinkLinkedIn languageToUse={languageToUse} />,
    },
    linkfacebook: {
      title: translateEditFacebookLink(languageToUse, linkfacebook),
      description: translateEditFacebookLinkForProfile(
        languageToUse,
        linkfacebook
      ),
      form: <FormLinkFaceBook languageToUse={languageToUse} />,
    },
    linkyoutube: {
      title: translateEditYoutubeLink(languageToUse, linkyoutube),
      description: translateEditYoutubeLinkForProfile(
        languageToUse,
        linkyoutube
      ),
      form: <FormLinkYoutube languageToUse={languageToUse} />,
    },
    linktiktok: {
      title: translateEditTiktokLink(languageToUse, linktiktok),
      description: translateEditTiktokLinkForProfile(languageToUse, linktiktok),
      form: <FormLinkTiktok languageToUse={languageToUse} />,
    },
    linkinstagram: {
      title: translateEditInstagramLink(languageToUse, linkinstagram),
      description: translateEditInstagramLinkForProfile(
        languageToUse,
        linkinstagram
      ),
      form: <FormLinkInstagram languageToUse={languageToUse} />,
    },
    linktwitter: {
      title: translateEditTwitterLink(languageToUse, linktwitter),
      description: translateEditTwitterLinkForProfile(
        languageToUse,
        linktwitter
      ),
      form: <FormLinkTwitter languageToUse={languageToUse} />,
    },
    linkother: {
      title: translateEditOtherLink(languageToUse, linkother),
      description: translateEditOtherLinkForProfile(languageToUse, linkother),
      form: <FormLinkOther languageToUse={languageToUse} />,
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
