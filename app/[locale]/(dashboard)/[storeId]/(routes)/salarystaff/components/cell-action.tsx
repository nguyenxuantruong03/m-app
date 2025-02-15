"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  BadgeDollarSign,
  HandCoins,
  RotateCcw,
  WalletCards,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { SalaryStaffsColumn } from "./column";
import { Input } from "@/components/ui/input";
import "./styles.css";
import { formatter } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CellActionProps {
  data: SalaryStaffsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const t = useTranslations()
  const router = useRouter();
  const params = useParams();

  const [bonusAmount, setBonusAmount] = useState<number | string>("");
  const [unbonusAmount, setUnbonusAmount] = useState<number | string>("");
  const [bonusTitle, setbonusTitle] = useState<number | string>("");
  const [unbonusTitle, setUnbonusTitle] = useState<number | string>("");

  const [loading, setLoading] = useState(false);
  const [openBonus, setOpenBonus] = useState(false);
  const [openUnbonus, setOpenUnbonus] = useState(false);

  // Function to close modals when clicking outside
  const handleCloseModal = () => {
    setOpenBonus(false);
    setOpenUnbonus(false);
  };

  // Function to prevent closing modal when clicking inside modal content
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const onBonus = async () => {
    try {
      setLoading(true);
      // Truy xuất giá trị thưởng hiện tại từ cơ sở dữ liệu
      const response = await axios.get(
        `/api/${params.storeId}/salarystaff/${data.id}`
      );
      const currentBonus = response.data.bonus;
      // Lấy giá trị thưởng mới từ state
      const newBonus = Number(bonusAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedBonus = currentBonus + newBonus;
      // Gửi yêu cầu PATCH với giá trị thưởng đã được cập nhật
      const promise = axios.patch(`/api/${params.storeId}/salarystaff`, {
        bonusAmount: updatedBonus,
        bonus: newBonus,
        bonusTitle: bonusTitle,
      });

      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {t("salarystaff.cellaction.added")} <span className="font-bold">{bonusTitle}</span>. {t("salarystaff.cellaction.bonusAmount")}
              <span className="font-bold">+{formatter.format(newBonus)}</span>.
              {t("salarystaff.cellaction.remainingBonus")}
              <span className="font-bold">
                {formatter.format(updatedBonus)}
              </span>
            </p>
          );
        }),
        {
          loading: t("salarystaff.cellaction.updatingBonus"),
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
              return (error as { response: { data: { error: string } } }).response.data.error
            } else {
              return t("toastError.somethingWentWrong");
            }
          },
        }
      );
    } catch (error) {} 
      finally {
      setLoading(false);
      setOpenBonus(false);
      setBonusAmount(0);
      setbonusTitle("");
    }
  };

  const onUnbonus = async () => {
    try {
      setLoading(true);
      // Truy xuất giá trị thưởng hiện tại từ cơ sở dữ liệu
      const response = await axios.get(
        `/api/${params.storeId}/salarystaff/${data.id}`
      );
      const currentBonus = response.data.bonus;
      // Lấy giá trị thưởng mới từ state
      const newBonus = Number(unbonusAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedBonus = currentBonus - newBonus;
      const promise = axios.post(`/api/${params.storeId}/salarystaff`, {
        unbonusAmount: updatedBonus,
        unbonus: newBonus,
        unbonusTitle: unbonusTitle,
      });

      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {" "}
              {t("salarystaff.cellaction.added")} <span className="font-bold">{bonusTitle}</span>. {t("salarystaff.cellaction.unbonusAmount")}
              <span className="font-bold">-{formatter.format(newBonus)}</span>.
              {t("salarystaff.cellaction.remainingBonus")}
              <span className="font-bold">
                {formatter.format(updatedBonus)}
              </span>
              .
            </p>
          );
        }),
        {
          loading: t("salarystaff.cellaction.updatingUnbonus"),
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
              return (error as { response: { data: { error: string } } }).response.data.error
            } else {
              return t("toastError.somethingWentWrong");
            }
          },
        }
      );
    }catch (error) {} 
     finally {
      setLoading(false);
      setOpenUnbonus(false);
      setUnbonusAmount(0);
      setbonusTitle("");
    }
  };

  const onPaid = async () => {
    try {
      setLoading(true);
      const promise = axios.patch(
        `/api/${params.storeId}/salarystaff/${data.id}`
      );
      await toast.promise(
        promise.then(() => {
          return (
            <p>
             {t("salarystaff.cellaction.paidSalaryTo")} <span className="font-bold">{data.name}</span>
            </p>
          );
        }),
        {
          loading: t("salarystaff.cellaction.updatingPaid"),
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
              return (error as { response: { data: { error: string } } }).response.data.error
            } else {
              return t("toastError.somethingWentWrong");
            }
          },
        }
      );
    } catch (error) {} 
      finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    try {
      setLoading(true);
      const promise = axios.post(
        `/api/${params.storeId}/salarystaff/${data.id}`
      );
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {t("salarystaff.cellaction.refreshSuccessBonus")}
              <span className="font-bold">{data.bonus}</span>, {t("salarystaff.cellaction.salaryDay")}:{" "}
              <span className="font-bold">{data.salaryday}</span>, {t("salarystaff.cellaction.salaryTotal")}:{" "}
              <span className="font-bold">{data.salarytotal}</span>, {t("salarystaff.cellaction.paid")}:{" "}
              <span className="font-bold">{data.isPaid}</span>, {t("salarystaff.cellaction.sent")}:{" "}
              <span className="font-bold">{data.isSent}</span>
            </p>
          );
        }),
        {
          loading: t("salarystaff.cellaction.updatingResetData"),
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
              return (error as { response: { data: { error: string } } }).response.data.error
            } else {
              return t("toastError.somethingWentWrong");
            }
          },
        }
      );
    } catch (error) {} 
      finally {
      setLoading(false);
    }
  };

    //Bỏ pointer-event:none khi không có isAISheetOpen
    useEffect(() => {
      if (!openBonus) {
        setTimeout(() => {
          document.body.style.pointerEvents = "";
        }, 500);
      }
    }, [openBonus]);

      //Bỏ pointer-event:none khi không có isAISheetOpen
  useEffect(() => {
    if (!openUnbonus) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [openUnbonus]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t("action.openMenu")}</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("action.action")}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setOpenBonus(true)}>
          <BadgeDollarSign className="h-4 w-4 mr-2" />
          {t("salarystaff.cellaction.bonus")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenUnbonus(true)}>
          <WalletCards className="h-4 w-4 mr-2" />
          {t("salarystaff.cellaction.unbonus")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPaid}>
          <HandCoins className="h-4 w-4 mr-2" />
          {t("salarystaff.cellaction.paySalary")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          {t("salarystaff.cellaction.reset")}
        </DropdownMenuItem>
      </DropdownMenuContent>

      {openBonus && (
        <div className="overlay" onClick={handleCloseModal}>
          <div className="modal z-[999] rounded-md" onClick={handleModalClick}>
            <Input
              type="text"
              value={bonusTitle}
              onChange={(e) => setbonusTitle(e.target.value)}
              placeholder={t("salarystaff.cellaction.enterTitle")}
              disabled={loading}
            />
            <Input
              type="number"
              value={bonusAmount}
              onChange={(e) => setBonusAmount(e.target.value)}
              placeholder={t("salarystaff.cellaction.enterBonus")}
              disabled={loading}
              className="mt-3"
            />
            <div className="flex justify-between px-2 mt-3">
              <Button disabled={loading} onClick={onBonus} className="dark:bg-black dark:text-white">
              {t("action.save")}
              </Button>
              <Button disabled={loading} onClick={() => setOpenBonus(false)}>
              {t("action.cancel")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {openUnbonus && (
        <div className="overlay" onClick={handleCloseModal}>
          <div className="modal z-[999] rounded-md" onClick={handleModalClick}>
            <Input
              type="text"
              value={unbonusTitle}
              onChange={(e) => setUnbonusTitle(e.target.value)}
              placeholder={t("salarystaff.cellaction.enterTitle")}
              disabled={loading}
            />
            <Input
              type="number"
              value={unbonusAmount}
              onChange={(e) => setUnbonusAmount(e.target.value)}
              placeholder={t("salarystaff.cellaction.enterUnbonus")}
              disabled={loading}
              className="mt-3"
            />
            <div className="flex justify-between px-2 mt-3">
              <Button disabled={loading} onClick={onUnbonus} className="dark:bg-black dark:text-white">
              {t("action.save")}
              </Button>
              <Button disabled={loading} onClick={() => setOpenUnbonus(false)}>
              {t("action.cancel")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DropdownMenu>
  );
};
