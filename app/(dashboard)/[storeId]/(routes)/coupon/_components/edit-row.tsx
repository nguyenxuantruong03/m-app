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
  data: string | null | number;
  id: string;
  name: string | null;
  percent: number | null;
  durationinmoth: number | null;
  duration: string | null;
  maxredemptions: number | null;
  redeemby: Date | null;
  imagecoupon: { url: string }[];
  field: "name"
}

const EditRow: React.FC<EditRowProps> = ({
  data,
  id,
  name,
  field,
  percent,
  durationinmoth,
  duration,
  maxredemptions,
  redeemby,
  imagecoupon,
}) => {
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
      {data}
      </div>

      <Sheet open={open} onOpenChange={handleOnClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit {data}.
            </SheetTitle>
            <SheetDescription>
              Edit an existing {data}.
            </SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            setOpen={setOpen}
            name={name}
            percent={percent}
            durationinmoth={durationinmoth}
            duration={duration}
            maxredemptions={maxredemptions}
            redeemby={redeemby}
            imagecoupon={imagecoupon}
            field={field}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
