"use client";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import DeviceDetector from "device-detector-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Assuming there's a Button component
import axios from "axios";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { useRouter } from "next/navigation";
import { appleDeviceLookup, samsungDeviceLookup } from "../../export-device";
import {
  getToastError,
  translateDevice,
  translateDeviceLimitChanged,
  translateDeviceLimitError,
  translateDeviceLimitInputPrompt,
  translateDeviceLimitSet,
  translateLoading,
  translateSave,
} from "@/translate/translate-client";
import toast from "react-hot-toast";

interface DeviceInfo {
  type: string;
  brand: string;
  model: string;
  fullModel: string;
}

interface OSInfo {
  platform: string;
  name?: string;
  version?: string;
}

interface BrowserInfo {
  name: string;
  version: string;
}

interface CPUInfo {
  architecture: string;
}

interface EngineInfo {
  name: string;
  version: string;
}

interface UAInfo {
  device: DeviceInfo;
  os: OSInfo;
  ua: string;
  browser?: BrowserInfo;
  cpu?: CPUInfo;
  engine?: EngineInfo;
  fullModel?: string;
}

interface DeviceInfoData {
  id: string;
  userId: string;
  browser: string[];
  cpu: string[];
  device: string[];
  engine: string[];
  os: string[];
  fullModel: string | null;
  ua: string | null;
  limitDevice: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface FormInfoDeviceProps {
  findDevice: DeviceInfoData[];
  languageToUse: string;
}

const FormInfoDevice: React.FC<FormInfoDeviceProps> = ({
  findDevice,
  languageToUse,
}) => {
  const router = useRouter();
  const [uaInfo, setUaInfo] = useState<UAInfo | null>(null);
  const [getUa, setUa] = useState("");
  const [limitDevice, setLimitDevice] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  //language
  const toastErrorMessage = getToastError(languageToUse);
  const deviceLimitChangedMessage = translateDeviceLimitChanged(
    languageToUse,
    inputValue
  );
  const deviceLimitErrorMessgae = translateDeviceLimitError(languageToUse);
  const saveMessage = translateSave(languageToUse);
  const deviceLimitInputPromptMessage =
    translateDeviceLimitInputPrompt(languageToUse);
  const deviceLimitSetMessage = translateDeviceLimitSet(languageToUse);
  const deviceMessage = translateDevice(languageToUse);
  const loadingMessage = translateLoading(languageToUse);

  //Thông tin thiêt bị
  useEffect(() => {
    try {
      const parser = new UAParser();
      const deviceDetector = new DeviceDetector();

      const userAgent = navigator.userAgent;
      const parsedDevice = deviceDetector.parse(userAgent);

      let fullModel = parsedDevice.device?.model || "unknown";

      if (parsedDevice.device?.brand === "Apple") {
        const modelCode = parsedDevice.device
          ?.model as keyof typeof appleDeviceLookup;
        fullModel =
          appleDeviceLookup[modelCode] || modelCode || "unknown Apple device";
      } else if (parsedDevice.device?.brand === "Samsung") {
        const modelCode = parsedDevice.device
          ?.model as keyof typeof samsungDeviceLookup;
        fullModel =
          samsungDeviceLookup[modelCode] ||
          modelCode ||
          "unknown Samsung device";
      } else {
        fullModel =
          `${parsedDevice.device?.brand} ${parsedDevice.device?.model}` ||
          "unknown device";
      }

      const device: DeviceInfo = {
        type: parsedDevice.device?.type || "unknown",
        brand: parsedDevice.device?.brand || "unknown",
        model: parsedDevice.device?.model || "unknown",
        fullModel: fullModel,
      };

      const osInfo = parser.getOS();

      let platform = "unknown";
      if (userAgent.includes("Win64")) {
        platform = "x64";
      } else if (
        userAgent.includes("Macintosh") &&
        userAgent.includes("Intel")
      ) {
        platform = "Intel Mac OS X";
      } else if (
        userAgent.includes("Macintosh") &&
        (userAgent.includes("ARM") || userAgent.includes("AppleWebKit"))
      ) {
        platform = "ARM Mac OS X";
      }

      const uaData: UAInfo = {
        device: device,
        os: { ...osInfo, platform },
        ua: parser.getUA(),
        fullModel: fullModel,
      };
      setUa(uaData.ua);

      try {
        const browserInfo = parser.getBrowser();
        uaData.browser = {
          name: browserInfo.name || "unknown",
          version: browserInfo.version || "unknown",
        };
      } catch (error) {
        toast.error(toastErrorMessage);
        uaData.browser = { name: "unknown", version: "unknown" };
      }

      try {
        const cpuInfo = parser.getCPU();
        uaData.cpu = {
          architecture: cpuInfo.architecture || "unknown",
        };
      } catch (error) {
        toast.error(toastErrorMessage);
        uaData.cpu = { architecture: "unknown" };
      }

      try {
        const engineInfo = parser.getEngine();
        uaData.engine = {
          name: engineInfo.name || "unknown",
          version: engineInfo.version || "unknown",
        };
      } catch (error) {
        toast.error(toastErrorMessage);
        uaData.engine = { name: "unknown", version: "unknown" };
      }

      setUaInfo(uaData);
    } catch (error) {
      toast.error(toastErrorMessage);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    // Kiểm tra nếu findDevice tồn tại và không rỗng
    if (findDevice && findDevice.length > 0) {
      // Duyệt qua mỗi thiết bị trong findDevice
      findDevice.forEach((device) => {
        // Kiểm tra nếu ua của thiết bị trùng với getUa
        setLoading(false);
        // Nếu trùng, gán giá trị limitDevice từ thiết bị tương ứng
        setLimitDevice(device.limitDevice);
      });
    }
  }, [findDevice, getUa]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    setInputValue(value);
  };

  const handleButtonClick = () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (inputValue !== null && inputValue >= 1 && inputValue <= 5) {
      // Gửi giá trị đến API khi giá trị thay đổi
      axios
        .patch("/api/limitdevice", { limitDevice: inputValue, ua: getUa })
        .then((response) => {
          setLoading(false);
          router.refresh();
          setSuccessMessage(deviceLimitChangedMessage);
        })
        .catch((error) => {
          if (
            (error as { response?: { data?: { error?: string } } }).response &&
            (error as { response: { data?: { error?: string } } }).response
              .data &&
            (error as { response: { data: { error?: string } } }).response.data
              .error
          ) {
            // Hiển thị thông báo lỗi cho người dùng
            setLoading(false);
            setErrorMessage(
              (error as { response: { data: { error: string } } }).response.data
                .error
            );
          } else {
            setLoading(false);
            setErrorMessage(toastErrorMessage);
          }
        });
    } else {
      setErrorMessage(deviceLimitErrorMessgae);
      setLoading(false);
    }
  };
  // TODO
  if (!uaInfo) return <div>{loadingMessage}</div>;

  return (
    <div>
      <Input
        type="number"
        min="1"
        max="5"
        pattern="^[1-9]$|^5$"
        placeholder={deviceLimitInputPromptMessage}
        onChange={handleInputChange}
        disabled={loading}
        value={
          inputValue !== null
            ? inputValue
            : limitDevice !== null
            ? limitDevice
            : ""
        }
      />
      <Button className="my-3" disabled={loading} onClick={handleButtonClick}>
        {saveMessage}
      </Button>
      <div className="mb-3 text-sm text-gray-400">
        {deviceLimitSetMessage}
        <span
          className={
            findDevice.length === limitDevice
              ? "text-red-600 font-semibold"
              : "text-amber-500 font-semibold"
          }
        >
          {`${findDevice.length}`}
        </span>
        /
        <span className="text-sky-500 font-semibold">{`${
          limitDevice || 0
        }`}</span>{" "}
        {deviceMessage}.
      </div>

      {successMessage && <FormSuccess message={successMessage} />}
      {errorMessage && <FormError message={errorMessage} />}
    </div>
  );
};

export default FormInfoDevice;
