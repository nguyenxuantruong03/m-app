"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LabelForm from "./name-form";
import { getFavoriteEditRow } from "@/translate/translate-dashboard";

interface EditRowProps {
  data: string;
  id: string;
  value: string | null
  language: string;
}
const EditRow: React.FC<EditRowProps> = ({ data, id,value,language }) => {
  const [open, setOpen] = useState(false);

  //language
  const favoriteEditRowMessage = getFavoriteEditRow(language)

  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">{data || favoriteEditRowMessage.notFound}</div>

      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{favoriteEditRowMessage.editName} {data}</SheetTitle>
            <SheetDescription>{favoriteEditRowMessage.editExistingName} {data}.</SheetDescription>
          </SheetHeader>
          <LabelForm
          data={data}
          value={value}
          id={id}
          setOpen={setOpen}
          language={language}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
