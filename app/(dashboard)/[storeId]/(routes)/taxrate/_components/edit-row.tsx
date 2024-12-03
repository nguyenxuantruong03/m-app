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
import { getTaxrateEditRow } from "@/translate/translate-dashboard";

const taxTypeMapping: Record<string, string> = {
  vat: "VAT",
  sales_tax: "Thuế doanh thu",
};

interface EditRowProps {
  data: string | null;
  id: string;
  name: string;
  description: string;
  percentage: number;
  inclusive: boolean;
  active: boolean;
  taxtype: string | null;
  field: "name" | "description";
  language: string;
}
const EditRow: React.FC<EditRowProps> = ({
  data,
  id,
  name,
  description,
  percentage,
  inclusive,
  taxtype,
  active,
  field,
  language,
}) => {
  const [open, setOpen] = useState(false);

  //language
  const taxrateEditRowMessage = getTaxrateEditRow(language)

  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">
        {data || taxrateEditRowMessage.notFound}
      </div>
      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{taxrateEditRowMessage.edit} {name}</SheetTitle>
            <SheetDescription>{taxrateEditRowMessage.editAnExisting} {data}.</SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            name={name}
            description={description}
            percentage={percentage}
            inclusive={inclusive}
            taxtype={taxtype}
            active={active}
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
