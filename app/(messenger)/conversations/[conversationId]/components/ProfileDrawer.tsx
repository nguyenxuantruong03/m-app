"use client";

import { useCallback, useMemo, useState } from "react";
import useActiveList from "@/hooks/useActiveList";
import useOtherUser from "@/hooks/useOtherUser";
import {
  Ban,
  Check,
  Ellipsis,
  KeyRound,
  SendHorizontal,
  Trash2,
  UserRoundCheck,
  UserX,
  X,
} from "lucide-react";
import FormatDate from "@/components/format-Date";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AvatarBoxChat from "@/components/AvatarBoxChat";
import toast from "react-hot-toast";
import axios from "axios";
import useConversation from "@/hooks/useConversation";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { translateDeleteSuccess, translateProfileDrawerMessages, translateStatusMessages } from "@/translate/translate-client";

interface ProfileDrawerProps {
  data: any & {
    users: any[];
  };
  currentUser: any;
  language: string
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ data, currentUser, language }) => {
  const router = useRouter();
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConFirmOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { conversationId } = useConversation();
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusMessage = translateStatusMessages(language)
  const profileDrawerMessage = translateProfileDrawerMessages(language)
  const deleteSuccessMessage = translateDeleteSuccess(language)

  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        setConFirmOpen(false);
        toast.success(deleteSuccessMessage)
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error(profileDrawerMessage.somethingWentWrong))
      .finally(() => setIsLoading(false));
  }, [conversationId, router]);

  const handleConfirmModal = () => {
    setConFirmOpen(true);
    setIsOpen(false);
  };

  const useFormattedDate = (dataField: Date) => {
    return useMemo(() => {
      return (
        <FormatDate data={dataField} language={currentUser.language || "vi"} />
      );
    }, [dataField]);
  };

  const joinedDate = useFormattedDate(otherUser.createdAt);
  const updateNew = useFormattedDate(otherUser.updatedAt);
  const emailVerified = useFormattedDate(otherUser.emailVerified);
  const lastLogin = useFormattedDate(otherUser.lastlogin);
  const banExpires = useFormattedDate(otherUser.banExpires);
  const timebanforever = useFormattedDate(otherUser.timebanforever);
  const dateRange = useFormattedDate(otherUser.dateRange);
  const dateofbirth = useFormattedDate(otherUser.dateofbirth);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    return isActive ? statusMessage.active : statusMessage.offline;
  }, [isActive]);

  let textColor = "";

  switch (otherUser.role) {
    case "ADMIN":
      textColor = "text-red-500 font-bold";
      break;
    case "STAFF":
      textColor = "text-blue-500 font-bold";
      break;
    case "USER":
      textColor = "text-black font-bold";
      break;
    default:
      textColor = "";
      break;
  }

  const userDetails = [
    {
      label: profileDrawerMessage.role,
      value: otherUser.role && <p className={textColor}>{otherUser.role}</p>,
    },
    { label: profileDrawerMessage.joined, value: joinedDate && <time>{joinedDate}</time> },
    { label: profileDrawerMessage.updateNew, value: updateNew && <time>{updateNew}</time> },
    { label: profileDrawerMessage.email, value: otherUser?.email && <p>{otherUser.email}</p> },
    {
      label: profileDrawerMessage.userName,
      value: otherUser?.nameuser && <p>{otherUser.nameuser}</p>,
    },
    {
      label: profileDrawerMessage.address,
      value: otherUser?.address && <p>{otherUser.address}</p>,
    },
    {
      label: profileDrawerMessage.addressOther,
      value: otherUser?.addressother && <p>{otherUser.addressother}</p>,
    },
    {
      label: profileDrawerMessage.phoneNumber,
      value: otherUser?.phonenumber && <p>{otherUser?.phonenumber}</p>,
    },
    {
      label: profileDrawerMessage.birthday,
      value: otherUser?.dateofbirth && <time>{dateofbirth}</time>,
    },
    
    {
      label: profileDrawerMessage.emailVerified,
      value: otherUser?.emailVerified && <time>{emailVerified}</time>,
    },
    {
      label: profileDrawerMessage.lastLogin,
      value: otherUser?.lastLogin && <time>{lastLogin}</time>,
    },
    {
      label: profileDrawerMessage.ban,
      value: otherUser?.ban && (
        <p>
          {otherUser.ban ? (
            <Ban className="text-red-500" />
          ) : (
            <Check className="text-green-500" />
          )}
        </p>
      ),
    },
    {
      label: profileDrawerMessage.banExpires,
      value: otherUser?.banExpires && <time>{banExpires}</time>,
    },
    {
      label: profileDrawerMessage.banForever,
      value: otherUser?.isbanforever && (
        <p>
          {otherUser.isbanforever ? (
            <UserX className="text-red-500" />
          ) : (
            <UserRoundCheck className="text-green-500" />
          )}
        </p>
      ),
    },
    {
      label: profileDrawerMessage.timeBanForever,
      value: otherUser?.timebanforever && <time>{timebanforever}</time>,
    },
    {
      label: profileDrawerMessage.twoFactor,
      value: otherUser?.isTwoFactorEnabled && (
        <p>
          {otherUser.isTwoFactorEnabled ? (
            <KeyRound className="text-green-500" />
          ) : (
            <KeyRound className="text-red-500" />
          )}
        </p>
      ),
    },
    {
      label: profileDrawerMessage.citizenVerification,
      value: otherUser?.Citizen && (
        <p>
          {otherUser.Citizen ? (
            <Check className="text-green-500" />
          ) : (
            <X className="text-red-500" />
          )}
        </p>
      ),
    },
    {
      label: profileDrawerMessage.citizenIdNumber,
      value: otherUser?.numberCCCD && <p>{otherUser.numberCCCD}</p>,
    },
    {
      label: profileDrawerMessage.issueDate,
      value: otherUser?.dateRange && <time>{dateRange}</time>,
    },
    {
      label: profileDrawerMessage.issuedBy,
      value: otherUser?.issued && <p>{otherUser?.issued}</p>,
    },
    {
      label: profileDrawerMessage.gender,
      value: otherUser?.gender && <p>{otherUser?.gender}</p>,
      key: "gender"
    },
    {
      label: profileDrawerMessage.degree,
      value: otherUser?.degree && <p>{otherUser?.degree}</p>,
      key: "degree"
    },
    {
      label: profileDrawerMessage.maritalStatus,
      value: otherUser?.maritalStatus && <p>{otherUser?.maritalStatus}</p>,
      key: "maritalStatus"
    },
    {
      label: profileDrawerMessage.workingTime,
      value: otherUser?.workingTime && <p>{otherUser?.workingTime}</p>,
      key: "workingTime"
    },
    {
      label: profileDrawerMessage.startWorkTime,
      value: otherUser?.timestartwork && <p>{otherUser?.timestartwork}</p>,
    },
    {
      label: profileDrawerMessage.sendConfirmation,
      value: otherUser?.sentVeirifi && (
        <p>
          {otherUser?.sentVeirifi ? (
            <SendHorizontal className="text-green-500" />
          ) : (
            <SendHorizontal className="text-red-500" />
          )}
        </p>
      ),
    },
    {
      label: profileDrawerMessage.qrCode,
      value: otherUser?.urlimageCheckAttendance && (
        <p>{otherUser?.urlimageCheckAttendance}</p>
      ),
    },
    {
      label: profileDrawerMessage.nfcCode,
      value: otherUser?.codeNFC && <p>{otherUser?.codeNFC}</p>,
    },
    {
      label: profileDrawerMessage.language,
      value: otherUser?.language && <p>{otherUser?.language}</p>,
    },
    {
      label: profileDrawerMessage.workingDay,
      value:
        otherUser?.daywork?.length > 0 &&
        otherUser.daywork.map((day: string, index: number) => (
          <p key={index}>{day}</p>
        )),
    },
  ];

  const filteredDetails = userDetails.filter((detail) => {
    // Kiểm tra role, ẩn các trường không cần thiết nếu role không phải "ADMIN"
    if (otherUser.role !== "ADMIN") {
      return ![
        "Citizen",
        "numberCCCD",
        "dateRange",
        "issued",
        "degree",
        "maritalStatus",
        "workingTime",
        "timestartwork",
        "sentVeirifi",
        "urlimageCheckAttendance",
        "codeNFC",
        "daywork",
      ].includes(detail.label);
    }

    // Kiểm tra nếu giá trị của các trường "gender", "degree", "maritalStatus", "workingTime" là "None"
    if (
      (detail.key === "gender" && otherUser?.gender === "None") ||
      (detail.label === "degree" && otherUser?.degree === "None") ||
      (detail.label === "maritalStatus" &&
        otherUser?.maritalStatus === "None") ||
      (detail.label === "workingTime" &&
        otherUser?.workingTime === "None")
    ) {
      return false; // Nếu giá trị là "None", ẩn trường
    }

    return detail.value; // Hiển thị các trường có giá trị
  });

  return (
    <>
      <AlertModal
        title={profileDrawerMessage.confirmDeleteConversation}
        message={profileDrawerMessage.actionCannotBeUndone}
        isOpen={confirmOpen}
        onClose={() => setConFirmOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <SheetTrigger asChild>
          <Ellipsis
            size={32}
            className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
          />
        </SheetTrigger>
        <SheetContent side="right" className="p-0 sm:max-w-md">
          <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
            <div
              className="
                    relative 
                    mt-6 
                    flex-1 
                    px-4 
                    sm:px-6"
            >
              <div
                className="
                      flex 
                      flex-col 
                      items-center"
              >
                <div className="mb-2">
                  <AvatarBoxChat user={otherUser} />
                </div>
                <div>{title}</div>
                <div className="text-sm text-gray-500">{statusText}</div>
                <div className="flex gap-10 my-8">
                  <div
                    onClick={handleConfirmModal}
                    className="
                            flex 
                            flex-col 
                            gap-3 
                            items-center 
                            cursor-pointer 
                            hover:opacity-75
                            "
                  >
                    <div
                      className="
                            w-10 
                            h-10 
                            bg-neutral-100 
                            rounded-full 
                            flex 
                            items-center 
                            justify-center
                            "
                    >
                      <Trash2 size={20} />
                    </div>
                    <div className="text-sm font-light text-neutral-600">
                      {profileDrawerMessage.delete}
                    </div>
                  </div>
                </div>
                <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                  <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                    {filteredDetails.map((detail, index) => (
                      <div key={index}>
                        <hr />
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            {detail.label}:
                          </dt>
                          <dd className=" mt-1  text-sm text-gray-900 sm:col-span-2">
                            {detail.value}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileDrawer;
