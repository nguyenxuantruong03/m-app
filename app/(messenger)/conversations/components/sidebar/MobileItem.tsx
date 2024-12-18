"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { translateSidebarMessages } from "@/translate/translate-client";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface MobileItemProps {
  href: string | undefined;
  icon: any;
  active?: boolean;
  language: string
}

const MobileItem: React.FC<MobileItemProps> = ({
  icon: Icon,
  href,
  active,
  language
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noneData,setNoneData] = useState(false)
  const [totalDelete, setTotalDelete] = useState<number>(0);
  const [totalSizeInKB, setTotalSizeInKB] = useState<number>(0);

  const sidebarMessage = translateSidebarMessages(language,totalDelete,totalSizeInKB)

  // useEffect để đặt loading thành true nếu totalSizeInKB và totalDelete === 0
  useEffect(() => {
    if (totalDelete === 0 && totalSizeInKB === 0) {
      setNoneData(true);
    }else{
      setNoneData(false);
    }
  }, [totalDelete, totalSizeInKB]);

  const openModal = async () => {
    setOpen(true);
    try {
      setLoading(true);
      const response = await axios.get("/api/messages/messagesystem");
      const { totalDeleted, totalSizeInKB } = response.data;
      setTotalDelete(totalDeleted);
      setTotalSizeInKB(parseFloat(totalSizeInKB)); // Đảm bảo chuyển thành số
    } catch {
      toast.error(sidebarMessage.cantGetDataMessage);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/messages/messagesystem");
      toast.success(sidebarMessage.deleteSuccess);
    } catch {
      toast.error(sidebarMessage.cantDeleteDataMessage);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  
  return (
    <>
      <AlertModal
        title={`${
          totalDelete === 0 && totalSizeInKB === 0
            ? sidebarMessage.cantFindOldMessages
            : sidebarMessage.confirmDeleteOldMessages
        }`}
        message={sidebarMessage.totalMessages}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onSubmit}
        loading={loading || noneData}
      />
      {href ? (
        <Link
          href={href}
          className={clsx(
            `
                group 
                flex
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                text-gray-500
                hover:text-black
                hover:bg-gray-100
                `,
            active && "bg-gray-100 text-black"
          )}
        >
          <Icon />
        </Link>
      ) : (
        <div
          onClick={openModal}
          className={clsx(
            `
                group 
                flex
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                text-gray-500
                hover:text-black
                hover:bg-gray-100
                `,
            active && "bg-gray-100 text-black"
          )}
        >
          <Icon />
        </div>
      )}
    </>
  );
};

export default MobileItem;
