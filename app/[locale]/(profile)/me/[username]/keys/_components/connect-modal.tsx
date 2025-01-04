"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";

import { createIngress } from "@/actions/stream/ingress";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
  const t = useTranslations()
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success(t("profile.ingressCreated"));
          closeRef?.current?.click();
        })
        .catch(() => toast.error(t("toastError.somethingWentWrong")));
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">{t("profile.generateConnection")}</Button>
      </SheetTrigger>
      <SheetContent side="center" className="space-y-3">
        <SheetHeader>
          <SheetTitle>{t("profile.generateConnection")}</SheetTitle>
        </SheetHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t("action.warning")}</AlertTitle>
          <AlertDescription>{t("profile.resetStreamsWarning")}</AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <SheetClose ref={closeRef} asChild>
            <Button variant="ghost">{t("action.cancel")}</Button>
          </SheetClose>
          <Button disabled={isPending} onClick={onSubmit} variant="primary">
            {t("profile.generate")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
