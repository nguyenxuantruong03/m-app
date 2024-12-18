"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import Avatar from "../../../AvatarBoxChat";
import { FullMessageType } from "@/types/type";
import ImageModal from "@/components/(client)/boxchat/components/imageModal";

interface MessageBoxProps {
  data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  /* Những dòng mã này đang kiểm tra xem người dùng hiện tại có phải là người gửi tin nhắn hay không và
   tạo danh sách người dùng đã xem tin nhắn. */
  const isOwn = session?.data?.user?.email === data?.sender?.email;

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-1", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100 text-black",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  // Kiểm tra xem createdAt có phải là new Date(0) không
  const createdAtDate = new Date(data.createdAt);
  const showCreatedAt =
    createdAtDate.getTime() !== 0 && !isNaN(createdAtDate.getTime());

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className=" flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          {/* Chỉ hiển thị createdAt nếu không phải new Date(0) */}
          {showCreatedAt && (
            <div className="text-xs text-gray-400">
              {format(new Date(data.createdAt), "p")}
            </div>
          )}
        </div>
        <div className={message}>
          <ImageModal
            setOpen={setImageModalOpen}
            isOpen={imageModalOpen}
            data={data.image || ""}
            width={500}
            height={500}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="Image"
              height="288"
              width="288"
              src={data.image}
              className="
      object-cover 
      cursor-pointer
      hoverLscale-110
      transition
      translate    
      "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
