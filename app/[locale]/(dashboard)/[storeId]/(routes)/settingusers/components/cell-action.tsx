"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Ban, Lock, ShieldCheck, ShieldOff,KeyRound } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { SettingUsersColumn } from "./column";
import SheetBanUser from "./sheet-ban";
import { useTranslations } from "next-intl";

interface CellActionProps {
  data: SettingUsersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/settingusers`, {
        data: { id: data.id },
      });
      router.refresh();
      toast.success(t("settinguser.cellaction.userBannedForever"));
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data.error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(
          t("toastError.somethingWentWrong")
        );
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const UnBanUser = async () => {
    try {
      setLoading(true);
      const promise = axios.post(`/api/${params.storeId}/settingusers/unban`, {
        userId: data.id,
      });
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {t("settinguser.cellaction.unban")}:{" "}
              <span className="font-bold">
                {data.email} - <span className="font-bold">{data.name}</span>
              </span>
              .
            </p>
          );
        }),
        {
          loading: t("settinguser.cellaction.updatingUnbanUser"),
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } }).response &&
              (error as { response: { data?: { error?: string } } }).response.data &&
              (error as { response: { data: { error?: string } } }).response.data.error
            ) {
              return (error as { response: { data: { error: string } } }).response.data.error;
            } else {
              return t("toastError.somethingWentWrong");
            }
          },
        }
      );
    } catch (error) {
      toast.error(t("toastError.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const OpenCitizen = async () => {
    try {
      setLoading(true);
      const promise = axios.post(`/api/${params.storeId}/settingusers/isCitizen`, {
        userId: data.id,
      });
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {t("settinguser.cellaction.fullAuthentication")}:{" "}
              <span className="font-bold">
                {data.email} - <span className="font-bold">{data.name}</span>
              </span>
              .
            </p>
          );
        }),
        {
          loading: t("settinguser.cellaction.updatingCitizenUser"),
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } }).response &&
              (error as { response: { data?: { error?: string } } }).response.data &&
              (error as { response: { data: { error?: string } } }).response.data.error
            ) {
              return (error as { response: { data: { error: string } } }).response.data.error;
            } else {
              return t("toastError.somethingWentWrong");
            }
          },
        }
      );
    } catch (error) {
      toast.error(t("toastError.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const UnCitizen = async () => {
    try {
      setLoading(true);
      const promise = axios.patch(`/api/${params.storeId}/settingusers/isCitizen`, {
        userId: data.id,
      });
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {t("settinguser.cellaction.removeAuthentication")}:{" "}
              <span className="font-bold">
                {data.email} - <span className="font-bold">{data.name}</span>
              </span>
              .
            </p>
          );
        }),
        {
          loading: t("settinguser.cellaction.updatingCitizenUser"),
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } }).response &&
              (error as { response: { data?: { error?: string } } }).response.data &&
              (error as { response: { data: { error?: string } } }).response.data.error
            ) {
              return (error as { response: { data: { error: string } } }).response.data.error;
            } else {
              return t("toastError.somethingWentWrong");
            }
          },
        }
      );
    } catch (error) {
      toast.error(t("toastError.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

   //Bỏ pointer-event:none khi không có isAISheetOpen
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [open]);

   //Bỏ pointer-event:none khi không có isAISheetOpen
  useEffect(() => {
    if (!openSheet) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [openSheet]);
  
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <SheetBanUser
        email={data.email || ""}
        openSheet={openSheet}
        userId = {data.id || ""}
        setOpenSheet={setOpenSheet}
        name={data.name || ""}
        banTime= {data.banExpiresTime}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t("action.openMenu")}</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{t("action.action")}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Ban className="h-4 w-4 mr-2" />
            {t("settinguser.cellaction.banForever")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenSheet(true)}>
            <Lock className="h-4 w-4 mr-2" />
            {t("settinguser.cellaction.ban")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={UnBanUser}>
            <KeyRound className="h-4 w-4 mr-2" />
            {t("settinguser.cellaction.unban")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={OpenCitizen}>
            <ShieldCheck className="h-4 w-4 mr-2" />
            {t("settinguser.cellaction.fullAuthenticationText")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={UnCitizen}>
            <ShieldOff className="h-4 w-4 mr-2" />
            {t("settinguser.cellaction.removeAuthenticationText")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
