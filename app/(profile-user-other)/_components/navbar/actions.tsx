import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftFromLine, Clapperboard } from "lucide-react";
import { currentUser } from "@/lib/auth";
import { UserButton } from "@/components/auth/user-button";

interface ActionsProps {
  exitLink?: boolean;
}

const Actions = async ({ exitLink }: ActionsProps) => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-end gap-x-2 lg:ml-0">
      {!user && (
        <div>
          <Link href="/auth/login">
            <Button variant="primary" size="sm">
              Login
            </Button>
          </Link>
        </div>
      )}
      {!!user && (
        <div className={`flex items-center ${user?.isLive ? "mr-14" : ""}`}>
          <Button
            size="sm"
            variant="ghost"
            className={`text-muted-foreground hover:text-primary px-2 md:px-3 ${user?.isLive ? "mr-12" : ""}`}
          >
            {exitLink ? (
              <Link href={`/explore`} className="flex items-center">
                <ArrowLeftFromLine className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:block">Exit</span>
              </Link>
            ) : (
              <Link href={`/me/${user.nameuser}`} className="flex items-center">
                <Clapperboard className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>
            )}
          </Button>

          <UserButton />
        </div>
      )}
    </div>
  );
};

export default Actions;
