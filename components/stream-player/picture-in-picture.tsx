import { PictureInPicture } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import { getToastError, translatePictureInPicture } from "@/translate/translate-client";
import toast from "react-hot-toast";

interface PictureInPictureControlProps {
  videoElement: HTMLVideoElement | null;
  languageToUse: string;
}

export const PictureInPictureControl = ({ videoElement,languageToUse }: PictureInPictureControlProps) => {
  //language
  const toastErrorMessage = getToastError(languageToUse)
  const pictureInPictureMessage = translatePictureInPicture(languageToUse)

  const enterPictureInPicture = async () => {
    if (!videoElement) return;
    try {
      await videoElement.requestPictureInPicture();
    } catch (error) {
      toast.error(toastErrorMessage);
    }
  };

  return (
    <>
    <Hint label={pictureInPictureMessage} asChild>
    <button onClick={enterPictureInPicture} className="pip-button">
      <PictureInPicture className="w-6 h-6 text-white" />
    </button>
    </Hint>
    </>
  );
};
