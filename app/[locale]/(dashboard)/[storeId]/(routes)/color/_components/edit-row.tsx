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
import LabelForm from "./name-form";
import { useTranslations } from "next-intl";

interface EditRowProps {
  data: string;
  name: string;
  id: string;
  value: string;
  field: "name" | "value";
}

const EditRow: React.FC<EditRowProps> = ({ data, id, value, field, name }) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleOnClose = () => {
    setOpen(false);
  };

  // Determine the background color based on `value`
  const backgroundColor = field === "value" ? value : "transparent";

  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">
        {field === "value" ? (
          <div className="h-6 w-6 rounded-full" style={{ backgroundColor }} />
        ) : (
          data || t("toastError.notFound")
        )}
      </div>

      <Sheet open={open} onOpenChange={handleOnClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              {t("action.edit")} {field === "name" ? `${data}` : `${value}`}
            </SheetTitle>
            <SheetDescription>
            {t("color.form.editExisting")} {field === "name" ? `${data}` : `${value}`}.
            </SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            setOpen={setOpen}
            name={name}
            value={value}
            field={field}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
