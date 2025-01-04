import { PictureInPicture } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface PictureInPictureControlProps {
  videoElement: HTMLVideoElement | null;
}

export const PictureInPictureControl = ({ videoElement }: PictureInPictureControlProps) => {
  const t = useTranslations()

  const enterPictureInPicture = async () => {
    if (!videoElement) return;
    try {
      await videoElement.requestPictureInPicture();
    } catch (error) {
      toast.error(t("toastError.somethingWentWrong"));
    }
  };

  return (
    <>
    <Hint label={t("action.pictureInPicture")} asChild>
    <button onClick={enterPictureInPicture} className="pip-button">
      <PictureInPicture className="w-6 h-6 text-white" />
    </button>
    </Hint>
    </>
  );
};
