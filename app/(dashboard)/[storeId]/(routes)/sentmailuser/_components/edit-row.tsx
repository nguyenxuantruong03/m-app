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
import { translateSentEmailUserSheet } from "@/translate/translate-dashboard";

const taxTypeMapping: Record<string, string> = {
  vat: "VAT",
  sales_tax: "Thuế doanh thu",
};

interface EditRowProps {
  data: string | null;
  id: string;
  subject: string;
  description: string;
  field: "subject" | "description"
  language: string
}
const EditRow: React.FC<EditRowProps> = ({ data, id, subject, description, field, language }) => {
  const [open, setOpen] = useState(false);
  //language
  const sentEmailUserSheetMessage = translateSentEmailUserSheet(language)
  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };

  // Mô tả sẽ thay đổi dựa trên trường 'field'
  let fieldDescription = "";
  if (field === "subject") {
    fieldDescription = `${sentEmailUserSheetMessage.subject} ${subject}`;
  } else if (field === "description") {
    fieldDescription = `${sentEmailUserSheetMessage.existingdescription} ${subject}`;
  }

  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">{data || sentEmailUserSheetMessage.notfound}</div>
      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{sentEmailUserSheetMessage.edit} {subject}</SheetTitle>
            {/* Sử dụng biến fieldDescription */}
            <SheetDescription>{sentEmailUserSheetMessage.edit} {fieldDescription}.</SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            subject={subject}
            description={description}
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
