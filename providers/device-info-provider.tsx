"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import DeviceDetector from "device-detector-js";
import { appleDeviceLookup, samsungDeviceLookup } from "@/app/[locale]/(setting-user)/export-device";


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

export interface UAInfo {
  device: DeviceInfo;
  os: OSInfo;
  ua: string;
  browser?: BrowserInfo;
  cpu?: CPUInfo;
  engine?: EngineInfo;
  fullModel?: string;
}

// Define the context type
const DeviceContext = createContext<UAInfo | null>(null);

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [deviceInfo, setDeviceInfo] = useState<UAInfo | null>(null);

  //Thông tin thiêt bị
  useEffect(() => {
    try {
      const parser = new UAParser();
      const deviceDetector = new DeviceDetector();

      const userAgent = navigator.userAgent;
      const parsedDevice = deviceDetector.parse(userAgent);

      let fullModel = parsedDevice.device?.model || "unknown";

      if (parsedDevice.device?.brand === "Apple") {
        const modelCode = parsedDevice.device?.model as keyof typeof appleDeviceLookup;
        fullModel = appleDeviceLookup[modelCode] || modelCode || "unknown Apple device";
      } else if (parsedDevice.device?.brand === "Samsung") {
        const modelCode = parsedDevice.device?.model as keyof typeof samsungDeviceLookup;
        fullModel = samsungDeviceLookup[modelCode] || modelCode || "unknown Samsung device";
      } else {
        fullModel = `${parsedDevice.device?.brand} ${parsedDevice.device?.model}` || "unknown device";
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
      } else if (userAgent.includes("Macintosh") && userAgent.includes("Intel")) {
        platform = "Intel Mac OS X";
      } else if (userAgent.includes("Macintosh") && (userAgent.includes("ARM") || userAgent.includes("AppleWebKit"))) {
        platform = "ARM Mac OS X";
      }

      const uaData: UAInfo = {
        device: device,
        os: { ...osInfo, platform },
        ua: parser.getUA(),
        fullModel: fullModel,
      };

      try {
        const browserInfo = parser.getBrowser();
        uaData.browser = {
          name: browserInfo.name || "unknown",
          version: browserInfo.version || "unknown"
        };
      } catch (error) {
        console.error("Error parsing browser info:", error);
        uaData.browser = { name: "unknown", version: "unknown" };
      }

      try {
        const cpuInfo = parser.getCPU();
        uaData.cpu = {
          architecture: cpuInfo.architecture || "unknown"
        };
      } catch (error) {
        console.error("Error parsing CPU info:", error);
        uaData.cpu = { architecture: "unknown" };
      }

      try {
        const engineInfo = parser.getEngine();
        uaData.engine = {
          name: engineInfo.name || "unknown",
          version: engineInfo.version || "unknown"
        };
      } catch (error) {
        console.error("Error parsing engine info:", error);
        uaData.engine = { name: "unknown", version: "unknown" };
      }

      setDeviceInfo(uaData);
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);
  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);