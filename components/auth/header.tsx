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
import { Dispatch, SetStateAction, useEffect } from "react";
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
  const t = useTranslations();
  
  useEffect(() => {
    // Lấy language từ URL (vi/en)
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const langFromPath = pathSegments[0]; // Lấy phần đầu tiên của path

    // Nếu là vi hoặc en, cập nhật state
    if (langFromPath === "vi" || langFromPath === "en") {
      setLanguage(langFromPath);
    }
  }, [setLanguage]); // Chạy 1 lần khi component mount

const handleLanguageClick = (language: string) => {
  const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
  const pathSegments = currentPath.split("/").filter(Boolean); // Cắt thành mảng và loại bỏ khoảng trắng

  // Kiểm tra nếu path bắt đầu bằng "vi" hoặc "en" thì thay thế
  if (pathSegments[0] === "vi" || pathSegments[0] === "en") {
    pathSegments[0] = language; // Thay đổi ngôn ngữ
  } else {
    pathSegments.unshift(language); // Nếu không có thì thêm vào đầu
  }

  const newPath = "/" + pathSegments.join("/"); // Gộp lại thành đường dẫn mới
  window.location.href = newPath; // Chuyển hướng trang
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
