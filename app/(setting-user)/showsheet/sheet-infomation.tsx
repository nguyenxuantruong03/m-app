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
import {
  translateChangeFrame,
  translateChangeFrameMessage,
  translateCurrentUsername,
  translateDeleteAccount,
  translateDeleteAccountWarning,
  translateEditAddress,
  translateEditBio,
  translateEditDateOfBirth,
  translateEditDisplayBio,
  translateEditFavorite,
  translateEditGender,
  translateEditName,
  translateEditPhoneNumber,
  translateEditValidPhoneNumber,
  translateEditYourAddress,
  translateEditYourDateOfBirth,
  translateEditYourGender,
  translateFavorite,
  translateNameDisplay,
  translateNotChange,
  translatePopular,
  translateProfileUrlChange,
} from "@/translate/translate-client";

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
  languageToUse: string;
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  languageToUse,
}) => {
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

  //language
  const noChangeMessage = translateNotChange(languageToUse);

  const infoMap = {
    frame: {
      title: translateChangeFrame(languageToUse),
      description: translateChangeFrameMessage(languageToUse),
      form: <FormAvatarandFrame languageToUse={languageToUse} />,
    },
    name: {
      title: translateEditName(languageToUse, name),
      description: translateNameDisplay(languageToUse, name),
      form: <FormName languageToUse={languageToUse} />,
    },
    nameuser: {
      title: translateProfileUrlChange(languageToUse, nameuser),
      description: translateCurrentUsername(languageToUse, nameuser),
      form: <FormNameUser languageToUse={languageToUse} />,
    },
    bio: {
      title: translateEditBio(languageToUse, bio),
      description: translateEditDisplayBio(languageToUse, bio),
      form: <FormBio languageToUse={languageToUse} />,
    },
    gender: {
      title: translateEditGender(languageToUse, gender),
      description: translateEditYourGender(languageToUse, gender),
      form: <FormGender languageToUse={languageToUse} />,
    },
    phonenumber: {
      title: translateEditPhoneNumber(languageToUse, phonenumber),
      description: translateEditValidPhoneNumber(languageToUse, phonenumber),
      form: <FormPhoneNumber languageToUse={languageToUse} />,
    },
    dateofbirth: {
      title: translateEditDateOfBirth(languageToUse, dateofbirth),
      description: translateEditYourDateOfBirth(languageToUse, dateofbirth),
      form: <FormDateOfBirth languageToUse={languageToUse} />,
    },
    address: {
      title: translateEditAddress(languageToUse, address),
      description: translateEditYourAddress(languageToUse, address),
      form: <FormAddress languageToUse={languageToUse} />,
    },
    addressother: {
      title: translateEditAddress(languageToUse, addressother),
      description: translateEditYourAddress(languageToUse, addressother),
      form: <FormAddressOther languageToUse={languageToUse} />,
    },
    email: {
      title: translateDeleteAccount(languageToUse),
      description: translateDeleteAccountWarning(languageToUse),
      form: <FormDeleteAccount languageToUse={languageToUse} />,
    },
    favorite: {
      title: translateFavorite(languageToUse),
      description: `${translateEditFavorite(languageToUse)} ${
        favorite.length > 0
          ? favorite
              .map((item) =>
                item === "phobien"
                  ? translatePopular(languageToUse)
                  : item || noChangeMessage
              )
              .join(", ") + "."
          : [noChangeMessage]
      }`,
      form: (
        <FormFavorite
          languageToUse={languageToUse}
          dataallfavorite={dataallfavorite}
          loadingFavorite={loadingFavorite}
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
