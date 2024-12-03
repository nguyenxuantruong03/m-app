"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam
import { format } from "date-fns";
import { getSystemAction } from "@/translate/translate-dashboard";

type System = {
  id: string;
  newChange: string[];
  oldChange: string[];
  delete: string[];
  type: string | null;
  user: string | null;
  createdAt: Date | null;
  language: string;
};

interface ShowSystemProps {
  isOpen: boolean;
  onClose: () => void;
  data: System;
}

export const ShowSystem: React.FC<ShowSystemProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  //language
  const systemActionMessage = getSystemAction(data.language)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const formatDate = (date: Date | null, noneTime?: boolean) => {
    if (!date) return null;
    const zonedDate = utcToZonedTime(new Date(date), vietnamTimeZone);
    return noneTime
      ? format(zonedDate, "dd/MM/yyyy", { locale: viLocale })
      : format(zonedDate, "E '-' dd/MM/yyyy '-' HH:mm:ss a", { locale: viLocale });
  };

  return (
    <Modal
      title={systemActionMessage.userProcess}
      description={systemActionMessage.userInfo}
      isOpen={isOpen}
      onClose={onClose}
      textCenter={false}
      maxWidth="6xl"
    >
      <div className="overflow-x-auto md:w-2/6 lg:w-[45%] xl:w-8/12 2xl:w-11/12">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-500">
              {Object.keys(data).map((key) => {
                if (
                  data[key as keyof System] !== null &&
                  data[key as keyof System] !== undefined &&
                  !Array.isArray(data[key as keyof System])
                ) {
                  return (
                    <th key={key} className="px-6 py-3 text-left font-semibold">
                      {key}
                    </th>
                  );
                }
                return null;
              })}
            </tr>
          </thead>
          <tbody className="bg-slate-900 divide-y divide-gray-300">
            <tr>
              {Object.keys(data).map((key) => {
                if (
                  data[key as keyof System] !== null &&
                  data[key as keyof System] !== undefined &&
                  !Array.isArray(data[key as keyof System])
                ) {
                  return (
                    <td
                      key={key}
                      className="px-6 py-4 text-black dark:text-white"
                    >
                      {key === "createdAt" ? (
                        formatDate(data[key as keyof System] as Date)
                      ) : (
                        String(data[key as keyof System])
                      )}
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default ShowSystem;
