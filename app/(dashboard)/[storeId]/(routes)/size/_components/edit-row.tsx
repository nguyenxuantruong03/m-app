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
  value: string;
  field: "name" | "value"
}
const EditRow: React.FC<EditRowProps> = ({ data, id, name, value, field }) => {
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
          value={value}
          field={field}
          setOpen={setOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
