"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateStream } from "@/actions/stream/stream";
import { toast } from "react-hot-toast";
import ImageUpload from "../ui/image-upload";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    initialThumbnailUrl
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'; // Ngăn chặn cuộn
    } else {
      document.body.style.overflow = 'auto'; // Khôi phục cuộn
    }

    // Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const onSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name, thumbnailUrl: thumbnailUrl})
        .then(() => {
          toast.success(t("profile.streamUpdated"));
          setOpen(false);
        })
        .catch(() => toast.error(t("toastError.somethingWentWrong")));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (url: string) => {
    setThumbnailUrl(url); // Directly set the string as the new thumbnail
  };

  const handleImageRemove = () => {
    setThumbnailUrl("");
  };

  return (
    <>
      <Button
        variant="link"
        size="sm"
        className="ml-auto"
        onClick={() => setOpen(true)}
      >
        {t("action.edit")}
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 bg-black/80 h-full w-full z-40 flex items-center justify-center">
            <div className="h-max w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-50">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground break-all line-clamp-2 text-white">
                  {t("profile.editInfoStream")}
                </span>
                <span
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-sm hover:rounded-full hover:bg-gray-500 hover:bg-opacity-50 p-3 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none "
                >
                  <X className="h-5 w-5 text-white" />
                </span>
              </div>
              <form onSubmit={onSumbit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">{t("profile.name")}</Label>
                  <Input
                    disabled={isPending}
                    placeholder={t("profile.streamName")}
                    onChange={onChange}
                    value={name}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">{t("profile.thumbnail")}</Label>
                  <div className="flex items-center justify-center">
                    <ImageUpload
                      value={thumbnailUrl ? [thumbnailUrl] : []} // Pass an array with the single string
                      disabled={isPending}
                      onChange={handleImageChange} // Handle the new image
                      onRemove={handleImageRemove} // Handle removing the image
                      maxFiles={1}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-1">
                  <Button
                    disabled={isPending}
                    type="button"
                    variant="secondary"
                    onClick={() => setOpen(false)}
                  >
                    {t("action.cancel")}
                  </Button>
                  <Button disabled={isPending} variant="primary" type="submit">
                    {t("action.save")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
