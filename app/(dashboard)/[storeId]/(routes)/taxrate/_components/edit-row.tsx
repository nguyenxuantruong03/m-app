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
  name: string;
  description: string;
  percentage: number;
  inclusive: boolean;
  active: boolean;
  taxtype: string | null;
  field: "name" | "description"
}
const EditRow: React.FC<EditRowProps> = ({ data, id, name,description,percentage,inclusive,taxtype,active, field }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">{data || "Không tìm thấy!"}</div>
      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit {name}</SheetTitle>
            <SheetDescription>Edit an existing {data}.</SheetDescription>
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
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
