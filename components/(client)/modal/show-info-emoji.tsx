"use client";
import Modal from "@/components/ui/modal";
import { Emoji } from "@/types/type";
import Image from "next/image";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { User } from "lucide-react";
import Link from "next/link";
interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  emojiUserIdModal: Emoji[];
}

const getEmojiChangeText = (emoji: string) => {
  let emojiInfo;

  switch (emoji) {
    case "like":
      emojiInfo = {
        imageSrc: "/icon-image/like-icon.png",
        altText: "Thích",
        width: 27,
        height: 27,
        textColor: "#5890ff",
      };
      break;
    case "love":
      emojiInfo = {
        imageSrc: "/icon-image/love.png",
        altText: "Yêu",
        width: 25,
        height: 25,
        textColor: "#f25268",
      };
      break;
    case "haha":
      emojiInfo = {
        imageSrc: "/icon-image/haha.png",
        altText: "Haha",
        width: 26,
        height: 26,
        textColor: "#ffd972",
      };
      break;
    case "wow":
      emojiInfo = {
        imageSrc: "/icon-image/wow-icon.png",
        altText: "Wow",
        width: 25,
        height: 25,
        textColor: "#ffd972",
      };
      break;
    case "sad":
      emojiInfo = {
        imageSrc: "/icon-image/sad.png",
        altText: "Buồn",
        width: 25,
        height: 25,
        textColor: "#ffd972",
      };
      break;
    case "angry":
      emojiInfo = {
        imageSrc: "/icon-image/angry.png",
        altText: "Phẫn nộ",
        width: 25,
        height: 25,
        textColor: "orange", // Màu văn bản
      };
      break;
    default:
      return null;
  }

  return (
    <div
      key={emoji}
      style={{ color: emojiInfo.textColor }}
      className="flex justify-center items-center"
    >
      <Image
        src={emojiInfo.imageSrc}
        alt={emojiInfo.altText}
        width={emojiInfo.width}
        height={emojiInfo.height}
      />
    </div>
  );
};

const ShowInfoEmojiModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  emojiUserIdModal,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      customClass="h-[300px] overflow-y-auto"
      maxWidth="sm"
    >
        <div className="space-y-2">
          {emojiUserIdModal?.map((item) => (
            <div key={item?.user?.id} >
              <Link href={`/user/${item.user?.nameuser}`} className="flex items-center justify-between">
                <div className="space-x-2 flex items-center">
                    {
                      (item?.user?.image ||item?.user?.imageCredential[0]?.url) ? (
                        <Image
                        className="rounded-full"
                        width={35}
                        height={35}
                        src={item?.user?.image ||item?.user?.imageCredential[0]?.url || ""}
                        alt="404"
                      />
                      ): (
                        <Avatar>
                        <AvatarFallback className="bg-sky-500">
                        <User className="text-white" />
                      </AvatarFallback>
                      </Avatar>
                      )
                    }
                  <span className="text-xs">{item.user?.name} </span>
                  </div>
                  <div>
                  {getEmojiChangeText(item?.emoji) || item?.emoji}
                </div>
              </Link>
            </div>
          ))}
        </div>
    </Modal>
  );
};

export default ShowInfoEmojiModal;
