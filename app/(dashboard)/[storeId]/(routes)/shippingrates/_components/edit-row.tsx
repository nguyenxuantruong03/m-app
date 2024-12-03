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
import { getShippingRateEditRow } from "@/translate/translate-dashboard";

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
  language: string;
}
const EditRow: React.FC<EditRowProps> = ({ data, id, name,taxcode,taxbehavior,amount,unitmin,valuemin,unitmax,valuemax,active, field, language }) => {
  const [open, setOpen] = useState(false);

  //language
  const shippingRateEditRowMessage = getShippingRateEditRow(language)

  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">{data || shippingRateEditRowMessage.notFound}</div>

      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{shippingRateEditRowMessage.edit} {data}</SheetTitle>
            <SheetDescription>{shippingRateEditRowMessage.editAnExisting} {data}.</SheetDescription>
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
          language={language}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
