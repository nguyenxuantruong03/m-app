"use client"
import React, { useEffect, useState } from "react";
import { Moon, Sun, Settings2 } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

interface ThemeToggleDrakorLighProps {
  dropdown: boolean;
}

export function ThemeToggleDrakorLight({ dropdown }: ThemeToggleDrakorLighProps) {
  const t = useTranslations()
  const { setTheme, resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    // Lấy trạng thái theme từ localStorage, nếu không có thì trả về "system"
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    // Thiết lập theme từ localStorage khi component được mount
    setTheme(currentTheme);
  }, []); // Trigger only once on component mount

  const toggleTheme = (theme: string) => {
    // Kiểm tra xem có giá trị cũ trong localStorage hay không
    const oldTheme = localStorage.getItem("theme");
  
    if (oldTheme) {
      // Nếu có, xóa giá trị cũ
      localStorage.removeItem("theme");
    }
  
    // Thiết lập giá trị mới
    setCurrentTheme(theme);
    // Lưu trạng thái theme mới vào localStorage
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  return (
    <>
      {dropdown ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{t("theme.toggleTheme")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toggleTheme("light")}>{t("theme.light")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleTheme("dark")}>{t("theme.dark")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleTheme("system")}>{t("theme.system")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>
          {resolvedTheme === "dark" ? (
            <span onClick={() => toggleTheme("light")}>
              <div className="flex items-center pr-14"><Moon className="h-5 w-5 mr-2 transition-all" /> <span>{t("theme.dark")}</span> </div>
            </span>
          ) : resolvedTheme === "light" ? (
            <span onClick={() => toggleTheme("dark")}>
              <div className="flex items-center pr-14"><Sun className="h-5 w-5 mr-2 transition-all" /> <span>{t("theme.light")}</span> </div>
            </span>
          ) : (
            <span onClick={() => toggleTheme("system")}>
              <div className="flex items-center pr-14"><Settings2 className="h-5 w-5 mr-2 transition-all" /> <span>{t("theme.system")}</span> </div>
            </span>
          )}
        </div>
      )}
    </>
  );
}