import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface OfflineVideoProps {
  nameuser: string;
}

export const OfflineVideo = ({ nameuser }: OfflineVideoProps) => {
  const t  = useTranslations()
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">{nameuser} {t("profile.offline")}</p>
    </div>
  );
};
