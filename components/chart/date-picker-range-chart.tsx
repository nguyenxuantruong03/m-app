import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";

interface ProductData {
  totalSold: number;
  totalReviews: number;
  totalComments: number;
  totalOrderItems: number;
  createdAt: string;
}

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (dateRange: DateRange | undefined) => void;
  data?: Record<string, ProductData>;
  treeMapData?: any;
  radarData?: any;
  loading: boolean;
}

export function DatePickerWithRangeChart({
  className,
  data = {},
  treeMapData,
  radarData,
  onDateChange,
  loading
}: DatePickerWithRangeProps) {
  const t = useTranslations()
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [isUserInteracting, setIsUserInteracting] = React.useState(false);
  const [hasInitialized, setHasInitialized] = React.useState(false);

  const minDateFromProducts = React.useMemo(() => {
    const dates = Object.values(data)?.map((item: ProductData) =>
      new Date(item.createdAt).getTime()
    );
    return dates.length ? new Date(Math.min(...dates)) : new Date();
  }, [data]);

  const createdAtRadar = radarData?.find((item: any) => item.createdAt !== undefined);
  let formattedDateRadar: string | undefined;

  if (createdAtRadar) {
    const createdAtDate = new Date(createdAtRadar.createdAt);
    formattedDateRadar = createdAtDate.toISOString();
  }

  const allUsers = React.useMemo(() => treeMapData?.flatMap((role: any) => role.user), [treeMapData]);

  const oldestCreatedAt = React.useMemo(() => {
    if (allUsers?.length) {
      return allUsers.reduce((oldest: any, currentUser: any) => {
        return new Date(currentUser.createdAt) < new Date(oldest)
          ? currentUser.createdAt
          : oldest;
      }, allUsers[0].createdAt);
    }
    return null;
  }, [allUsers]);

  React.useEffect(() => {
    if (!hasInitialized) {
      const initialFromDate = formattedDateRadar ? new Date(formattedDateRadar) : (oldestCreatedAt ? new Date(oldestCreatedAt) : minDateFromProducts);
      if (initialFromDate && date?.from?.getTime() !== initialFromDate.getTime()) {
        setDate({ from: initialFromDate, to: new Date() });
      }
      setHasInitialized(true);
    }
  }, [oldestCreatedAt, minDateFromProducts, hasInitialized, date, formattedDateRadar]);

  React.useEffect(() => {
    if (!isUserInteracting && hasInitialized) {
      const initialFromDate = formattedDateRadar ? new Date(formattedDateRadar) : (oldestCreatedAt ? new Date(oldestCreatedAt) : minDateFromProducts);
      if (initialFromDate && date?.from?.getTime() !== initialFromDate.getTime()) {
        setDate((prevDate) => ({
          from: initialFromDate,
          to: prevDate?.to || new Date(),
        }));
      }
    }
  }, [oldestCreatedAt, minDateFromProducts, isUserInteracting, hasInitialized, date, formattedDateRadar]);

  const handleDateChange = (dateRange: DateRange | undefined) => {
    setIsUserInteracting(true);
    setDate(dateRange);
    onDateChange(dateRange);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild disabled={loading}>
          <Button
            id="date"
            variant={"outline"}
            disabled={loading}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{t("chart.pickadate")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" >
          <Calendar
            disabled={loading}
            initialFocus
            mode="range"
            defaultMonth={minDateFromProducts || undefined}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
