"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getShowHide } from "@/translate/translate-client";

interface KeyCardProps {
  value: string | null;
  languageToUse: string
}

export const KeyCard = ({ value,languageToUse }: KeyCardProps) => {
    const [show,setShow] = useState(false);
    const showHideMessage = getShowHide(languageToUse)

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-3 lg:gap-x-10">
        <p className="font-semibold shrink-0 text-slate-900 dark:text-slate-200">Stream Key</p>
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
            {show ? showHideMessage.hide : showHideMessage.show}
          </Button>
        </div>
      </div>
    </div>
  );
};
