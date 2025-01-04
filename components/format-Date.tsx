import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import { useCurrentUser } from "@/hooks/use-current-user";

interface FormatDateProps {
  data: Date | null;
  noneTime?: boolean;
  subtractiontime?: boolean;
}

const FormatDate: React.FC<FormatDateProps> = ({ data, noneTime, subtractiontime }) => {
  if (!data) return null;
  const user = useCurrentUser()
  const language = user?.language

  const vietnamTimeZone = "Asia/Ho_Chi_Minh";
  const zonedDate = utcToZonedTime(new Date(data), vietnamTimeZone);
  const zonedSubtractedDate = utcToZonedTime(new Date(new Date(data).getTime() - (7 * 60 * 60 * 1000)), vietnamTimeZone);

  // Map language to locale
  const localeMap: Record<string, Locale> = {
    vi: viLocale,
    en: enLocale,
  };

  const locale = localeMap[language || "vi"] || enLocale; // Default to English if language is not supported

  return (
    <>
      {subtractiontime ? (
        format(zonedSubtractedDate, "E '-' dd/MM/yyyy '-' HH:mm:ss a", { locale })
      ) : (
        noneTime
          ? format(zonedDate, "dd/MM/yyyy", { locale })
          : format(zonedDate, "E '-' dd/MM/yyyy '-' HH:mm:ss a", { locale })
      )}
    </>
  );
};

export default FormatDate;
