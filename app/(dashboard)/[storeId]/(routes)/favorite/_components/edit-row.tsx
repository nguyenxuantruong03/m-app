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

interface EditRowProps {
  data: string;
  id: string;
  value: string | null
}
const EditRow: React.FC<EditRowProps> = ({ data, id,value }) => {
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
            <SheetTitle>Edit Name {data}</SheetTitle>
            <SheetDescription>Edit an existing name {data}.</SheetDescription>
          </SheetHeader>
          <LabelForm
          data={data}
          value={value}
          id={id}
          setOpen={setOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
