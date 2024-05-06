"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

interface ChooseAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null | undefined;
  handleOpenCameraModal: () => void;
  handleOpenNFCModal: () => void;
  isCheckAttendanceTitle: string;
  isCheckAttendanceStart: string | Date;
  isCheckAttendanceEnd:  string | Date;
}

export const ChooseAttendanceModal: React.FC<ChooseAttendanceModalProps> = ({
  isOpen,
  onClose,
  userId,
  handleOpenCameraModal,
  handleOpenNFCModal,
  isCheckAttendanceTitle,
  isCheckAttendanceStart,
  isCheckAttendanceEnd
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

  return (
    <Modal
      title={`Chụp ảnh điểm danh - Tên:${userId} - Sự kiện:${isCheckAttendanceTitle} - ${isCheckAttendanceTitle === "✅" ? "Kết thúc" : "Bắt đầu"}: ${start || ""}${end ? ` - Kết thúc: ${end}` : ""}`}
      description="Lựa chọn điểm danh theo phương thức NFC hoặc QrCode!"
      isOpen={isOpen}
      onClose={onClose}
      textCenter={true}
      top={true}
    >

      <div className="flex items-center justify-around">
        <div className="p-5 bg-white text-black hover:bg-slate-300 cursor-pointer"onClick={()=> handleOpenNFCModal()} >
          NFC
        </div>
        <div className="p-5 bg-white text-black hover:bg-slate-300 cursor-pointer" onClick={()=> handleOpenCameraModal()}>
          QrCode
        </div>
      </div>


    </Modal>
  );
};
