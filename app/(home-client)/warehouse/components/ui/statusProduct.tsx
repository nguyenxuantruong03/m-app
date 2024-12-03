import FormatDate from "@/components/format-Date";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { translateLatestUpdateDate } from "@/translate/translate-client";
import { Truck, CircleHelp } from "lucide-react";

interface StatusProductProps {
  updatedAt: Date;
  status: string;
  classStatus?: string;
  titleStatus?: string;
  classTitleStatus?: string;
  noneTitleStatus?: boolean;
  languageToUse: string;
}

const StatusProduct: React.FC<StatusProductProps> = ({
  updatedAt,
  status,
  classStatus,
  titleStatus,
  classTitleStatus,
  noneTitleStatus = true,
  languageToUse,
}) => {
  const latestUpdateDataMessage = translateLatestUpdateDate(languageToUse);
  return (
    <div className="flex space-x-2">
      {noneTitleStatus && (
        <>
          <div className="flex items-center space-x-2">
            <span
              className={`text-xs md:text-sm flex items-center ${classTitleStatus}`}
            >
              <Truck className="w-6 h-6 md:w-4 md:h-4 mr-1" /> {titleStatus}
            </span>

            <HoverCard>
              <HoverCardTrigger>
                <CircleHelp className="w-4 h-4 text-gray-500" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p>{latestUpdateDataMessage}</p>
                <p>
                  <FormatDate subtractiontime={true} data={updatedAt} language={languageToUse}/>
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <Separator
            orientation="vertical"
            className="border-gray-300 my-0.5"
          />
        </>
      )}

      <span className={`${classStatus} text-sm md:text-base`}>{status}</span>
    </div>
  );
};

export default StatusProduct;
