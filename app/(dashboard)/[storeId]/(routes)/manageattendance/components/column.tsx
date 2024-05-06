  "use client";

  import { ZoomModal } from "@/components/modals/zoom-modal";
  import { ColumnDef } from "@tanstack/react-table";
  import { Tally4, Tally5, CalendarOff, X, Check } from "lucide-react";
  import Image from "next/image";
  import Link from "next/link";
  import { useState } from "react";

  export type ManageAttendancesColumn = {
    id: string;
    attendancestart: string | null;
    attendanceend: string | null;
    title: string | null;
    start: string | null;
    end: string | null;
    allDay: boolean | null;
    user: string | null;
    wokingTime: string | null;
    email: string | null;
    delayTime: string | null;
    urlImageAttendance: string | null;
    qrcodeCheckAttendance: string | null;
    updateImage: string | null;
    updateNFC: string | null;
    isCheckAttendanceImage: boolean | null;
    createdAt: string | null;
  };

  const ImageCell: React.FC<{ imageUrl: string,updateImage: string | null,email:string | null }> = ({ imageUrl,updateImage,email }) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const openImageModal = () => setIsImageModalOpen(true);
    const closeImageModal = () => setIsImageModalOpen(false);

    return (
      <>
        <div className="cursor-pointer" onClick={openImageModal}>
          <Image
            src={imageUrl}
            alt="User Avatar"
            width="50"
            height="50"
            className="rounded-full"
          />
        </div>
        {isImageModalOpen && (
          <ZoomModal
            imageUrl={imageUrl}
            updateImage={updateImage}
            email={email}
            onClose={closeImageModal}
            isOpen={true}
          />
        )}
      </>
    );
  };

  export const columns: ColumnDef<ManageAttendancesColumn>[] = [
    {
      accessorKey: "user",
      header: "Tên",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "image",
      header: "ImageApp",
      cell: ({ row }) => {
        const imageUrl = row.original.urlImageAttendance;
        const updateImage = row.original.updateImage;
        const email = row.original.email;
        // Check if the image URL is available
        if (imageUrl) {
          return <ImageCell imageUrl={imageUrl} updateImage={updateImage} email={email}/>;
        }
        return "";
      },
    },
    {
      accessorKey: "qrcodeCheckAttendance",
      header: "qrcode",
      cell: ({ row }) => {
        const linkqrcode = row.original.qrcodeCheckAttendance;
        // Check if the image URL is available
        if (linkqrcode) {
          return (
            <Link
              target="_blank"
              className="text-sky-500 hover:underline"
              href={linkqrcode}
            >
              {linkqrcode}
            </Link>
          );
        } else {
          return <span className="text-red-500 font-bold">Not Found!</span>;
        }
      },
    },
    {
      accessorKey: "wokingTime",
      header: "Thời gian làm việc",
    },
    {
      accessorKey: "title",
      header: "title",
    },
    {
      accessorKey: "start",
      header: "start",
    },
    {
      accessorKey: "delayTime",
      header: "Thời gian trễ ",
    },
    {
      accessorKey: "end",
      header: "end",
      cell: ({ row }) => {
        const endTime = row.original.end;
        return endTime ? (
          <span>{endTime}</span>
        ) : (
          <CalendarOff className="w-5 h-5 text-red-500" />
        );
      },
    },
    {
      accessorKey: "allDay",
      header: "allDay",
      cell: ({ row }) => {
        const isAllday = row.original.allDay;
        return isAllday ? (
          <Tally4 className="w-5 h-5 text-green-500" />
        ) : (
          <Tally5 className="w-5 h-5 text-red-500" />
        );
      },
    },
    {
      accessorKey: "isCheckAttendanceImage",
      header: "isCheckImage",
      cell: ({ row }) => {
        const isCheckAttendanceImage = row.original.isCheckAttendanceImage;
        return isCheckAttendanceImage ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <X className="w-5 h-5 text-red-500" />
        );
      },
    },
    {
      accessorKey: "updateImage",
      header: "Cập nhật hình ảnh",
    },
    {
      accessorKey: "updateNFC",
      header: "Cập nhật NFC",
    },
    {
      accessorKey: "createdAt",
      header: "createdAt",
    },
  ];
