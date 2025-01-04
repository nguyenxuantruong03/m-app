import { ToggleCardSkeleton } from "@/app/[locale]/(profile)/me/[username]/chat/_components/toggle-card";
import { Skeleton } from "@/components/ui/skeleton";


const ChatSkeleton = () => {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="w-[150px] h-[30px]" />

      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton isChatDelay={true}/>
        <ToggleCardSkeleton />
      </div>
    </div>
  );
};

export default ChatSkeleton;
