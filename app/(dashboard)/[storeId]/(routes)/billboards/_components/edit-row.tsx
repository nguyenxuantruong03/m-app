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
import LabelForm from "./label-form";
import { getBillboardEditRowSheet } from "@/translate/translate-dashboard";

interface EditRowProps {
  data: string;
  id: string;
  label: string;
  description: string
  imagebillboard: { url: string }[];
  field: "label" | "description"
  language: string;
}
const EditRow: React.FC<EditRowProps> = ({ data, id,imagebillboard,description,field,label,language }) => {
  const [open, setOpen] = useState(false);

  //language
  const billboardEditRowSheetMessage = getBillboardEditRowSheet(language)

  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">{data || billboardEditRowSheetMessage.notFound}</div>

      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{billboardEditRowSheetMessage.edit} {field === "label" ? `${label}` : `${description}`}</SheetTitle>
            <SheetDescription>{billboardEditRowSheetMessage.editAnExisting} {field === "label" ? `${label}` : `${description}`}.</SheetDescription>
          </SheetHeader>
          <LabelForm
          data={data}
          id={id}
          imagebillboard={imagebillboard}
          description={description}
          label= {label}
          setOpen={setOpen}
          field={field}
          language={language}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
