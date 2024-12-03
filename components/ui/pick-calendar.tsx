"use client"

import * as React from "react"
import { format, setHours, setMinutes } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getPickCalendar } from "@/translate/translate-dashboard"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (dateRange: DateRange | undefined) => void;
  data: any;
  languageToUse: string
}

export function DatePickerWithRange({
  className,
  data,
  onDateChange,
  languageToUse
}: DatePickerWithRangeProps) {
  //language
  const pickCalendarMessage = getPickCalendar(languageToUse)

  const minDate = React.useMemo(() => {
    if (data.length === 0) return new Date();
    return new Date(Math.min(...data.map((item: any) => new Date(item.createdAt).getTime())));
  }, [data]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: minDate,
    to: new Date(),
  });
  const [fromTime, setFromTime] = React.useState({ hours: 0, minutes: 0 });
  const [toTime, setToTime] = React.useState({ hours: 23, minutes: 59 });

  const handleDateChange = (dateRange: DateRange | undefined) => {
    if (dateRange) {
      if (dateRange.from) {
        dateRange.from = setHours(setMinutes(dateRange.from, fromTime.minutes), fromTime.hours);
      }
      if (dateRange.to) {
        dateRange.to = setHours(setMinutes(dateRange.to, toTime.minutes), toTime.hours);
      }
    }
    setDate(dateRange);
    onDateChange(dateRange);
  };

  const handleTimeChange = (type: "from" | "to", hours: number, minutes: number) => {
    // Update the time based on the type ("from" or "to")
    setFromTime((prevFromTime) => {
      const updatedFrom = type === "from" ? { hours, minutes } : prevFromTime;
      const updatedTo = type === "to" ? { hours, minutes } : toTime;

      const newDateRange = { from: date?.from, to: date?.to };

      if (updatedFrom) {
        newDateRange.from = setHours(setMinutes(date?.from || new Date(), updatedFrom.minutes), updatedFrom.hours);
      }
      if (updatedTo) {
        newDateRange.to = setHours(setMinutes(date?.to || new Date(), updatedTo.minutes), updatedTo.hours);
      }

      setDate(newDateRange);
      onDateChange(newDateRange);

      return updatedFrom;
    });

    setToTime((prevToTime) => {
      const updatedFrom = type === "from" ? { hours, minutes } : fromTime;
      const updatedTo = type === "to" ? { hours, minutes } : prevToTime;

      const newDateRange = { from: date?.from, to: date?.to };

      if (updatedFrom) {
        newDateRange.from = setHours(setMinutes(date?.from || new Date(), updatedFrom.minutes), updatedFrom.hours);
      }
      if (updatedTo) {
        newDateRange.to = setHours(setMinutes(date?.to || new Date(), updatedTo.minutes), updatedTo.hours);
      }

      setDate(newDateRange);
      onDateChange(newDateRange);

      return updatedTo;
    });
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[250px] md:w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy HH:mm")} - {format(date.to, "dd/MM/yyyy HH:mm")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy HH:mm")
              )
            ) : (
              <span>{pickCalendarMessage.pickDateTime}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label>{pickCalendarMessage.fromTime}</label>
              <input
                type="time"
                value={`${fromTime.hours.toString().padStart(2, "0")}:${fromTime.minutes.toString().padStart(2, "0")}`}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(":").map(Number);
                  handleTimeChange("from", hours, minutes);
                }}
                className="border p-1 rounded"
              />
            </div>
            <div>
              <label>{pickCalendarMessage.toTime}</label>
              <input
                type="time"
                value={`${toTime.hours.toString().padStart(2, "0")}:${toTime.minutes.toString().padStart(2, "0")}`}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(":").map(Number);
                  handleTimeChange("to", hours, minutes);
                }}
                className="border p-1 rounded"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
