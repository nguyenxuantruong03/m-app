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
import { getColorEditRow } from "@/translate/translate-dashboard";

interface EditRowProps {
  data: string;
  name: string;
  id: string;
  value: string;
  field: "name" | "value";
  language: string;
}

const EditRow: React.FC<EditRowProps> = ({ data, id, value, field, name,language }) => {
  const [open, setOpen] = useState(false);

  //language
  const colorEditRowMessage = getColorEditRow(language)

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
          data || colorEditRowMessage.notFound
        )}
      </div>

      <Sheet open={open} onOpenChange={handleOnClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              {colorEditRowMessage.edit} {field === "name" ? `${data}` : `${value}`}
            </SheetTitle>
            <SheetDescription>
            {colorEditRowMessage.editExisting} {field === "name" ? `${data}` : `${value}`}.
            </SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            setOpen={setOpen}
            name={name}
            value={value}
            field={field}
            language={language}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
