"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../ui/modal";
import NFC from "@/app/(dashboard)/[storeId]/(routes)/attendancestaff/ChooseCheckAttendance/nfc";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
import { translateNfcAttendance } from "@/translate/translate-dashboard";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

interface NfcModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  dataEventNFC: string | undefined;
  setShowNFCModal: Dispatch<SetStateAction<boolean>>;
  userId: string | null | undefined;
  isCheckAttendanceTitle: string;
  isCheckAttendanceStart: string | Date;
  isCheckAttendanceEnd:  string | Date;
  languageToUse: string;
}

export const NfcModal: React.FC<NfcModalProps> = ({
  isOpen,
  onClose,
  loading,
  dataEventNFC,
  setShowNFCModal,
  userId,
  isCheckAttendanceTitle,
  isCheckAttendanceStart,
  isCheckAttendanceEnd,
  languageToUse
}) => {
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

  //language
  const nfcAttendanceMessage = translateNfcAttendance(
    languageToUse,
    userId,
    isCheckAttendanceTitle,
    start,
    end
  )

  return (
    <Modal
    title={nfcAttendanceMessage.attendanceMessage}
      description={nfcAttendanceMessage.salaryInfo}
      isOpen={isOpen}
      onClose={onClose}
      textCenter={true}
    >
      <NFC
        onClose={onClose}
        loading={loading}
        dataEventNFC={dataEventNFC}
        setShowNFCModal={setShowNFCModal}
        languageToUse={languageToUse}
      />
    </Modal>
  );
};
