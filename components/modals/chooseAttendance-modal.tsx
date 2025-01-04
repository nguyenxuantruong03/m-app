"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
import { useTranslations } from "next-intl";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

interface ChooseAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null | undefined;
  handleOpenCameraModal: () => void;
  handleOpenNFCModal: () => void;
  isCheckAttendanceTitle: string;
  isCheckAttendanceStart: string | Date;
  isCheckAttendanceEnd: string | Date;
}

export const ChooseAttendanceModal: React.FC<ChooseAttendanceModalProps> = ({
  isOpen,
  onClose,
  userId,
  handleOpenCameraModal,
  handleOpenNFCModal,
  isCheckAttendanceTitle,
  isCheckAttendanceStart,
  isCheckAttendanceEnd,
}) => {
  const t = useTranslations()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const start = isCheckAttendanceStart
    ? format(
        utcToZonedTime(
          new Date(
            new Date(isCheckAttendanceStart).setHours(
              new Date(isCheckAttendanceStart).getHours() - 7
            )
          ),
          vietnamTimeZone
        ),
        "E '-' dd/MM/yyyy '-' HH:mm:ss",
        { locale: viLocale }
      )
    : null;

  const end = isCheckAttendanceEnd
    ? format(
        utcToZonedTime(
          new Date(
            new Date(isCheckAttendanceEnd).setHours(
              new Date(isCheckAttendanceEnd).getHours() - 7
            )
          ),
          vietnamTimeZone
        ),
        "E '-' dd/MM/yyyy '-' HH:mm:ss",
        { locale: viLocale }
      )
    : null;

    const statusKey =
    isCheckAttendanceTitle === "✅"
        ? t("attendance.chooseAttendance.statusFinish")
        : t("attendance.chooseAttendance.statusStart");
    const endText = end ? t("attendance.chooseAttendance.timeEnd", { end }) : "";

  return (
    <Modal
      title={t("attendance.chooseAttendance.attendanceMessage",{userId:userId, eventTitle: isCheckAttendanceTitle, status: statusKey, start:start, end:endText })}
      description={t("attendance.chooseAttendance.chooseMethod")}
      isOpen={isOpen}
      onClose={onClose}
      textCenter={true}
      top={true}
    >
      <div className="flex items-center justify-around">
        <div
          className="p-5 bg-white text-black hover:bg-slate-300 cursor-pointer"
          onClick={() => handleOpenNFCModal()}
        >
          {t("attendance.chooseAttendance.nfc")}
        </div>
        <div
          className="p-5 bg-white text-black hover:bg-slate-300 cursor-pointer"
          onClick={() => handleOpenCameraModal()}
        >
          {t("attendance.chooseAttendance.qrCode")}
        </div>
      </div>
    </Modal>
  );
};
