import { PictureInPicture } from "lucide-react";
import { Hint } from "@/components/ui/hint";

interface PictureInPictureControlProps {
  videoElement: HTMLVideoElement | null;
}

export const PictureInPictureControl = ({ videoElement }: PictureInPictureControlProps) => {

  const enterPictureInPicture = async () => {
    if (!videoElement) return;

    try {
      await videoElement.requestPictureInPicture();
    } catch (error) {
      console.error("Error enabling Picture-in-Picture:", error);
    }
  };

  return (
    <>
    <Hint label="Picture In Picture" asChild>
    <button onClick={enterPictureInPicture} className="pip-button">
      <PictureInPicture className="w-6 h-6 text-white" />
    </button>
    </Hint>
    </>
  );
};
