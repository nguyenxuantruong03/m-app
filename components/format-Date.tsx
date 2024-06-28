import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";
import { format } from "date-fns";

interface FormatDateProps {
  data: Date | null;
  noneTime?: boolean;
  subtractiontime?: boolean;
}

const FormatDate: React.FC<FormatDateProps> = ({ data, noneTime, subtractiontime }) => {
  if (!data) return null;

  const zonedDate = utcToZonedTime(new Date(data), vietnamTimeZone);
  const zonedSubtractedDate = utcToZonedTime(new Date(new Date(data).getTime() - (7 * 60 * 60 * 1000)), vietnamTimeZone);

  return (
    <>
      {subtractiontime ? (
        format(zonedSubtractedDate, "E '-' dd/MM/yyyy '-' HH:mm:ss a", { locale: viLocale })
      ) : (
        noneTime
          ? format(zonedDate, "dd/MM/yyyy", { locale: viLocale })
          : format(zonedDate, "E '-' dd/MM/yyyy '-' HH:mm:ss a", { locale: viLocale })
      )}
    </>
  );
};

export default FormatDate;
