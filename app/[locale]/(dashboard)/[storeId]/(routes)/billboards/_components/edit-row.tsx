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
import { useTranslations } from "next-intl";

interface EditRowProps {
  data: string;
  id: string;
  label: string;
  description: string
  imagebillboard: { url: string }[];
  field: "label" | "description"
}
const EditRow: React.FC<EditRowProps> = ({ data, id,imagebillboard,description,field,label }) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">{data || t("toastError.notFound")}</div>

      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{t("action.edit")} {field === "label" ? `${label}` : `${description}`}</SheetTitle>
            <SheetDescription>{t("billboard.form.editAnExisting")} {field === "label" ? `${label}` : `${description}`}.</SheetDescription>
          </SheetHeader>
          <LabelForm
          data={data}
          id={id}
          imagebillboard={imagebillboard}
          description={description}
          label= {label}
          setOpen={setOpen}
          field={field}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
