"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, BadgeDollarSign, WalletCards } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { WheelSpinColumn } from "./column";
import { Input } from "@/components/ui/input";
import "./styles.css";
import { getwheelSpinAction } from "@/translate/translate-dashboard";

interface CellActionProps {
  data: WheelSpinColumn;
}

interface WheelSpin {
  userId: string;
}

interface User {
  id: string;
  WheelSpin: WheelSpin[]; // Mảng các đối tượng WheelSpin
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [bonusAmount, setBonusAmount] = useState<number | string>("");
  const [coinAmount, setCoinAmount] = useState<number | string>("");
  const [unbonusAmount, setUnbonusAmount] = useState<number | string>("");
  const [unCoinAmount, setUnCoinAmount] = useState<number | string>("");
  const [bonusTitle, setbonusTitle] = useState<number | string>("");
  const [unbonusTitle, setUnbonusTitle] = useState<number | string>("");

  const [loading, setLoading] = useState(false);
  const [openBonus, setOpenBonus] = useState(false);
  const [openUnbonus, setOpenUnbonus] = useState(false);

  //language
  const wheelSpinActionMessage = getwheelSpinAction(data.language);

  // Hàm để kiểm tra xem tất cả ba input có giá trị không
  const areAllInputsFilledbonus = () => {
    // Kiểm tra xem tất cả ba input đều là chuỗi và có giá trị không rỗng
    if (
      typeof bonusAmount === "string" &&
      typeof coinAmount === "string" &&
      typeof bonusTitle === "string"
    ) {
      return (
        bonusAmount.trim() !== "" &&
        coinAmount.trim() !== "" &&
        bonusTitle.trim() !== ""
      );
    }
    return false;
  };

  // Hàm để kiểm tra xem tất cả ba input có giá trị không
  const areAllInputsFilledUnbonus = () => {
    // Kiểm tra xem tất cả ba input đều là chuỗi và có giá trị không rỗng
    if (
      typeof unbonusTitle === "string" &&
      typeof unbonusAmount === "string" &&
      typeof unCoinAmount === "string"
    ) {
      return (
        unbonusTitle.trim() !== "" &&
        unbonusAmount.trim() !== "" &&
        unCoinAmount.trim() !== ""
      );
    }
    return false;
  };

  // Function to close modals when clicking outside
  const handleCloseModal = () => {
    setOpenBonus(false);
    setOpenUnbonus(false);
  };

  // Function to prevent closing modal when clicking inside modal content
  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const onBonus = async () => {
    try {
      setLoading(true);
      // Bước1: Truy xuất giá trị thưởng hiện tại từ cơ sở dữ liệu
      const response = await axios.get(
        `/api/${params.storeId}/wheelSpin/bonuswheelSpin`
      );
      const wheelSpinResponseData = response.data; // Assuming response.data is an array
      //Bước2: Lọc data kiếm userId === với người dùng khi tôi click vào
      const filteredWheelSpinData = wheelSpinResponseData.filter(
        (item: User) => item.id === data.id
      );
      //Bước3: Kế tiếp nếu như đã có userId thì tìm wheelSpin của user đó
      const allWheelSpinIdsForUser = filteredWheelSpinData.flatMap(
        (user: User) =>
          user.WheelSpin.filter(
            (wheelSpin: WheelSpin) => wheelSpin.userId === data.id
          )
      );
      //Bước 4 Check rotation vs coin và thực hiện patch và tổng doanh thu
      // Check if there is at least one element in the array
      const currentBonus = allWheelSpinIdsForUser[0]?.rotation || null;
      // Lấy giá trị thưởng mới từ state
      const newBonus = Number(bonusAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedBonus = currentBonus + newBonus;
      const currentBonusCoin = allWheelSpinIdsForUser[0]?.coin || null;
      // Gửi yêu cầu PATCH với giá trị thưởng đã được cập nhật
      const newCoins = Number(coinAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedCoin = currentBonusCoin + newCoins;
      // Gửi yêu cầu PATCH với giá trị thưởng đã được cập nhật
      const promise = axios.patch(
        `/api/${params.storeId}/wheelSpin/bonuswheelSpin`,
        {
          bonusAmount: updatedBonus,
          coinAmount: updatedCoin,
          coinbonus: newCoins,
          bonus: newBonus,
          bonusTitle: bonusTitle,
          data: data.id,
        }
      );
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {" "}
              {wheelSpinActionMessage.content}{" "}
              <span className="font-bold">{bonusTitle}</span>.
              {wheelSpinActionMessage.addedBonus}{" "}
              <span className="font-bold">
                +{newBonus}
                {wheelSpinActionMessage.rotation}
              </span>{" "}
              {wheelSpinActionMessage.and}{" "}
              <span className="font-bold">
                +{newCoins}
                {wheelSpinActionMessage.coin}
              </span>
              . {wheelSpinActionMessage.total}{" "}
              <span className="font-bold pr-1">
                {updatedBonus}
                {wheelSpinActionMessage.rotation}
              </span>
              {wheelSpinActionMessage.and}
              <span className="font-bold pl-1">
                {updatedCoin}
                {wheelSpinActionMessage.coin}
              </span>
              .
            </p>
          );
        }),
        {
          loading: wheelSpinActionMessage.updatingBonus,
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return wheelSpinActionMessage.somethingWentWrong;
            }
          },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
      setOpenBonus(false);
      setBonusAmount(0);
      setCoinAmount(0);
      setbonusTitle("");
    }
  };

  const onUnbonus = async () => {
    try {
      setLoading(true);
      // Bước1: Truy xuất giá trị thưởng hiện tại từ cơ sở dữ liệu
      const response = await axios.get(
        `/api/${params.storeId}/wheelSpin/bonuswheelSpin`
      );
      const wheelSpinResponseData = response.data; // Assuming response.data is an array
      //Bước2: Lọc data kiếm userId === với người dùng khi tôi click vào
      const filteredWheelSpinData = wheelSpinResponseData.filter(
        (item: User) => item.id === data.id
      );
      //Bước3: Kế tiếp nếu như đã có userId thì tìm wheelSpin của user đó
      const allWheelSpinIdsForUser = filteredWheelSpinData.flatMap(
        (user: User) =>
          user.WheelSpin.filter(
            (wheelSpin: WheelSpin) => wheelSpin.userId === data.id
          )
      );
      //Bước 4 Check rotation vs coin và thực hiện patch và tổng doanh thu
      const currentBonus = allWheelSpinIdsForUser[0]?.rotation || null;
      // Lấy giá trị thưởng mới từ state
      const newBonus = Number(unbonusAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedBonus = currentBonus - newBonus;

      const currentBonusCoin = allWheelSpinIdsForUser[0]?.coin || null;
      // Lấy giá trị thưởng mới từ state
      const newCoin = Number(unCoinAmount);
      // Tính toán tổng số tiền thưởng mới
      const updatedCoin = currentBonusCoin - newCoin;
      const promise = axios.post(
        `/api/${params.storeId}/wheelSpin/bonuswheelSpin`,
        {
          unbonusAmount: updatedBonus,
          unbonusCoinsupdated: updatedCoin,
          unbonuscoinnew: newCoin,
          unbonus: newBonus,
          unbonusTitle: unbonusTitle,
          data: data.id,
        }
      );

      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {" "}
              {wheelSpinActionMessage.content}{" "}
              <span className="font-bold">{unbonusTitle}</span>.{" "}
              {wheelSpinActionMessage.deducted}{" "}
              <span className="font-bold">
                {newBonus}
                {wheelSpinActionMessage.rotation}
              </span>{" "}
              {wheelSpinActionMessage.and}{" "}
              <span className="font-bold">
                {newCoin}
                {wheelSpinActionMessage.coin}
              </span>
              . {wheelSpinActionMessage.total}
              <span className="font-bold pr-1">
                {updatedBonus}
                {wheelSpinActionMessage.rotation}
              </span>{" "}
              {wheelSpinActionMessage.and}{" "}
              <span className="font-bold pl-1">
                {updatedCoin}
                {wheelSpinActionMessage.coin}
              </span>
              .
            </p>
          );
        }),
        {
          loading: wheelSpinActionMessage.updatingUnbonus,
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return wheelSpinActionMessage.somethingWentWrong;
            }
          },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
      setOpenUnbonus(false);
      setUnbonusAmount(0);
      setUnCoinAmount(0);
      setUnbonusTitle("");
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

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("textInput");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{wheelSpinActionMessage.openMenu}</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{wheelSpinActionMessage.actions}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setOpenBonus(true)}>
          <BadgeDollarSign className="h-4 w-4 mr-2" />
          {wheelSpinActionMessage.bonus}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenUnbonus(true)}>
          <WalletCards className="h-4 w-4 mr-2" />
          {wheelSpinActionMessage.unbonus}
        </DropdownMenuItem>
      </DropdownMenuContent>

      {openBonus && (
        <div className="overlay" onClick={handleCloseModal}>
          <div className="modal z-[999] rounded-md" onClick={handleModalClick}>
            <Input
              id="textInput"
              type="text"
              value={bonusTitle}
              onChange={(e) => setbonusTitle(e.target.value)}
              placeholder={wheelSpinActionMessage.enterTitle}
              disabled={loading}
            />
            <Input
              type="number"
              value={bonusAmount}
              onChange={(e) => setBonusAmount(e.target.value)}
              placeholder={wheelSpinActionMessage.enterBonusRotation}
              disabled={loading}
              className="mt-3"
            />
            <Input
              type="number"
              value={coinAmount}
              onChange={(e) => setCoinAmount(e.target.value)}
              placeholder={wheelSpinActionMessage.enterCoin}
              disabled={loading}
              className="mt-3"
            />
            <div className="flex justify-between px-2 mt-3">
              <Button
                disabled={loading || !areAllInputsFilledbonus()}
                onClick={onBonus}
                className="dark:bg-black dark:text-white"
              >
                {wheelSpinActionMessage.save}
              </Button>
              <Button
                disabled={loading}
                onClick={() => setOpenBonus(false)}
                className="dark:bg-black dark:text-white"
              >
                {wheelSpinActionMessage.cancel}
              </Button>
            </div>
          </div>
        </div>
      )}

      {openUnbonus && (
        <div className="overlay" onClick={handleCloseModal}>
          <div className="modal z-[999] rounded-md" onClick={handleModalClick}>
            <Input
              id="textInput"
              type="text"
              value={unbonusTitle}
              onChange={(e) => setUnbonusTitle(e.target.value)}
              placeholder={wheelSpinActionMessage.enterTitle}
              disabled={loading}
            />
            <Input
              type="number"
              value={unbonusAmount}
              onChange={(e) => setUnbonusAmount(e.target.value)}
              placeholder={wheelSpinActionMessage.enterUnbonusRotation}
              disabled={loading}
              className="mt-3"
            />
            <Input
              type="number"
              value={unCoinAmount}
              onChange={(e) => setUnCoinAmount(e.target.value)}
              placeholder={wheelSpinActionMessage.enterUncoin}
              disabled={loading}
              className="mt-3"
            />
            <div className="flex justify-between px-2 mt-3">
              <Button
                disabled={loading || !areAllInputsFilledUnbonus()}
                onClick={onUnbonus}
                className="dark:bg-black dark:text-white"
              >
                {wheelSpinActionMessage.save}
              </Button>
              <Button
                disabled={loading}
                onClick={() => setOpenUnbonus(false)}
                className="dark:bg-black dark:text-white"
              >
                {wheelSpinActionMessage.cancel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DropdownMenu>
  );
};
