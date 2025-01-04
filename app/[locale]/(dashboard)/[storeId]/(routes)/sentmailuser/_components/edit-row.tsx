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
import { useTranslations } from "next-intl";

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
  const t = useTranslations()
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
    fieldDescription = `${t("sentemail.form.subjectExisting")} ${subject}`;
  } else if (field === "description") {
    fieldDescription = `${t("sentemail.form.existingdescription")} ${subject}`;
  }

  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">{data || t("toastError.notFound")}</div>
      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{t("action.edit")} {subject}</SheetTitle>
            {/* Sử dụng biến fieldDescription */}
            <SheetDescription>{t("action.edit")} {fieldDescription}.</SheetDescription>
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
