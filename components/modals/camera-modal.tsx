"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../ui/modal";
import Camera from "@/app/[locale]/(dashboard)/[storeId]/(routes)/attendancestaff/ChooseCheckAttendance/camera";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
import { useTranslations } from "next-intl";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  dataEventCamera: string | undefined;
  setShowCameraModal: Dispatch<SetStateAction<boolean>>;
  userId: string | null | undefined;
  isCheckAttendanceTitle: string;
  isCheckAttendanceStart: string | Date;
  isCheckAttendanceEnd: string | Date;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  loading,
  dataEventCamera,
  setShowCameraModal,
  userId,
  isCheckAttendanceTitle,
  isCheckAttendanceStart,
  isCheckAttendanceEnd,
}) => {
  const t = useTranslations();
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
  ? t("attendance.camera.statusFinish")
  : t("attendance.camera.statusStart");
  const endText = end ? t("attendance.camera.timeEnd", { end }) : "";

  return (
    <Modal
      title={t("attendance.camera.attendanceMessage",{userId:userId, eventTitle: isCheckAttendanceTitle, status: statusKey, start:start, end:endText })}
      description={t("attendance.camera.salaryInfo")}
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="5xl"
      textCenter={true}
    >
      <Camera
        onClose={onClose}
        loading={loading}
        dataEventCamera={dataEventCamera}
        setShowCameraModal={setShowCameraModal}
      />
    </Modal>
  );
};
