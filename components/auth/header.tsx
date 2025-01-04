import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import VietNamSVG from "@/public/svg/vietnam";
import EnglishSVG from "@/public/svg/english";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  languageToUse: string;
  isPending?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  label,
  setLanguage,
  languageToUse,
  isPending,
  setOpen,
  isOpen,
}) => {
  const t = useTranslations()
  
  const handleLanguageClick = (language: string) => {
    // Lấy thông báo từ getLanguageToastError
    setLanguage(language);
    toast.error(t("toastError.somethingWentWrong"));
  };

  return (
    <div className="flex flex-row justify-between items-center w-full">
      {/* Phần giữa */}
      <div className="flex flex-col gap-y-4 items-center justify-center grow">
        <h1 className={cn("text-3xl font-semibold", font.className)}>
          {t("auth.auth")}
        </h1>
        <p className="text-muted-foreground text-sm">{label}</p>
      </div>

      {/* Phần DropdownMenu */}
      <DropdownMenu onOpenChange={(open) => setOpen(open)}>
        <DropdownMenuTrigger>
          <Hint label={languageToUse || "Not found!"}>
            <Button variant="outline" disabled={isPending}>
              {languageToUse == "vi" && (
                <div className="flex items-center space-x-1">
                  <VietNamSVG /> <span>VI</span>{" "}
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              )}
              {languageToUse == "en" && (
                <div className="flex items-center space-x-1">
                  <EnglishSVG /> <span>EN</span>{" "}
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              )}
            </Button>
          </Hint>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
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
};

export default Header;
