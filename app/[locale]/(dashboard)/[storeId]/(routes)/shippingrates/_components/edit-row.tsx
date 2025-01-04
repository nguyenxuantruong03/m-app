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
import { useTranslations } from "next-intl";

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
  const t = useTranslations()
  const [open, setOpen] = useState(false);


  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={handleClick} className="hover:underline cursor-pointer">{data || t("toastError.notFound")}</div>

      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{t("action.edit")} {data}</SheetTitle>
            <SheetDescription>{t("shippingrate.form.editAnExisting")} {data}.</SheetDescription>
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
