"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { setting } from "@/actions/actions-signin-sign-up/setting";
import { SettingSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import CircleAvatar from "@/components/ui/circle-avatar";
import {
  getToastError,
  translateAvatar,
  translateChooseAvatarFrame,
  translateChooseFrameForAccount,
  translateChooseVIPAvatarFrame,
  translateFrameAlreadySelected,
  translateSave,
} from "@/translate/translate-client";

interface FormAvatarandFrameProps {
  languageToUse: string;
}

const FormAvatarandFrame = ({ languageToUse }: FormAvatarandFrameProps) => {
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [selectedFrame, setSelectedFrame] = useState<string>(
    user?.frameAvatar || "/avatar-frame/frame-1.png"
  );
  const role = useCurrentRole() || UserRole.GUEST;

  //language
  const toastErrorMessage = getToastError(languageToUse);
  const chooseFrameForAccountMessage =
    translateChooseFrameForAccount(languageToUse);
  const frameAlreadySelectedMessage =
    translateFrameAlreadySelected(languageToUse);
  const avatarMessage = translateAvatar(languageToUse);
  const chooseAvatarFrameMessage = translateChooseAvatarFrame(languageToUse);
  const chooseVIPAvatarFrameMessage =
    translateChooseVIPAvatarFrame(languageToUse);
  const saveMessage = translateSave(languageToUse);

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      frame: user?.frameAvatar || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    setSuccess("");
    setError("");
    values.frame = selectedFrame;
    if (!values.frame) {
      setError(chooseFrameForAccountMessage);
      return;
    }

    if (values.frame === user?.frameAvatar) {
      setError(frameAlreadySelectedMessage);
      return;
    }

    startTransition(() => {
      setting(values, languageToUse)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            router.refresh();
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError(toastErrorMessage);
        });
    });
  };

  const framesVIP = [
    "/avatar-frame/frame-special-1.png",
    "/avatar-frame/frame-special-2.png",
    "/avatar-frame/frame-special-3.png",
    "/avatar-frame/frame-special-4.gif",
    "/avatar-frame/frame-special-5.gif",
    "/avatar-frame/frame-special-6.png",
    "/avatar-frame/frame-special-7.gif",
    "/avatar-frame/frame-special-8.gif",
    "/avatar-frame/frame-special-9.gif",
    "/avatar-frame/frame-special-10.gif",
    "/avatar-frame/frame-special-11.gif",
    "/avatar-frame/frame-special-12.gif",
    "/avatar-frame/frame-special-13.gif",
    "/avatar-frame/frame-special-14.gif",
    "/avatar-frame/frame-special-15.gif",
    "/avatar-frame/frame-special-16.gif",
    "/avatar-frame/frame-special-17.gif",
    "/avatar-frame/frame-special-18.gif",
  ];

  const frames = [];

  for (let i = 1; i <= 10; i++) {
    frames.push(`/avatar-frame/frame-${i}.png`);
  }

  for (let i = 1; i <= 100; i++) {
    framesVIP.push(`/avatar-frame/frame-${i}.png`);
  }

  const getFrameDimensions = (frame: string) => {
    if (frame.startsWith("/avatar-frame/frame-special")) {
      switch (frame) {
        case "/avatar-frame/frame-special-2.png":
          return { width: 52, height: 52 };
        case "/avatar-frame/frame-special-5.gif":
          return { width: 48, height: 48 };
        case "/avatar-frame/frame-special-7.gif":
          return { width: 75, height: 75 };
        case "/avatar-frame/frame-special-8.gif":
          return { width: 100, height: 100 };
        case "/avatar-frame/frame-special-9.gif":
          return { width: 70, height: 70 };
        case "/avatar-frame/frame-special-10.gif":
          return { width: 80, height: 80 };
        case "/avatar-frame/frame-special-11.gif":
          return { width: 65, height: 65 };
        case "/avatar-frame/frame-special-12.gif":
          return { width: 70, height: 70 };
        case "/avatar-frame/frame-special-13.gif":
          return { width: 70, height: 70 };
        case "/avatar-frame/frame-special-14.gif":
          return { width: 120, height: 120 };
        case "/avatar-frame/frame-special-15.gif":
          return { width: 60, height: 60 };
        case "/avatar-frame/frame-special-16.gif":
          return { width: 65, height: 65 };
        case "/avatar-frame/frame-special-17.gif":
          return { width: 65, height: 65 };
        case "/avatar-frame/frame-special-18.gif":
          return { width: 65, height: 65 };
        default:
          return { width: 50, height: 50 };
      }
    } else if (frame.startsWith("/avatar-frame/frame-")) {
      // Adjust size for specific frames here
      switch (frame) {
        case "/avatar-frame/frame-2.png":
          return { width: 72, height: 72 };
        case "/avatar-frame/frame-22.png":
          return { width: 95, height: 95 };
        case "/avatar-frame/frame-61.png":
        case "/avatar-frame/frame-68.png":
        case "/avatar-frame/frame-69.png":
          return { width: 60, height: 60 };
        default:
          return { width: 65, height: 65 }; // Default size for frames /avatar-frame/frame-1.png to /avatar-frame/frame-80.png
      }
    } else {
      return { width: 65, height: 65 }; // Default size for any other frames
    }
  };

  const getFrameOptionDimensions = (frame: string) => {
    switch (frame) {
      case "/avatar-frame/frame-special-2.png":
        return { widthOption: 52, heightOption: 52 };
      case "/avatar-frame/frame-special-5.gif":
        return { widthOption: 48, heightOption: 48 };
      case "/avatar-frame/frame-special-7.gif":
        return { widthOption: 105, heightOption: 105 };
      case "/avatar-frame/frame-special-8.gif":
        return { widthOption: 100, heightOption: 100 };
      case "/avatar-frame/frame-special-9.gif":
        return { widthOption: 70, heightOption: 70 };
      case "/avatar-frame/frame-special-10.gif":
        return { widthOption: 80, heightOption: 80 };
      case "/avatar-frame/frame-special-11.gif":
        return { widthOption: 65, heightOption: 65 };
      case "/avatar-frame/frame-special-12.gif":
        return { widthOption: 70, heightOption: 70 };
      case "/avatar-frame/frame-special-13.gif":
        return { widthOption: 70, heightOption: 70 };
      case "/avatar-frame/frame-special-14.gif":
        return { widthOption: 100, heightOption: 100 };
      default:
        return { widthOption: 100, heightOption: 100 };
    }
  };

  const { width, height } = getFrameDimensions(selectedFrame);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="frame"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{avatarMessage}</FormLabel>
                <FormControl>
                  <CircleAvatar
                    selectedFrame={selectedFrame}
                    classImage="mx-auto"
                    classAvatar="z-[-1]"
                    widthFrame={width}
                    heightFrame={height}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormLabel>{chooseAvatarFrameMessage}</FormLabel>
          <div className="grid grid-cols-6 gap-2 h-32 overflow-y-auto">
            {frames.map((frame, index) => (
              <Image
                key={index}
                src={frame}
                alt={`Frame ${index + 1}`}
                loading="lazy"
                width={getFrameOptionDimensions(frame).widthOption}
                height={getFrameOptionDimensions(frame).heightOption}
                className={`cursor-pointer ${
                  selectedFrame === frame ? "border-2 border-blue-500" : ""
                }`}
                onClick={() =>
                  setSelectedFrame(selectedFrame === frame ? "" : frame)
                }
              />
            ))}
          </div>
        </div>
        {(role === UserRole.ADMIN || role === UserRole.STAFF) && (
          <div className="space-y-4">
            <FormLabel>{chooseVIPAvatarFrameMessage}</FormLabel>
            <div className="grid grid-cols-6 gap-2 h-32 overflow-y-auto">
              {framesVIP.map((frame, index) => (
                <Image
                  key={index}
                  src={frame}
                  alt={`Frame ${index + 1}`}
                  loading="lazy"
                  width={getFrameOptionDimensions(frame).widthOption}
                  height={getFrameOptionDimensions(frame).heightOption}
                  className={`cursor-pointer ${
                    selectedFrame === frame ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() =>
                    setSelectedFrame(selectedFrame === frame ? "" : frame)
                  }
                />
              ))}
            </div>
          </div>
        )}

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          {saveMessage}
        </Button>
      </form>
    </Form>
  );
};

export default FormAvatarandFrame;
