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
import { getCouponEditRow } from "@/translate/translate-dashboard";

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
  language: string
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
  language
}) => {
  const [open, setOpen] = useState(false);

  //language
  const couponEditRowMessage = getCouponEditRow(language)

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
              {couponEditRowMessage.edit} {data}.
            </SheetTitle>
            <SheetDescription>
            {couponEditRowMessage.editExisting} {data}.
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
            language={language}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
