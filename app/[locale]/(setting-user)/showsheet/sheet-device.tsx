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
import FormInfoDevice from "../components/form/form-device";
import { useTranslations } from "next-intl";

interface DeviceInfoData {
  id: string;
  userId: string;
  browser: string[];
  cpu: string[];
  device: string[];
  engine: string[];
  os: string[];
  fullModel: string | null;
  ua: string | null;
  limitDevice: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SheetInfoDeviceProps {
  findDevice: DeviceInfoData[];
  children: React.ReactNode;
  type: "device";
  role: string | undefined;
  userId: string;
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SheetDevice: React.FC<SheetInfoDeviceProps> = ({
  findDevice,
  children,
  type,
  role,
  userId,
  setAlertGuestModal,
}) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      if (role !== "GUEST" && userId) {
        setOpen(true);
      } else {
        setAlertGuestModal(true);
      }
    } else {
      setOpen(false);
    }
  };

  const infoMap = {
    device: {
      title: t("info.loggedInDeviceSystem"),
      description: t("info.deviceLimit"),
      form: (
        <FormInfoDevice findDevice={findDevice}/>
      ),
    },
  };

  const { title, description, form } = infoMap[type];

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="space-y-4" side="center">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {form}
      </SheetContent>
    </Sheet>
  );
};

export default SheetDevice;
