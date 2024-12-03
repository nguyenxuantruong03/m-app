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
import { getCategoriesEditRow } from "@/translate/translate-dashboard";

interface EditRowProps {
  data: string;
  id: string;
  language: string;
}
const EditRow: React.FC<EditRowProps> = ({ data, id,language }) => {
  const [open, setOpen] = useState(false);

  //language
  const categoriesEditRowMessage = getCategoriesEditRow(language);

  const handleClick = () => {
    setOpen(true);
  };
  const handleonClose = () => {
    setOpen(false);
  };
  return (
    <>
    <div onClick={handleClick} className="hover:underline cursor-pointer">
      {data || categoriesEditRowMessage.notFound}
    </div>

    <Sheet open={open} onOpenChange={handleonClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            {categoriesEditRowMessage.editName} {data}
          </SheetTitle>
          <SheetDescription>
            {categoriesEditRowMessage.editExistingName} {data}.
          </SheetDescription>
        </SheetHeader>
        <LabelForm
          data={data}
          id={id}
          setOpen={setOpen}
          language={language}
        />
      </SheetContent>
    </Sheet>
  </>
  );
};

export default EditRow;
