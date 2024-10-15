"use client";
import Modal from "@/components/ui/modal";
import Image from "next/image";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { User } from "lucide-react";
import Link from "next/link";
interface ShowInfoUserProps {
  isOpen: boolean;
  onClose: () => void;
  staffUsers: any[];
}

const ShowInfoUserModal: React.FC<ShowInfoUserProps> = ({
  isOpen,
  onClose,
  staffUsers,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      customClass="h-[300px] overflow-y-auto"
      maxWidth="sm"
    >
        <div className="space-y-2">
          {staffUsers?.map((item) => (
            <div key={item?.id} >
              <Link href={`/user/${item.nameuser}`} className="flex items-center space-x-5">
                {
                  (item?.image ||item?.imageCredential[0]?.url) ? (
                    <Image
                    className="rounded-full"
                    width={35}
                    height={35}
                    src={ item?.imageCredential[0]?.url || item?.image || ""}
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
              <span className="text-xs">{item?.name} </span>
            </Link>
              </div>
          ))}
        </div>
    </Modal>
  );
};

export default ShowInfoUserModal;
