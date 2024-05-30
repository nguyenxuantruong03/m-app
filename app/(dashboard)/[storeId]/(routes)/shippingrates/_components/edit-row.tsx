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

interface EditRowProps {
  data: string;
  id: string;
  name: string;
  taxcode: string | null;
  taxbehavior: string;
  amount: number;
  unitmin: string;
  valuemin: number;
  unitmax: string;
  valuemax: number;
  active: boolean | null;
  field: "name"
}
const EditRow: React.FC<EditRowProps> = ({ data, id, name,taxcode,taxbehavior,amount,unitmin,valuemin,unitmax,valuemax,active, field }) => {
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
            <SheetTitle>Edit {data}</SheetTitle>
            <SheetDescription>Edit an existing {data}.</SheetDescription>
          </SheetHeader>
          <LabelForm
          data={data}
          id={id}
          name={name}
          taxcode={taxcode}
          taxbehavior={taxbehavior}
          amount={amount}
          unitmin={unitmin}
          valuemin={valuemin}
          unitmax={unitmax}
          valuemax={valuemax}
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
