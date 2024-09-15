import FormatDate from "@/components/format-Date";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Truck, CircleHelp } from "lucide-react";

interface StatusProductProps {
  updatedAt: Date;
  status: string;
  classStatus?: string;
  titleStatus?: string;
  classTitleStatus?: string;
  noneTitleStatus?: boolean;
}

const StatusProduct: React.FC<StatusProductProps> = ({
  updatedAt,
  status,
  classStatus,
  titleStatus,
  classTitleStatus,
  noneTitleStatus = true,
}) => {
  return (
    <div className="flex space-x-2">
      {noneTitleStatus && (
        <>
          <div className="flex items-center space-x-2">
            <span className={`text-sm flex items-center ${classTitleStatus}`}>
              <Truck className="w-4 h-4 mr-1" /> {titleStatus}
            </span>

            <HoverCard>
              <HoverCardTrigger>
                <CircleHelp className="w-4 h-4 text-gray-500" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p>Cập nhật mới nhất ngày</p>
                <p>
                  <FormatDate subtractiontime={true} data={updatedAt} />
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

      <span className={`${classStatus}`}>{status}</span>
    </div>
  );
};

export default StatusProduct;
