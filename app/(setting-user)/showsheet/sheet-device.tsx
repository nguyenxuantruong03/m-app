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
}

const SheetDevice: React.FC<SheetInfoDeviceProps> = ({
  findDevice,
  children,
  type,
}) => {
  const [open, setOpen] = useState(false);

  const infoMap = {
    device: {
      title: `Thiết bị đăng nhập vào hệ thống`,
      description: `Hãy thay đổi giới hạn thiết bị tùy chỉnh 1-5 thiết bị có thể đăng nhập vào hệ thống`,
      form: <FormInfoDevice findDevice={findDevice} />,
    },
  };

  const { title, description, form } = infoMap[type];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
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
