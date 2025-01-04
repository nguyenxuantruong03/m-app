"use client";
import { useState, useEffect } from "react";
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
import FormDeleteAccount from "../components/form/form-infomation/form-delete-account";
import FormFavorite from "../components/form/form-infomation/form-favorite";
import { Favorite } from "@prisma/client";
import FormAvatarandFrame from "../components/form/form-infomation/form-avatar-frame";
import { useTranslations } from "next-intl";

interface SheetInfomationProps {
  name?: string | null;
  nameuser?: string | null;
  bio?: string | null;
  gender?: string | null;
  phonenumber?: string | null;
  dateofbirth?: string | null;
  address?: string | null;
  addressother?: string | null;
  children: React.ReactNode;
  userId: string;
  favorite: string[];
  dataallfavorite: Favorite[];
  role: string | undefined;
  isCustomWarehouse: boolean | undefined;
  loadingFavorite?: boolean;
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
  languageToUse: string;
  type:
    | "name"
    | "nameuser"
    | "bio"
    | "gender"
    | "phonenumber"
    | "dateofbirth"
    | "address"
    | "addressother"
    | "email"
    | "favorite"
    | "frame"; // Add type to specify the prop to display
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
  favorite,
  dataallfavorite,
  role,
  userId,
  setAlertGuestModal,
  isCustomWarehouse,
  loadingFavorite,
  languageToUse
}) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

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

  const infoMap = {
    frame: {
      title: t("info.editFrame"),
      description: t("info.editFrameDescription"),
      form: <FormAvatarandFrame languageToUse={languageToUse}/>,
    },
    name: {
      title: t("info.editName",{name: name || t("info.notChange")}),
      description: t("info.editNameDescription", {name: name|| t("info.notChange")}),
      form: <FormName languageToUse={languageToUse}/>,
    },
    nameuser: {
      title: t("info.editNameuser", {nameuser: nameuser || t("info.notChange")}),
      description: t("info.editNameuserDescription",{nameuser: nameuser || t("info.notChange")}),
      form: <FormNameUser languageToUse={languageToUse}/>,
    },
    bio: {
      title: t("info.editBio", {bio: bio || t("info.notChange")}),
      description: t("info.editBioDescription", {bio: bio || t("info.notChange")}),
      form: <FormBio languageToUse={languageToUse}/>,
    },
    gender: {
      title: t("info.editGender", {gender: gender || t("info.notChange")}),
      description: t("info.editGenderDescription",{gender: gender || t("info.notChange")}),
      form: <FormGender languageToUse={languageToUse}/>,
    },
    phonenumber: {
      title: t("info.editPhonenumber", {phonenumber: phonenumber || t("info.notChange")}),
      description: t("info.editPhonenumberDescription", {phonenumber: phonenumber || t("info.notChange")}),
      form: <FormPhoneNumber languageToUse={languageToUse}/>,
    },
    dateofbirth: {
      title: t("info.editBirthday", {birthday: dateofbirth || t("info.notChange")}),
      description: t("info.editBirthdayDescription", {birthday: dateofbirth || t("info.notChange")}),
      form: <FormDateOfBirth languageToUse={languageToUse}/>,
    },
    address: {
      title: t("info.editAddress", {address: address || t("info.notChange")}),
      description: t("info.editAddressDescription", {address: address || t("info.notChange")}),
      form: <FormAddress languageToUse={languageToUse}/>,
    },
    addressother: {
      title: t("info.editAddressOther", {addressother: addressother || t("info.notChange")}),
      description: t("info.editAddressOtherDescription", {addressother: addressother || t("info.notChange")}),
      form: <FormAddressOther languageToUse={languageToUse}/>,
    },
    email: {
      title: t("info.deleteAccount"),
      description: t("info.DeleteAccountWarning"),
      form: <FormDeleteAccount />,
    },
    favorite: {
      title: t("info.favorite"),
      description: `${t("info.editFavorite")}: ${
        favorite.length > 0
          ? favorite
              .map((item) =>
                item === "phobien"
                  ? t("info.popular")
                  : item || t("info.notChange")
              )
              .join(", ") + "."
          : [t("info.notChange")]
      }`,
      form: (
        <FormFavorite
          dataallfavorite={dataallfavorite}
          loadingFavorite={loadingFavorite}
          languageToUse={languageToUse}
        />
      ),
    },
  };

  const { title, description, form } = infoMap[type];

  useEffect(() => {
    const handleScroll = () => {
      setIsHidden(window.scrollY >= 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to ensure this only registers once

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={`${
          isCustomWarehouse
            ? `${
                isHidden
                  ? "w-full md:w-3/4 max-h-[82%] md:max-h-max space-y-4"
                  : "w-full md:w-3/4 max-h-[75%] md:max-h-max space-y-4"
              }`
            : "w-full md:w-3/4 max-h-[80%] md:max-h-max space-y-4"
        }`}
        side="center"
      >
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
