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
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageClick = (language: string) => {
    if (languageToUse !== language) {
      setLanguage(language);
      setIsConfirmLanguage(true);
    } else {
      // Lấy thông báo từ getLanguageToastError
      toast.error(t("toastError.somethingWentWrong"));
      setIsConfirmLanguage(false);
    }
  };

  return (
    <div>
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="destructive" disabled={loading || loadingLanguage}>
            <Hint label={t("message.language")}>
              {isOpen ? <ChevronDown /> : <Languages />}
            </Hint>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top">
          <DropdownMenuLabel>{t("message.language")}</DropdownMenuLabel>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
