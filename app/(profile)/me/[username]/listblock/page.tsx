"use client";
import { getBlockedUsers } from "@/lib/stream/block-service";
import { columns } from "./_components/column";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  getToastError,
  translateListBlockSettings,
} from "@/translate/translate-client";

const CommunityPage = () => {
  const user = useCurrentUser();
  const [blockedUsers, setBlockedUsers] = useState<any[]>([]);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const toastErrorMessage = getToastError(languageToUse);
  const listBlockSettingMessage = translateListBlockSettings(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blockedUsers = await getBlockedUsers();
        setBlockedUsers(blockedUsers);
      } catch (error) {
        toast.error(toastErrorMessage);
      }
    };
    fetchData();
  }, []);

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageCredential[0].url || block.blocked.image || "",
    nameuser: block.blocked.nameuser,
    createdAt: block.blocker.blocking.find((item: any) => item)?.createdAt!,
    frameAvatar: block.blocked.frameAvatar,
    role: block.blocked.role,
    isCitizen: block.blocked.isCitizen,
    isLive: block?.blocked?.stream?.isLive,
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
          {listBlockSettingMessage}
        </h1>
      </div>
      <DataTable
        columns={columns}
        data={formattedData}
        searchKey="nameuser"
        showSelected={false}
        languageToUse={languageToUse}
      />
    </div>
  );
};

export default CommunityPage;
