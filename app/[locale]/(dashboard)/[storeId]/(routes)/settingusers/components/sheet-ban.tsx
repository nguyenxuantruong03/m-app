"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import FormBanUser from "./form-banuser";
import { useTranslations } from "next-intl";

interface SheetBanuserProps {
  email?: string;
  name?: string;
  userId?: string;
  banTime: Date | null
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SheetBanUser: React.FC<SheetBanuserProps> = ({
  email,
  name,
  userId,
  banTime,
  openSheet,
  setOpenSheet,
}) => {
  const t = useTranslations()
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent className="space-y-4" side="center">
        <SheetHeader>
          <SheetTitle>
            {t("settinguser.form.banUser")}: Email: {email}, {t("settinguser.form.name")}: {name}
          </SheetTitle>
          <SheetDescription>
            {t("settinguser.form.enterBanTimeAndContent")}
          </SheetDescription>
        </SheetHeader>
        <FormBanUser userId={userId} name={name} email={email} banTime={banTime} />
      </SheetContent>
    </Sheet>
  );
};

export default SheetBanUser;
