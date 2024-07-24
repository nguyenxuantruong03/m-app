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
import LabelForm from "./label-form";

interface EditRowProps {
  data: string;
  label: string;
  id: string;
  description: string
  imagebillboardtime: { url: string }[];
  isActive: boolean | null;
  timeout: number;
  end: number | null;
  isTimeout: boolean | null;
  field: "label" | "timeout" | "description";
}

const EditRow: React.FC<EditRowProps> = ({ data, id, imagebillboardtime, isActive, timeout, end, isTimeout, field,label,description }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleonClose = () => {
    setOpen(false);
  };

  const getFieldValue = () => {
    if (field === "label") return label;
    if (field === "timeout") return timeout;
    if (field === "description") return description;
    return data;
  };

  return (
    <>
      <div onClick={handleClick} className={isActive ? 'line-through text-gray-400' : 'hover:underline cursor-pointer'}>
        {data || "Không tìm thấy!"}
      </div>
      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
          <SheetTitle>Edit {getFieldValue()}</SheetTitle>
          <SheetDescription>Edit an existing {getFieldValue()}.</SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            imagebillboardtime={imagebillboardtime}
            setOpen={setOpen}
            timeout={timeout}
            label={label}
            end={end}
            isTimeout={isTimeout}
            description={description}
            field={field}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
