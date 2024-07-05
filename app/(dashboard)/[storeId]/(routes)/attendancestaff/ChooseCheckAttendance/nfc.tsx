"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";
import {
  ArrowLeftToLine,
  Check,
  Nfc,
  SendHorizontal,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

declare class NDEFReader {
  constructor();

  scan(): Promise<void>;

  addEventListener(
    type: string,
    listener: (event: { message: any; serialNumber: string }) => void
  ): void;

  addEventListener(type: "readingerror", listener: () => void): void;

  write(message: string): Promise<void>;

  makeReadOnly(): Promise<void>;
}

interface EventProps {
  id: string;
  isCheckNFC: boolean;
  isCheckAttendanceImage: boolean;
}

interface NFCProrps {
  onClose: () => void;
  loading: boolean;
  dataEventNFC: string | undefined;
  setShowNFCModal: Dispatch<SetStateAction<boolean>>;
}

const NFC: React.FC<NFCProrps> = ({
  onClose,
  loading,
  dataEventNFC,
  setShowNFCModal,
}) => {
  const params = useParams();
  const userId = useCurrentUser();
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [showNFCInfo, setShowNFCInfo] = useState(true);
  const [serialNumber, setSerialNumber] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loadingfetch, setLoadingFetch] = useState(true);
  const [data, setALldata] = useState<EventProps[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessagecamera, setShowMessageCamera] = useState(false);
  const [NFCCodeValid, setNFCCodeValid] = useState<boolean | null>(null);

  useEffect(() => {
    const log = (message: string) => {
      setLogMessages((prevMessages) => [...prevMessages, message]);
      setShowNFCInfo(false); // Ẩn phần thông tin NFC khi có log được hiển thị
    };

    const scanButton = document.getElementById("scanButton");

    if (scanButton) {
      scanButton.addEventListener("click", async () => {
        try {
          const ndef = new NDEFReader();
          await ndef.scan();
          log("> Scan started");

          ndef.addEventListener("readingerror", () => {
            log("Argh! Cannot read data from the NFC tag. Try another one?");
          });

          ndef.addEventListener("reading", ({ message, serialNumber }: any) => {
            log(`> Serial Number: ${serialNumber}`);
            log(`> Records: (${message.records.length})`);
            setSerialNumber(serialNumber); // Cập nhật serial number mới nhất
          });
        } catch (error) {
          log("Argh! " + error);
        }
      });
    }
  }, []);

  const filteredData = data && data.filter((item) => item.id === dataEventNFC);
  const isCheckAttendanceNFC = filteredData.map((item) => item.isCheckNFC);
  const isCheckAttendanceImages = filteredData.map(
    (item) => item.isCheckAttendanceImage
  );

  const updateNFC = async () => {
    if (serialNumber) {
      if (serialNumber === userId?.codeNFC) {
        if (isCheckAttendanceNFC[0] === false) {
          setLoadingData(true);
          await axios
            .patch(`/api/${params.storeId}/checkattendance`, {
              dataEventNFC: dataEventNFC,
              serialNumber: serialNumber,
            })
            .then((response) => {
              setLoadingData(false);
              setShowNFCModal(false);
              toast.success("Quét mã thành công!");
            })
            .catch((error) => {
              setLoadingData(false);
              toast.error("Error uploading photo:", error);
            });
        } else {
          toast.error("Bạn đã checkin ngày hôm nay!");
        }
      } else {
        toast.error("NFC của bạn không đúng!");
      }
    } else {
      toast.error("Không tìm thấy mã NFC!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/${params.storeId}/checkattendance`
        );
        // Update state with the received events
        setALldata(response.data);
        setLoadingFetch(false);
      } catch (error: unknown) {
        setLoadingFetch(false);
        if (
          (error as { response?: { data?: { error?: string } } }).response &&
          (error as { response: { data?: { error?: string } } }).response
            .data &&
          (error as { response: { data: { error?: string } } }).response.data
            .error
        ) {
          // Hiển thị thông báo lỗi cho người dùng
          toast.error(
            (error as { response: { data: { error: string } } }).response.data
              .error
          );
        } else {
          // Hiển thị thông báo lỗi mặc định cho người dùng
          toast.error("Error fetching data.");
        }
      }
    };
    fetchData(); // Call the asynchronous function
  }, [params.storeId]);

  useEffect(() => {
    setShowMessage(isCheckAttendanceNFC[0]);
  }, [isCheckAttendanceNFC]);

  useEffect(() => {
    setShowMessageCamera(isCheckAttendanceImages[0]);
  }, [isCheckAttendanceImages]);

  //Check nếu như qr code đúng thì Check sai thì X
  useEffect(() => {
    if (serialNumber === userId?.codeNFC) {
      // QR code matches user's image check attendance
      setNFCCodeValid(true);
    } else {
      // QR code doesn't match user's image check attendance
      setNFCCodeValid(false);
    }
  }, [serialNumber]);

  return (
    <div>
      <Button
        disabled={loadingData || loadingfetch}
        variant="outline"
        className="mb-5"
        id="scanButton"
      >
        Bắt đầu Scan
      </Button>
      <div className="max-w-xl">
        <div
          id="log"
          className="border-zinc-500 border-2 p-3 rounded-md bg-[#292929]"
          style={{ display: logMessages.length === 0 ? "block" : "none" }} // Hiển thị phần NFCInfo khi không có log
        >
          <div
            style={{
              display:
                logMessages.length === 0 && showNFCInfo ? "block" : "none",
            }}
          >
            <span className="flex justify-center">
              <Nfc className="w-6 h-6 p-1 rounded-full text-black bg-white mr-1" />{" "}
              Đầu đọc thẻ NFC
            </span>

            <div className="flex justify-center">
              <Image
                alt=""
                width={300}
                height={300}
                src="/images/NFC.gif"
                className="w-96 h-96"
              />
            </div>
            <span className="flex justify-center text-[#7c7c7ced]">
              Giữ gần thẻ
            </span>
          </div>
        </div>
        <div
          className="border-zinc-500 border-2 p-3 rounded-md bg-[#292929]"
          style={{ display: logMessages.length === 0 ? "none" : "block" }}
        >
          {logMessages.map((message, index) => (
            <p className="dark:text-white text-black" key={index}>
              {message}
            </p>
          ))}
        </div>
      </div>

      {showMessage && (
        // Sử dụng showMessage để kiểm soát việc hiển thị thông báo
        <p className="mt-5 mx-auto border-yellow-400 border-2 flex items-center p-3">
          <TriangleAlert className="w-4 h-4 text-yellow-400 mr-3" /> Ngày hôm
          nay bạn đã checkin. Hãy quay lại ngày sau!
        </p>
      )}

      {showMessagecamera && (
        // Sử dụng showMessage để kiểm soát việc hiển thị thông báo
        <p className="mt-5 mx-auto border-yellow-400 border-2 flex items-center p-3">
          <TriangleAlert className="w-4 h-4 text-yellow-400 mr-3" /> Bạn đã
          checkin bằng QrCode!
        </p>
      )}

      {serialNumber && ( // Check if serialNumber exists
        <p
          className={`mt-5 mx-auto z-10 border-${
            NFCCodeValid ? "green" : "red"
          }-500 border-2 p-3 flex items-center`}
        >
          {NFCCodeValid ? (
            <>
              <Check className="w-4 h-4 text-green-400 mr-3" />
              NFC của bạn đã đúng.
            </>
          ) : (
            <>
              <X className="w-4 h-4 text-red-500 mr-3" />
              NFC của bạn không đúng.
            </>
          )}
        </p>
      )}
      <div className="flex mt-5 justify-between">
        <Button
          disabled={loading || loadingData}
          variant="outline"
          onClick={onClose}
        >
          <ArrowLeftToLine className="w-5 h-5 mr-1" /> <span>Thoát </span>
        </Button>

        <Button
          disabled={loadingfetch || loadingData}
          variant="outline"
          onClick={updateNFC}
        >
          <SendHorizontal className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default NFC;
