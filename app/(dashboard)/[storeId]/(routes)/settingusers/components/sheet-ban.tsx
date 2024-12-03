"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import FormBanUser from "./form-banuser";
import { getSettingUserSheet } from "@/translate/translate-dashboard";

interface SheetBanuserProps {
  email?: string;
  name?: string;
  userId?: string;
  banTime: Date | null
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
}

const SheetBanUser: React.FC<SheetBanuserProps> = ({
  email,
  name,
  userId,
  banTime,
  openSheet,
  setOpenSheet,
  language
}) => {
  const settingUserSheetMessage = getSettingUserSheet(language)
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent className="space-y-4" side="center">
        <SheetHeader>
          <SheetTitle>
            {settingUserSheetMessage.banUser}: Email: {email}, {settingUserSheetMessage.name}: {name}
          </SheetTitle>
          <SheetDescription>
            {settingUserSheetMessage.enterBanTimeAndContent}
          </SheetDescription>
        </SheetHeader>
        <FormBanUser userId={userId} name={name} email={email} banTime={banTime} language={language}/>
      </SheetContent>
    </Sheet>
  );
};

export default SheetBanUser;
