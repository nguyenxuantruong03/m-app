import { Play, Pause } from "lucide-react";
import { Hint } from "@/components/ui/hint";

interface PlayPauseControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const PlayPauseControl = ({ isPlaying, onToggle }: PlayPauseControlProps) => {
    const Icon = isPlaying ? Pause : Play;
     const label = isPlaying ? "Pause" : "Play"
  return (
    <>
    <Hint label={label} asChild>
    <button
                onClick={onToggle}
                className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                >
                    <Icon className="h-5 w-5"/>
                </button>
    </Hint>
    </>
  );
};
