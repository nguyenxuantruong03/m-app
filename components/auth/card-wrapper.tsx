"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";
import { Dispatch, SetStateAction } from "react";

interface CardWarpper {
  children?: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  setLanguage: Dispatch<SetStateAction<string>>;
  languageToUse: string;
  isPending?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

const CardWrapper: React.FC<CardWarpper> = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  setLanguage,
  languageToUse,
  isPending,
  setOpen,
  isOpen,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header
          label={headerLabel}
          setLanguage={setLanguage}
          languageToUse={languageToUse}
          isPending={isPending}
          setOpen={setOpen}
          isOpen={isOpen}
        />
      </CardHeader>

      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
