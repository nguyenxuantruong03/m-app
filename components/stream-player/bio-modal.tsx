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
import { getToastError, translateCancel, translateEdit, translateEditUserBio, translateSave, translateUserBio, translateUserBioUpdated } from "@/translate/translate-client";

interface BioModalProps {
  initialValue: string | null;
  languageToUse: string;
}

export const BioModal = ({ initialValue, languageToUse }: BioModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || "");

  //languages
  const toastErrorMessage = getToastError(languageToUse)
  const userBioUpdatedMessage = translateUserBioUpdated(languageToUse)
  const editMessage = translateEdit(languageToUse)
  const editUserBioMessage = translateEditUserBio(languageToUse)
  const userBioMessage = translateUserBio(languageToUse)
  const cancelMessage = translateCancel(languageToUse)
  const saveMessage = translateSave(languageToUse)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success(userBioUpdatedMessage);
          closeRef.current?.click();
        })
        .catch(() => toast.error(toastErrorMessage));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          {editMessage}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editUserBioMessage}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder={`${userBioMessage}...`}
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
                {cancelMessage}
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary">
              {saveMessage}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
