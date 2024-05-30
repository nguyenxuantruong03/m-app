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
  name: string;
  id: string;
  value: string;
  field: "name" | "value";
}

const EditRow: React.FC<EditRowProps> = ({ data, id, value, field,name }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">
        {data || "Không tìm thấy!"}
      </div>

      <Sheet open={open} onOpenChange={handleOnClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit {field === "name" ? `${data}` : `${value}`}</SheetTitle>
            <SheetDescription>
              Edit an existing {field === "name" ? `${data}` : `${value}`}.
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
