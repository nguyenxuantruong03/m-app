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
import { ImageCredential } from "@/types/type";
import { useTranslations } from "next-intl";

interface EditRowProps {
  id: string;
  name: string | null;
  email: string | null;
  isCitizen: boolean | null;
  sentVeirifi: boolean | null;
  numberCCCD: string | null;
  timestartwork: string | null;
  issued: string | null;
  gender: string | null;
  degree: string | null;
  maritalStatus: string | null;
  phonenumber: string | null;
  workingTime: string | null;
  ban: boolean | null;
  role: string;
  image: string | null;
  urlimageCheckAttendance: string | null;
  codeNFC: string | null;
  daywork: string[];
  imageCredential: ImageCredential[];
  dateRange: Date | null;
  dateofbirth: Date | null;
  data: string | null;
  field:
    | "name"
    | "numberCCCD"
    | "phonenumber"
    | "dateRange"
    | "dateofbirth"
    | "timestartwork"
    | "issued"
    | "gender"
    | "workingTime"
    | "degree"
    | "maritalStatus";
  isBanned: boolean | null;
}
const EditRow: React.FC<EditRowProps> = ({
  id,
  name,
  email,
  isCitizen,
  sentVeirifi,
  numberCCCD,
  timestartwork,
  issued,
  gender,
  degree,
  maritalStatus,
  phonenumber,
  workingTime,
  ban,
  role,
  image,
  urlimageCheckAttendance,
  codeNFC,
  daywork,
  imageCredential,
  dateRange,
  dateofbirth,
  data,
  isBanned,
  field,
}) => {
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
      <div
        onClick={handleClick}
        className={
          isBanned
            ? "line-through text-gray-400"
            : "hover:underline cursor-pointer"
        }
      >
        {data || t("toastError.notFound")}
      </div>

      <Sheet open={open} onOpenChange={handleonClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{t("action.edit")} {data}</SheetTitle>
            <SheetDescription>{t("managestaff.form.editAnExisting")} {data}.</SheetDescription>
          </SheetHeader>
          <LabelForm
            data={data}
            id={id}
            name={name}
            email={email}
            isCitizen={isCitizen}
            sentVeirifi={sentVeirifi}
            numberCCCD={numberCCCD}
            timestartwork={timestartwork}
            issued={issued}
            gender={gender}
            degree={degree}
            maritalStatus={maritalStatus}
            phonenumber={phonenumber}
            workingTime={workingTime}
            ban={ban}
            role={role}
            image={image}
            urlimageCheckAttendance={urlimageCheckAttendance}
            codeNFC={codeNFC}
            daywork={daywork}
            imageCredential={imageCredential}
            dateRange={dateRange}
            dateofbirth={dateofbirth}
            field={field}
            setOpen={setOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditRow;
