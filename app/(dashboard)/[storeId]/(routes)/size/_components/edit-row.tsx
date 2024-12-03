"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LabelForm from "./form-edit";
import { getSizeEditRow } from "@/translate/translate-dashboard";

interface EditRowProps {
  data: string;
  id: string;
  name: string;
  value: string;
  field: "name" | "value";
  language: string;
}
const EditRow: React.FC<EditRowProps> = ({
  data,
  id,
  name,
  value,
  field,
  language,
}) => {
  const [open, setOpen] = useState(false);

  //language
  const sizeEditRowMessage = getSizeEditRow(language);

  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">
        {data || sizeEditRowMessage.notFound}
      </div>

      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{sizeEditRowMessage.edit} {data}</SheetTitle>
            <SheetDescription>{sizeEditRowMessage.editExisting} {data}.</SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            name={name}
            value={value}
            field={field}
            setOpen={setOpen}
            language={language}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
