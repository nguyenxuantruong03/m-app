"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useState, useTransition, useRef, ElementRef } from "react";

import { updateUser } from "@/actions/stream/user";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

interface BioModalProps {
  initialValue: string | null;
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const t = useTranslations()
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success(t("profile.userBioUpdated"));
          closeRef.current?.click();
        })
        .catch(() => toast.error(t("toastError.somethingWentWrong")));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          {t("action.edit")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("profile.editUserBio")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder={`${t("profile.userBio")}...`}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                {t("action.cancel")}
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary">
              {t("action.save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
