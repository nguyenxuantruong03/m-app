// IconButton.tsx
import { cn } from "@/lib/utils";
import { MouseEventHandler, useState } from "react";
import "./style.css";
import { Button } from "./button";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
  text?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  text,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant="outline" 
      size="icon"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-full flex items-center justify-center bg-white border shadow-md p-1.5 md:p-2 hover:scale-110 transition",
        className
      )}
    >
      {isHovered && text && (
        <div className="absolute top-11 left-5 transform -translate-x-1/2 text-sm bg-red-500 px-2 py-1 rounded-md shadow-md whitespace-nowrap">
          <p>{text}</p>
        </div>
      )}
      {icon}
    </Button>
  );
};

export default IconButton;
