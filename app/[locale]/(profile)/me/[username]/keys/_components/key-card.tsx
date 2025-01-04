"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface KeyCardProps {
  value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const t = useTranslations()
    const [show,setShow] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-3 lg:gap-x-10">
        <p className="font-semibold shrink-0 text-slate-900 dark:text-slate-200">{t("profile.streamKeys")}</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="Stream Key"
              className="dark:text-slate-200"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button onClick={() => setShow(!show)} size="sm" variant="link">
            {show ? t("profile.hide") : t("profile.show")}
          </Button>
        </div>
      </div>
    </div>
  );
};
