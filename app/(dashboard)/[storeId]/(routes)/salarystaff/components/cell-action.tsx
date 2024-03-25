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
import { useState } from "react";
import axios from "axios";
import { SalaryStaffsColumn } from "./column";
import { Input } from "@/components/ui/input";
import "./styles.css";

interface CellActionProps {
  data: SalaryStaffsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [bonusAmount, setBonusAmount] = useState<number | string>("");
  const [unbonusAmount, setUnbonusAmount] = useState<number | string>("");
  const [bonusTitle, setbonusTitle] = useState<number | string>("");
  const [unbonusTitle, setUnbonusTitle] = useState<number | string>("");

  const [loading, setLoading] = useState(false);
  const [openBonus, setOpenBonus] = useState(false);
  const [openUnbonus, setOpenUnbonus] = useState(false);
  const [open, setOpen] = useState(false);

  // Function to close modals when clicking outside
  const handleCloseModal = () => {
    setOpenBonus(false);
    setOpenUnbonus(false);
  };

  // Function to prevent closing modal when clicking inside modal content
  const handleModalClick = (e: any) => {
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
      await axios.patch(`/api/${params.storeId}/salarystaff`, {
        bonusAmount: updatedBonus,
        bonus: newBonus,
        bonusTitle: bonusTitle,
      });

      toast.success("Bonus Success!");
      router.refresh();
    } catch (error) {
      toast.error("Bonus Error!");
    } finally {
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
      // Gửi yêu cầu PATCH với giá trị thưởng đã được cập nhật
      await axios.post(`/api/${params.storeId}/salarystaff`, {
        unbonusAmount: updatedBonus,
        unbonus: newBonus,
        unbonusTitle: unbonusTitle,
      });
      toast.success("unBonus Success!");
      router.refresh();
    } catch (error) {
      toast.error("unBonus Error!");
    } finally {
      setLoading(false);
      setOpenUnbonus(false);
      setUnbonusAmount(0);
      setUnbonusTitle("")
    }
  };

  const onPaid = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/${params.storeId}/salarystaff/${data.id}`);
      router.refresh();
      toast.success("Cập nhật thành công");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this product first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onReset = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/${params.storeId}/salarystaff/${data.id}`);
      router.refresh();
      toast.success("Làm mới thành công");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this product first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setOpenBonus(true)}>
          <BadgeDollarSign className="h-4 w-4 mr-2" />
          Bonus
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenUnbonus(true)}>
          <WalletCards className="h-4 w-4 mr-2" />
          UnBonus
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPaid}>
          <HandCoins className="h-4 w-4 mr-2" />
          Trả lương
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </DropdownMenuItem>
      </DropdownMenuContent>

      {openBonus && (
        <div className="overlay" onClick={handleCloseModal}>
          <div className="modal z-[999] rounded-md" onClick={handleModalClick}>
            <Input
              type="text"
              value={bonusTitle}
              onChange={(e) => setbonusTitle(e.target.value)}
              placeholder="Enter title..."
              disabled={loading}
            />
            <Input
              type="number"
              value={bonusAmount}
              onChange={(e) => setBonusAmount(e.target.value)}
              placeholder="Enter bonus amount..."
              disabled={loading}
              className="mt-3"
            />
            <div className="flex justify-between px-2 mt-3">
              <Button disabled={loading} onClick={onBonus}>
                Save
              </Button>
              <Button disabled={loading} onClick={() => setOpenBonus(false)}>
                Cancel
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
              placeholder="Enter title..."
              disabled={loading}
            />
            <Input
              type="number"
              value={unbonusAmount}
              onChange={(e) => setUnbonusAmount(e.target.value)}
              placeholder="Enter unbonus amount..."
              disabled={loading}
              className="mt-3"
            />
            <div className="flex justify-between px-2 mt-3">
              <Button disabled={loading} onClick={onUnbonus}>
                Save
              </Button>
              <Button disabled={loading} onClick={() => setOpenUnbonus(false)}>
                Cancle
              </Button>
            </div>
          </div>
        </div>
      )}
    </DropdownMenu>
  );
};
