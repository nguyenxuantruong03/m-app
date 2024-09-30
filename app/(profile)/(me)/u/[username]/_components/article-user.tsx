"use client";
import ImageCellOne from "@/components/image-cell-one";
import { useCurrentUser } from "@/hooks/use-current-user";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, X } from "lucide-react";
import Post from "./post";
import { useState } from "react";
import FormPost from "./form-post";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

interface ArticleUserProps {
  self: any;
}

const ArticleUser = ({ self }: ArticleUserProps) => {
  const user = useCurrentUser();
  const [openPost, setOpenPost] = useState(false);

  // If imageCredentials is an array, take the first image's url
  const imageCredentials = Array.isArray(self?.imageCredential)
    ? self.imageCredential[0]?.url
    : self?.imageCredential || undefined;

  // Use the first image from imageCredential, fallback to self?.image, or use null as a last option
  const avatarImage = imageCredentials || self?.image || null;

  // Check if createdAt exists before formatting
  let formatcreatedAt = "";
  if (self?.createdAt) {
    const zonedSubtractedDate = utcToZonedTime(
      new Date(self.createdAt.getTime() - 7 * 60 * 60 * 1000), // Correctly handle createdAt as a Date object
      vietnamTimeZone
    );
    formatcreatedAt = format(
      zonedSubtractedDate,
      "E '-' dd/MM/yyyy '-' HH:mm:ss a",
      { locale: viLocale }
    );
  }
  return (
    <>
      {openPost && (
        <>
          <div className="fixed inset-0 bg-black/80 h-full w-full z-40 flex items-center justify-center">
            <div className="h-[400px] md:h-[500px] overflow-y-auto w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-50">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground break-all line-clamp-2 text-white">
                  Tạo bài viết
                </span>
                <span
                  onClick={() => setOpenPost(false)}
                  className="cursor-pointer rounded-sm hover:rounded-full hover:bg-gray-500 hover:bg-opacity-50 p-3 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none "
                >
                  <X className="h-5 w-5 text-white" />
                </span>
              </div>
              <FormPost setOpen={setOpenPost} self={self} userId={user?.id} />
            </div>
          </div>
        </>
      )}

      <div className="space-y-5">
        {self.id === user?.id && (
          <div className="bg-slate-900 rounded-md text-white p-2 mt-5 lg:mt-0 ">
            <div className="flex items-center space-x-2">
              <Avatar>
                {avatarImage ? (
                  <ImageCellOne imageUrl={avatarImage} />
                ) : (
                  <AvatarFallback className="bg-sky-500">
                    <User className="text-white" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div
                className="w-full bg-gray-300 rounded-full text-slate-900 hover:bg-white hover:bg-opacity-70 p-2 cursor-pointer"
                onClick={() => setOpenPost(true)}
              >
                Bạn đang nghĩ gì ?
              </div>
            </div>
          </div>
        )}

        <Post self={self} />
      </div>
    </>
  );
};

export default ArticleUser;
