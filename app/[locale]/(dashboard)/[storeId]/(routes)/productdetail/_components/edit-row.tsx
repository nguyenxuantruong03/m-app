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
import { Decimal } from "@prisma/client/runtime/library";
import { useTranslations } from "next-intl";

interface EditRowProps {
  id: string;
  data: string;
  title: string;
  name1: string;
  name2: string | null;
  name3: string | null;
  name4: string | null;
  name5: string | null;
  quantity1: number;
  quantity2: number | null;
  quantity3: number | null;
  quantity4: number | null;
  quantity5: number | null;
  promotionheading: string;
  promotiondescription: string;
  size1: string;
  color1: string;
  size2: string | null;
  color2: string | null;
  size3: string | null;
  color3: string | null;
  size4: string | null;
  color4: string | null;
  size5: string | null;
  color5: string | null;
  category: string | null;
  //notformat
  price1: Decimal | null;
  price2: Decimal | null;
  price3: Decimal | null;
  price4: Decimal | null;
  price5: Decimal | null;
  percentpromotion1: Decimal | null;
  percentpromotion2: Decimal | null;
  percentpromotion3: Decimal | null;
  percentpromotion4: Decimal | null;
  percentpromotion5: Decimal | null;
  warranty1: Decimal | null;
  warranty2: Decimal | null;
  warranty3: Decimal | null;
  warranty4: Decimal | null;
  //content
  descriptionspecifications: string;
  valuespecifications: string;
  description2specifications: string | null;
  value2specifications: string | null;
  description3specifications: string | null;
  value3specifications: string | null;
  description4specifications: string | null;
  value4specifications: string | null;
  description5specifications: string | null;
  value5specifications: string | null;
  description6specifications: string | null;
  value6specifications: string | null;
  description7specifications: string | null;
  value7specifications: string | null;
  description8specifications: string | null;
  value8specifications: string | null;
  description9specifications: string | null;
  value9specifications: string | null;
  description10specifications: string | null;
  value10specifications: string | null;
  description11specifications: string | null;
  value11specifications: string | null;
  description12specifications: string | null;
  value12specifications: string | null;
  description13specifications: string | null;
  value13specifications: string | null;
  description14specifications: string | null;
  value14specifications: string | null;
  descriptionsalientfeatures: string;
  description2salientfeatures: string;
  description3salientfeatures: string;
  description4salientfeatures: string;
  contentsalientfeatures: string;
  field:
    | "title"
    | "name1"
    | "name2"
    | "name3"
    | "name4"
    | "name5"
    | "quantity1"
    | "quantity2"
    | "quantity3"
    | "quantity4"
    | "quantity5"
    | "promotionheading"
    | "promotiondescription"
    | "price1"
    | "price2"
    | "price3"
    | "price4"
    | "price5"
    | "percentpromotion1"
    | "percentpromotion2"
    | "percentpromotion3"
    | "percentpromotion4"
    | "percentpromotion5"
    | "warranty1"
    | "warranty2"
    | "warranty3"
    | "warranty4"
    | "descriptionspecifications"
    | "valuespecifications"
    | "description2specifications"
    | "value2specifications"
    | "description3specifications"
    | "value3specifications"
    | "description4specifications"
    | "value4specifications"
    | "description5specifications"
    | "value5specifications"
    | "description6specifications"
    | "value6specifications"
    | "description7specifications"
    | "value7specifications"
    | "description8specifications"
    | "value8specifications"
    | "description9specifications"
    | "value9specifications"
    | "description10specifications"
    | "value10specifications"
    | "description11specifications"
    | "value11specifications"
    | "description12specifications"
    | "value12specifications"
    | "description13specifications"
    | "value13specifications"
    | "description14specifications"
    | "value14specifications"
    | "descriptionsalientfeatures"
    | "description2salientfeatures"
    | "description3salientfeatures"
    | "description4salientfeatures"
    | "contentsalientfeatures";
}

const EditRow: React.FC<EditRowProps> = ({
  data,
  id,
  title,
  name1,
  name2,
  name3,
  name4,
  name5,
  quantity1,
  quantity2,
  quantity3,
  quantity4,
  quantity5,
  promotionheading,
  promotiondescription,
  size1,
  color1,
  size2,
  color2,
  size3,
  color3,
  size4,
  color4,
  size5,
  color5,
  category,
  price1,
  price2,
  price3,
  price4,
  price5,
  percentpromotion1,
  percentpromotion2,
  percentpromotion3,
  percentpromotion4,
  percentpromotion5,
  warranty1,
  warranty2,
  warranty3,
  warranty4,
  descriptionspecifications,
  valuespecifications,
  description2specifications,
  value2specifications,
  description3specifications,
  value3specifications,
  description4specifications,
  value4specifications,
  description5specifications,
  value5specifications,
  description6specifications,
  value6specifications,
  description7specifications,
  value7specifications,
  description8specifications,
  value8specifications,
  description9specifications,
  value9specifications,
  description10specifications,
  value10specifications,
  description11specifications,
  value11specifications,
  description12specifications,
  value12specifications,
  description13specifications,
  value13specifications,
  description14specifications,
  value14specifications,
  descriptionsalientfeatures,
  description2salientfeatures,
  description3salientfeatures,
  description4salientfeatures,
  contentsalientfeatures,
  field,
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
        {field.startsWith("percentpromotion") ? (
          <div>
            {data !== null && data !== "'" ? <>{data}%</> : <>{data}</>}
          </div>
        ) : (
          <div>{data}</div>
        )}
      </div>

      <Sheet open={open} onOpenChange={handleOnClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{t("action.edit")} {title}.</SheetTitle>
            <SheetDescription>{t("productdetail.form.editAnExisting")} {data}.</SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            setOpen={setOpen}
            title={title}
            name1={name1}
            name2={name2}
            name3={name3}
            name4={name4}
            name5={name5}
            quantity1={quantity1}
            quantity2={quantity2}
            quantity3={quantity3}
            quantity4={quantity4}
            quantity5={quantity5}
            promotionheading={promotionheading}
            promotiondescription={promotiondescription}
            size1={size1}
            color1={color1}
            size2={size2}
            color2={color2}
            size3={size3}
            color3={color3}
            size4={size4}
            color4={color4}
            size5={size5}
            color5={color5}
            category={category}
            price1={price1}
            price2={price2}
            price3={price3}
            price4={price4}
            price5={price5}
            percentpromotion1={percentpromotion1}
            percentpromotion2={percentpromotion2}
            percentpromotion3={percentpromotion3}
            percentpromotion4={percentpromotion4}
            percentpromotion5={percentpromotion5}
            warranty1={warranty1}
            warranty2={warranty2}
            warranty3={warranty3}
            warranty4={warranty4}
            descriptionspecifications={descriptionspecifications}
            valuespecifications={valuespecifications}
            description2specifications={description2specifications}
            value2specifications={value2specifications}
            description3specifications={description3specifications}
            value3specifications={value3specifications}
            description4specifications={description4specifications}
            value4specifications={value4specifications}
            description5specifications={description5specifications}
            value5specifications={value5specifications}
            description6specifications={description6specifications}
            value6specifications={value6specifications}
            description7specifications={description7specifications}
            value7specifications={value7specifications}
            description8specifications={description8specifications}
            value8specifications={value8specifications}
            description9specifications={description9specifications}
            value9specifications={value9specifications}
            description10specifications={description10specifications}
            value10specifications={value10specifications}
            description11specifications={description11specifications}
            value11specifications={value11specifications}
            description12specifications={description12specifications}
            value12specifications={value12specifications}
            description13specifications={description13specifications}
            value13specifications={value13specifications}
            description14specifications={description14specifications}
            value14specifications={value14specifications}
            descriptionsalientfeatures={descriptionsalientfeatures}
            description2salientfeatures={description2salientfeatures}
            description3salientfeatures={description3salientfeatures}
            description4salientfeatures={description4salientfeatures}
            contentsalientfeatures={contentsalientfeatures}
            field={field}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
