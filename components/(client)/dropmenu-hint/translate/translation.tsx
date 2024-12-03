"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, ChevronDown, Check } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import VietNamSVG from "@/public/svg/vietnam";
import EnglishSVG from "@/public/svg/english";
import ChineseSVG from "@/public/svg/chinese";
import FrenchSVG from "@/public/svg/french";
import JapaneseSVG from "@/public/svg/japan";
import toast from "react-hot-toast";
import {
  getLanguageToastError,
  translateLanguage,
} from "@/translate/translate-client";

interface TranslationProps {
  setLanguage: Dispatch<SetStateAction<string>>;
  setIsConfirmLanguage: Dispatch<SetStateAction<boolean>>;
  loadingLanguage: boolean;
  loading: boolean;
  languageToUse: string;
}

export default function Translation({
  loadingLanguage,
  loading,
  setLanguage,
  setIsConfirmLanguage,
  languageToUse,
}: TranslationProps) {
  const [isOpen, setIsOpen] = useState(false);

  //language
  const languageMessage = translateLanguage(languageToUse);

  const handleLanguageClick = (language: string) => {
    if (languageToUse !== language) {
      setLanguage(language);
      setIsConfirmLanguage(true);
    } else {
      // Lấy thông báo từ getLanguageToastError
      const toastMessage = getLanguageToastError(language);
      toast.error(toastMessage);
      setIsConfirmLanguage(false);
    }
  };

  return (
    <div>
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="destructive" disabled={loading || loadingLanguage}>
            <Hint label={languageMessage}>
              {isOpen ? <ChevronDown /> : <Languages />}
            </Hint>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top">
          <DropdownMenuLabel>{languageMessage}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={languageToUse === "vi"}
            onClick={() => handleLanguageClick("vi")}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <VietNamSVG /> <span>VI</span>
            </div>
            {languageToUse === "vi" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={languageToUse === "en"}
            onClick={() => handleLanguageClick("en")}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <EnglishSVG /> <span>EN</span>
            </div>
            {languageToUse === "en" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={languageToUse === "zh"}
            onClick={() => handleLanguageClick("zh")}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <ChineseSVG /> <span>ZH</span>
            </div>
            {languageToUse === "zh" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={languageToUse === "fr"}
            onClick={() => handleLanguageClick("fr")}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <FrenchSVG /> <span>FR</span>
            </div>
            {languageToUse === "fr" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={languageToUse === "ja"}
            onClick={() => handleLanguageClick("ja")}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <JapaneseSVG /> <span>JA</span>
            </div>
            {languageToUse === "ja" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
