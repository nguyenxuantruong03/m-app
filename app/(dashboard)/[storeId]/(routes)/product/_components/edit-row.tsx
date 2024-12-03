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
import { getProductEditRow } from "@/translate/translate-dashboard";

interface EditRowProps {
  id: string;
  name: string;
  heading: string;
  description: string;
  productdetail: string;
  productdetailId: string;
  data: string;
  isFeatured: boolean;
  isArchived: boolean;
  imagesalientfeatures: { url: string }[];
  images: { url: string }[];
  field: "heading"
  language: string;
}

const EditRow: React.FC<EditRowProps> = ({
  data,
  id,
  name,
  field,
  heading,
  description,
  productdetail,
  isFeatured,
  isArchived,
  imagesalientfeatures,
  productdetailId,
  images,
  language
}) => {
  const [open, setOpen] = useState(false);

    //language
    const productEditRowMessage = getProductEditRow(language)

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
              {productEditRowMessage.edit} {data}.
            </SheetTitle>
            <SheetDescription>
            {productEditRowMessage.editExisting} {data}.
            </SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            setOpen={setOpen}
            name={name}
            heading={heading}
            description={description}
            productdetail={productdetail}
            imagesalientfeatures={imagesalientfeatures}
            productdetailId= {productdetailId}
            images={images}
            isFeatured={isFeatured}
            isArchived={isArchived}
            field={field}
            language={language}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
