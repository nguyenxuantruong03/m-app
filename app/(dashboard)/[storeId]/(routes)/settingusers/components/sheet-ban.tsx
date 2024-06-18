"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import FormBanUser from "./form-banuser";

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
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent className="space-y-4" side="center">
        <SheetHeader>
          <SheetTitle>
            Ban người dùng: Email: {email}, Tên: {name}
          </SheetTitle>
          <SheetDescription>
            Hãy nhập thời gian người dùng bị ban và nội dung ban.
          </SheetDescription>
        </SheetHeader>
        <FormBanUser userId={userId} name={name} email={email} banTime={banTime}/>
      </SheetContent>
    </Sheet>
  );
};

export default SheetBanUser;
