import { Hint } from "@/components/ui/hint";
import { Smile, Meh, Frown, Annoyed, Angry } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface EmotionFeedBackProps {
  setIndexEmotion: Dispatch<SetStateAction<number | null>>;
  indexEmotion: number | null;
  setErrorEmotion: Dispatch<SetStateAction<boolean>>;
  errorEmotion: boolean;
}

const EmotionFeedBack = ({
  setIndexEmotion,
  indexEmotion,
  setErrorEmotion,
  errorEmotion,
}: EmotionFeedBackProps) => {
  const handleClick = (emotionIndex: number) => {
    if (indexEmotion === emotionIndex) {
      // If the same emotion is clicked, deselect it (set indexEmotion to null)
      setIndexEmotion(null);
      setErrorEmotion(true); // Trigger the error when deselecting
    } else {
      // Otherwise, select the new emotion and clear the error
      setIndexEmotion(emotionIndex);
      setErrorEmotion(false); // Reset error state when a valid emotion is selected
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 justify-center">
        <Hint label="Tốt">
          <Smile
            onClick={() => handleClick(1)}
            className={`w-14 h-14 stroke-current  ${
              indexEmotion === 1 ? "fill-[#22c55e]" : "hover:stroke-[#22c55e]"
            }`}
            strokeWidth="0.75"
          />
        </Hint>
        <Hint label="Tạm">
          <Meh
            onClick={() => handleClick(2)}
            className={`w-14 h-14 stroke-current  ${
              indexEmotion === 2 ? "fill-[#2563eb]" : "hover:stroke-[#2563eb]"
            }`}
            strokeWidth="0.75"
          />
        </Hint>
        <Hint label="Tệ">
          <Frown
            onClick={() => handleClick(3)}
            className={`w-14 h-14 stroke-current  ${
              indexEmotion === 3 ? "fill-[#facc15]" : "hover:stroke-[#facc15]"
            }`}
            strokeWidth="0.75"
          />
        </Hint>
        <Hint label="Phục vụ kém">
          <Annoyed
            onClick={() => handleClick(4)}
            className={`w-14 h-14 stroke-current  ${
              indexEmotion === 4 ? "fill-[#dc2626]" : "hover:stroke-[#dc2626]"
            }`}
            strokeWidth="0.75"
          />
        </Hint>
        <Hint label="Quá tệ">
          <Angry
            onClick={() => handleClick(5)}
            className={`w-14 h-14 stroke-current  ${
              indexEmotion === 5 ? "fill-[#f97316]" : "hover:stroke-[#f97316]"
            }`}
            strokeWidth="0.75"
          />
        </Hint>
      </div>
      {errorEmotion && (
        <p className="text-red-500 text-xs">Please select an emotion</p>
      )}
    </div>
  );
};

export default EmotionFeedBack;