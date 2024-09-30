"use client";
import { Dispatch, SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SheetInfomationProps {
  role: string;
  userId: string;
  title: string;
  description: string;
  form: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  side: "center" | "top" | "bottom" | "left" | "right" | "custom" | null | undefined;
}

const SheetInfomation: React.FC<SheetInfomationProps> = ({
  role,
  userId,
  title,
  description,
  form,
  open,
  side = "center",
  setOpen
}) => {

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      if (role !== "GUEST" && userId) {
        setOpen(true);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="space-y-4" side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {form}
      </SheetContent>
    </Sheet>
  );
};

export default SheetInfomation;
