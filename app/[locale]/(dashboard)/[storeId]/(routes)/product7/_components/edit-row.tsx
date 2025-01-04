"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LabelForm from "./form-edit";
import { useTranslations } from "next-intl";

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
  field: "heading" | "description"
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
}) => {
  const t = useTranslations()
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
              {t("action.edit")} {data}.
            </SheetTitle>
            <SheetDescription>
            {t("product.form.editExisting")} {data}.
            </SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            setOpen={setOpen}
            name={name}
            heading={heading}
            description={description}
            imagesalientfeatures={imagesalientfeatures}
            productdetailId= {productdetailId}
            images={images}
            isFeatured={isFeatured}
            isArchived={isArchived}
            field={field}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
