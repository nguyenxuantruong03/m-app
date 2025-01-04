import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import LoadingPageComponent from "@/components/ui/loading";
import AvatarBoxChat from "@/components/AvatarBoxChat";

interface UserBoxProps {
  data: User;
}
const UserList: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingPageComponent />
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="
        w-full
        relative
        flex
        items-center
        space-x-3
        bg-neutral-100
        dark:bg-slate-200
        p-3
        hover:bg-neutral-200
        dark:hover:bg-slate-300
        rounded-lg
        transition
        cursor-pointer
        "
        >
          <AvatarBoxChat user={data} />
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <div className="flex justifu-between items-center mb-1">
                <p className="text-sm font-medium text-gray-900 dark:text-slate-900">
                  {data.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserList;
