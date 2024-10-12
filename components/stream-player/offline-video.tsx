import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
  nameuser: string;
}

export const OfflineVideo = ({ nameuser }: OfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">{nameuser} is offline</p>
    </div>
  );
};
