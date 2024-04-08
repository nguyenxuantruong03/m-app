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
  WalletCards,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { WheelSpinColumn } from "./column";
import { Input } from "@/components/ui/input";
import "./styles.css";

interface CellActionProps {
  data: WheelSpinColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [bonusAmount, setBonusAmount] = useState<number | string>("");
  const [coinAmount, setCoinAmount] = useState<number | string>("");
  const [unbonusAmount, setUnbonusAmount] = useState<number | string>("");
  const [unCoinAmount, setunCoinAmount] = useState<number | string>("");
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
        `/api/${params.storeId}/wheelSpin/${data.id}`
      );
      const wheelSpinData = response.data; // Assuming response.data is an array
      // Check if there is at least one element in the array
        const currentBonus = wheelSpinData[0].rotation;
      // Lấy giá trị thưởng mới từ state
      const newBonus = Number(bonusAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedBonus = currentBonus + newBonus;
      const currentBonusCoin = wheelSpinData[0].coin;
      // Gửi yêu cầu PATCH với giá trị thưởng đã được cập nhật
      const newCoins = Number(coinAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedCoin = currentBonusCoin + newCoins;
      // Gửi yêu cầu PATCH với giá trị thưởng đã được cập nhật
      const promise = axios.patch(`/api/${params.storeId}/wheelSpin/${data.id}`, {
        bonusAmount: updatedBonus,
        coinAmount: updatedCoin,
        coinbonus: newCoins,
        bonus: newBonus,
        bonusTitle: bonusTitle,
      });
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {" "}
              Đã thêm <span className="font-bold">{bonusTitle}</span>.Đã cộng thêm {" "}
              <span className="font-bold">+{newBonus}vòng quay</span> và <span className="font-bold">+{newCoins}xu</span>.
              Tổng{" "}
              <span className="font-bold pr-1">
                {updatedBonus}vòng quay
              </span>
              và
              <span className="font-bold pl-1">
                {updatedCoin}xu
              </span>.
            </p>
          );
        }),
        {
          loading: "Updating bonus...",
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
              return "Bonus Error.";
            }
          },
        }
      );
    } catch (error) {} 
      finally {
      setLoading(false);
      setOpenBonus(false);
      setBonusAmount(0);
      setCoinAmount(0)
      setbonusTitle("");
    }
  };

  const onUnbonus = async () => {
    try {
      setLoading(true);
      // Truy xuất giá trị thưởng hiện tại từ cơ sở dữ liệu
      const response = await axios.get(
        `/api/${params.storeId}/wheelSpin/${data.id}`
      ); const wheelSpinData = response.data;
      const currentBonus = wheelSpinData[0].rotation;
      // Lấy giá trị thưởng mới từ state
      const newBonus = Number(unbonusAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedBonus = currentBonus - newBonus;

      const currentBonusCoin = wheelSpinData[0].coin;
       // Lấy giá trị thưởng mới từ state
      const newCoin = Number(unCoinAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedCoin = currentBonusCoin - newCoin;
      const promise = axios.post(`/api/${params.storeId}/wheelSpin/${data.id}`, {
        unbonusAmount: updatedBonus,
        unbonusCoinsupdated: updatedCoin,
        unbonuscoinnew: newCoin,
        unbonus: newBonus,
        unbonusTitle: unbonusTitle,
      });

      await toast.promise(
        promise.then(() => {
          return (
            <p>
            {" "}
            Đã thêm <span className="font-bold">{unbonusTitle}</span>. Đã bị trừ {" "}
            <span className="font-bold">{newBonus}vòng quay</span> và <span className="font-bold">{newCoin}xu</span>.
            Tổng{" "}
            <span className="font-bold pr-1">
              {updatedBonus}vòng quay
            </span>{" "}
            và{" "}
            <span className="font-bold pl-1">
              {updatedCoin}xu
            </span>.
          </p>
          );
        }),
        {
          loading: "Updating unbonus...",
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
              return "UnBonus Error.";
            }
          },
        }
      );
    }catch (error) {} 
     finally {
      setLoading(false);
      setOpenUnbonus(false);
      setUnbonusAmount(0);
      setunCoinAmount(0)
      setUnbonusTitle("");
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
              placeholder="Enter bonus rotation..."
              disabled={loading}
              className="mt-3"
            />
            <Input
              type="number"
              value={coinAmount}
              onChange={(e) => setCoinAmount(e.target.value)}
              placeholder="Enter coin..."
              disabled={loading}
              className="mt-3"
            />
            <div className="flex justify-between px-2 mt-3">
              <Button disabled={loading} onClick={onBonus} className="dark:bg-black dark:text-white">
                Save
              </Button>
              <Button disabled={loading} onClick={() => setOpenBonus(false)} className="dark:bg-black dark:text-white">
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
              placeholder="Enter unbonus rotation..."
              disabled={loading}
              className="mt-3"
            />
            <Input
              type="number"
              value={unCoinAmount}
              onChange={(e) => setunCoinAmount(e.target.value)}
              placeholder="Enter uncoin..."
              disabled={loading}
              className="mt-3"
            />
            <div className="flex justify-between px-2 mt-3">
              <Button disabled={loading} onClick={onUnbonus} className="dark:bg-black dark:text-white">
                Save
              </Button>
              <Button disabled={loading} onClick={() => setOpenUnbonus(false)} className="dark:bg-black dark:text-white">
                Cancle
              </Button>
            </div>
          </div>
        </div>
      )}
    </DropdownMenu>
  );
};
