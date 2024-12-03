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
import {
  getToastError,
  translateCancel,
  translateGenerate,
  translateGenerateConnection,
  translateIngressCreated,
  translateResetStreamsWarning,
  translateWarning,
} from "@/translate/translate-client";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

interface ConnectModal {
  languageToUse: string;
}
export const ConnectModal = ({ languageToUse }: ConnectModal) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  //language
  const toastErrorMessage = getToastError(languageToUse);
  const ingressCreatedMessage = translateIngressCreated(languageToUse);
  const generateConnection = translateGenerateConnection(languageToUse);
  const warningMessage = translateWarning(languageToUse);
  const resetStreamsWarningMessage =
    translateResetStreamsWarning(languageToUse);
  const cancelMessage = translateCancel(languageToUse);
  const generateMessage = translateGenerate(languageToUse);

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType),languageToUse)
        .then(() => {
          toast.success(ingressCreatedMessage);
          closeRef?.current?.click();
        })
        .catch(() => toast.error(toastErrorMessage));
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">{generateConnection}</Button>
      </SheetTrigger>
      <SheetContent side="center" className="space-y-3">
        <SheetHeader>
          <SheetTitle>{generateConnection}</SheetTitle>
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
          <AlertTitle>{warningMessage}</AlertTitle>
          <AlertDescription>{resetStreamsWarningMessage}</AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <SheetClose ref={closeRef} asChild>
            <Button variant="ghost">{cancelMessage}</Button>
          </SheetClose>
          <Button disabled={isPending} onClick={onSubmit} variant="primary">
            {generateMessage}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
