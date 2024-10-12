import { LiveBadge } from "@/components/live-badge";
import { Button } from "@/components/ui/button";
import CircleAvatar from "@/components/ui/circle-avatar";
import { Hint } from "@/components/ui/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/stream/use-sidebar";
import { EyeOff } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserItemProps {
  nameuser: string;
  imageUrl: string;
  isLive?: boolean;
  frameAvatar: string | null;
  isCitizen: boolean | null;
  role: string;
}
const UserItem = ({
  nameuser,
  imageUrl,
  isLive,
  frameAvatar,
  isCitizen,
  role,
}: UserItemProps) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state) => state);

  const href = `/user/${nameuser}`;
  const isActive = pathname === href;

  return (
    <>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className={cn(
          "w-full h-12",
          collapsed ? "justify-end" : "justify-start",
          isActive && "bg-slate-300 bg-opacity-50"
        )}
      >
        <Link href={href}>
          <div
            className={cn(
              "flex items-center w-full",
              collapsed && "justify-center",
              isLive ? "gap-x-8 ml-3" : "gap-x-4"
            )}
          >
            <CircleAvatar
              nameuser={nameuser}
              srcAvatar={imageUrl}
              srcFrame={frameAvatar || ""}
              role={role}
              isCitizen={isCitizen || undefined}
              isLive={isLive}
              notShowBadge={true}
            />
            {!collapsed && <p className="truncate text-white">{nameuser}</p>}
            {!collapsed && isLive && <LiveBadge className="ml-auto" />}
          </div>
        </Link>
      </Button>
    </>
  );
};

export default UserItem;

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
