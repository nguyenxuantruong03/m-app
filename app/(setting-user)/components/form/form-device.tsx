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
}

const FormInfoDevice: React.FC<FormInfoDeviceProps> = ({ findDevice }) => {
  const router = useRouter();
  const [uaInfo, setUaInfo] = useState<UAInfo | null>(null);
  const [getUa, setUa] = useState("");
  const [limitDevice, setLimitDevice] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
        console.error("Error parsing browser info:", error);
        uaData.browser = { name: "unknown", version: "unknown" };
      }

      try {
        const cpuInfo = parser.getCPU();
        uaData.cpu = {
          architecture: cpuInfo.architecture || "unknown",
        };
      } catch (error) {
        console.error("Error parsing CPU info:", error);
        uaData.cpu = { architecture: "unknown" };
      }

      try {
        const engineInfo = parser.getEngine();
        uaData.engine = {
          name: engineInfo.name || "unknown",
          version: engineInfo.version || "unknown",
        };
      } catch (error) {
        console.error("Error parsing engine info:", error);
        uaData.engine = { name: "unknown", version: "unknown" };
      }

      setUaInfo(uaData);
    } catch (error) {
      console.error("Error in useEffect:", error);
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
          setSuccessMessage(
            `Bạn đã thay đổi giới hạn thành ${inputValue} thiết bị.`
          );
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
            setErrorMessage("Some thing went wrong!");
          }
        });
    } else {
      setErrorMessage("bạn chỉ có thể nhập 1 đến 5 thiết bị");
      setLoading(false);
    }
  };
  // TODO
  if (!uaInfo) return <div>Loading...</div>;

  return (
    <div>
      <Input
        type="number"
        min="1"
        max="5"
        pattern="^[1-9]$|^5$"
        placeholder="Nhập giới hạn 1-5 thiết bị..."
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
        Lưu
      </Button>
      <div className="mb-3 text-sm text-gray-400">
        Bạn đã đặt giới hạn cho{" "}
        <span
          className={
            findDevice.length === limitDevice
              ? "text-red-600 font-semibold"
              : "text-amber-500 font-semibold"
          }
        >
          {`${findDevice.length}`}
        </span>
        /<span className="text-sky-500 font-semibold">{`${limitDevice || 0}`}</span>{" "}
        thiết bị.
      </div>

      {successMessage && <FormSuccess message={successMessage} />}
      {errorMessage && <FormError message={errorMessage} />}
    </div>
  );
};

export default FormInfoDevice;
