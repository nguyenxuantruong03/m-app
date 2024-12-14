import { ImageCredential, Stream, UserRole } from "@prisma/client";
import Link from "next/link";
import { VerifiedMark } from "@/components/verified-mark";
import { formatDistanceToNowStrict } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ThumbnailSkeleton,
  Thumbnail,
} from "@/app/(profile-user-other)/(livestream-explore)/listlive/_components/thumbnail";
import vi from "date-fns/locale/vi";
import en from "date-fns/locale/en-US";
import zhCN from "date-fns/locale/zh-CN"; // Tiếng Trung giản thể
import fr from "date-fns/locale/fr";
import ja from "date-fns/locale/ja";

const locales = {
  vi,
  en,
  zh: zhCN,
  fr,
  ja,
};

interface ResultCardProps {
  data: {
    id: string;
    nameuser: string | null;
    name: string | null;
    updatedAt: Date;
    imageCredential?: ImageCredential[];
    image: string | null;
    isCitizen: boolean | null;
    role: UserRole;
    stream: {
      id: string;
      name: string;
      updatedAt: Date;
      thumbnailUrl: string | null;
      isLive: boolean;
    } | null;
  };
  languageToUse: string;
}

export const ResultCard = ({ data, languageToUse }: ResultCardProps) => {
  return (
    <Link href={`/user/${data.nameuser}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data?.stream?.thumbnailUrl || ""}
            fallback={
              data.image ||
              (data.imageCredential && data.imageCredential.length > 0
                ? data.imageCredential[0].url
                : "") // Check if imageCredential is defined and has items
            }
            isLive={data?.stream?.isLive || false}
            nameuser={data.nameuser || ""}
          />
        </div>
        <div className="space-y-1 ">
          <div className="flex items-center">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
              {data.nameuser}
            </p>
            <VerifiedMark
              role={data.role}
              isCitizen={data.isCitizen || false}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {data?.stream && data?.stream?.name ? (
              <>{data.stream.name}</>
            ) : (
              <>{data?.name || ""}</>
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {data?.stream && data?.stream?.updatedAt && (
              <>
                {formatDistanceToNowStrict(new Date(data?.stream?.updatedAt), {
                  locale: locales[languageToUse as keyof typeof locales],
                  addSuffix: true,
                })}
              </>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
};
