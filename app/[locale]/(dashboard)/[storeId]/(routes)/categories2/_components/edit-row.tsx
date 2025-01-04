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
import { useTranslations } from "next-intl";

interface EditRowProps {
  data: string;
  id: string;
}
const EditRow: React.FC<EditRowProps> = ({ data, id }) => {
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
      <div onClick={handleClick} className="hover:underline cursor-pointer">
        {data || t("toastError.notFound")}
      </div>

      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              {t("category.form.editName")} {data}
            </SheetTitle>
            <SheetDescription>
              {t("category.form.editExistingName")} {data}.
            </SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            setOpen={setOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
