"use client";

import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
import { format } from "date-fns";
import ImageCellOne from "@/components/image-cell-one";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "./../../../../../../hooks/use-current-user";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

interface AboutUserProps {
  self: any;
}

export const AboutUser = ({ self }: AboutUserProps) => {
  const user = useCurrentUser();
  const [isMounted, setIsMounted] = useState(false);

  // If imageCredentials is an array, take the first image's url
  const imageCredentials = Array.isArray(self?.imageCredential)
    ? self.imageCredential[0]?.url
    : self?.imageCredential || undefined;

  // Use the first image from imageCredential, fallback to self?.image, or use null as a last option
  const avatarImage = imageCredentials || self?.image || null;

  // Check if createdAt exists before formatting
  let formatcreatedAt = "";
  if (self?.createdAt) {
    const zonedSubtractedDate = utcToZonedTime(
      new Date(self.createdAt.getTime() - 7 * 60 * 60 * 1000), // Correctly handle createdAt as a Date object
      vietnamTimeZone
    );
    formatcreatedAt = format(
      zonedSubtractedDate,
      "E '-' dd/MM/yyyy '-' HH:mm:ss a",
      { locale: viLocale }
    );
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col xl:flex-row items-center xl:justify-between">
      <div className="flex flex-col xl:flex-row items-center xl:space-x-5 justify-center">
        {avatarImage ? (
          <ImageCellOne
            user ={user}
            self={self}
            imageUrl={avatarImage}
            widthImage={120}
            heightImage={120}
            showUpload={true}
            classNames="border-2 border-slate-300"
          />
        ) : (
          <Image
            src="/avatar/avatar-default.jpg"
            width={120}
            height={120}
            alt="404"
            className="rounded-full"
          />
        )}
        <div className="text-center xl:text-left">
          <p className="text-3xl font-bold">{self.name}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">0</span> follower
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 justify-center mt-4 xl:mt-0">
        {self.id !== user?.id ? (
          <Button className="flex items-center text-white" variant="primary" size="sm">
            <Heart className="mr-2 h-4 w-4" /> Theo dõi
          </Button>
        ) : (
          <>
            <Button className="flex items-center" variant="secondary" size="sm">
              <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa trang cá nhân
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
