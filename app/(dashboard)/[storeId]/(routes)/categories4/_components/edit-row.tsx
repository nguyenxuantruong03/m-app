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

interface EditRowProps {
  data: string;
  id: string;
}
const EditRow: React.FC<EditRowProps> = ({ data, id }) => {
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
          id={id}
          setOpen={setOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
