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
}
const EditRow: React.FC<EditRowProps> = ({ data, id, subject, description, field }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };

  // Mô tả sẽ thay đổi dựa trên trường 'field'
  let fieldDescription = "";
  if (field === "subject") {
    fieldDescription = `an existing subject ${subject}`;
  } else if (field === "description") {
    fieldDescription = `an existing description ${subject}`;
  }

  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">{data || "Không tìm thấy!"}</div>
      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit {subject}</SheetTitle>
            {/* Sử dụng biến fieldDescription */}
            <SheetDescription>Edit {fieldDescription}.</SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            subject={subject}
            description={description}
            field={field}
            setOpen={setOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
