"use client";
import { ChevronRight, Trash } from "lucide-react";
import SheetDevice from "../showsheet/sheet-device";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useDevice } from "@/providers/device-info-provider";
import { User } from "@prisma/client";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";

interface InfoUser {
  key: string;   
  name: string;  
}

function resolveImage(item: DeviceInfoData): string {
  // Check FullModel first
  if (item.fullModel || item.device[2]) {
    const fullModel =
      (item.fullModel ? item.fullModel.toLowerCase() : null) ||
      item.device[2].toLocaleLowerCase();
    if (
      fullModel.includes("iphone 8") ||
      fullModel.includes("iphone8") ||
      fullModel.includes("iphone7") ||
      fullModel.includes("iphone 7") ||
      fullModel.includes("iphone6") ||
      fullModel.includes("iphone6")
    ) {
      return "/device/iphone8.png";
    } else if (
      fullModel.includes("iphone 4") ||
      fullModel.includes("iphone4") ||
      fullModel.includes("iphone 5") ||
      fullModel.includes("iphone5")
    ) {
      return "/device/iphone4.png";
    } else if (
      fullModel.includes("iphone x") ||
      fullModel.includes("iphonex") ||
      fullModel.includes("iphone xs") ||
      fullModel.includes("iphonexs") ||
      fullModel.includes("iphone xr") ||
      fullModel.includes("iphonexr") ||
      fullModel.includes("iphone 11") ||
      fullModel.includes("iphone11") ||
      fullModel.includes("iphone 12") ||
      fullModel.includes("iphone12") ||
      fullModel.includes("iphone 13") ||
      fullModel.includes("iphone13") ||
      fullModel.includes("iphone 14") ||
      fullModel.includes("iphone14")
    ) {
      return "/device/iphone13.png";
    } else if (
      fullModel.includes("iphone 15") ||
      fullModel.includes("iphone15")
    ) {
      return "/device/iphone15.png";
    } else if (
      fullModel.includes("ipad air") ||
      fullModel.includes("ipadair")
    ) {
      return "/device/ipad-air.png";
    } else if (
      fullModel.includes("ipad mini") ||
      fullModel.includes("ipadmini")
    ) {
      return "/device/ipad-mini.png";
    } else if (
      fullModel.includes("ipad pro") ||
      fullModel.includes("ipadpro")
    ) {
      return "/device/ipad-pro.png";
    }
  }

  if (item.device && typeof item.device[1] === 'string') {
    const brandLower = item.device[1].toLocaleLowerCase();
  
    if (brandLower.includes("window")) {
      return "/device/window.png";
    } else if (brandLower.includes("macbook")) {
      return "/device/macbook.png";
    } else if (brandLower.includes("vivo")) {
      return "/device/logo-vivo.png";
    } else if (brandLower.includes("samsung")) {
      return "/device/logo-samsung.png";
    } else if (brandLower.includes("oppo")) {
      return "/device/logo-oppo.png";
    } else if (brandLower.includes("apple") || brandLower.includes("iphone")) {
      return "/device/logo-apple.png";
    } else if (brandLower.includes("tecno")) {
      return "/device/logo-tecno.png";
    } else if (brandLower.includes("asus")) {
      return "/device/logo-asus.png";
    } else if (brandLower.includes("blackberry")) {
      return "/device/logo-blackberry.png";
    } else if (brandLower.includes("lg")) {
      return "/device/logo-lg.png";
    } else if (brandLower.includes("sony")) {
      return "/device/logo-sony.png";
    } else if (brandLower.includes("vsmart")) {
      return "/device/logo-vsmart.png";
    } else if (brandLower.includes("motorola")) {
      return "/device/logo-motorola.png";
    } else if (brandLower.includes("realme")) {
      return "/device/logo-realme.png";
    } else if (brandLower.includes("huawei")) {
      return "/device/logo-huawei.png";
    } else if (brandLower.includes("lenovo")) {
      return "/device/logo-lenovo.png";
    }
  }

  // Check os if it's an array
  if (Array.isArray(item.os)) {
    for (const os of item.os) {
      const osLower = os.toLowerCase();
      if (osLower.includes("windows")) {
        return "/device/window.png";
      } else if (osLower.includes("macbook")) {
        return "/device/macbook.png";
      } else if (osLower.includes("vivo")) {
        return "/device/logo-vivo.png";
      } else if (osLower.includes("samsung")) {
        return "/device/logo-samsung.png";
      } else if (osLower.includes("oppo")) {
        return "/device/logo-oppo.png";
      } else if (osLower.includes("apple") || osLower.includes("iphone")) {
        return "/device/logo-apple.png";
      } else if (osLower.includes("tecno")) {
        return "/device/logo-tecno.png";
      } else if (osLower.includes("asus")) {
        return "/device/logo-asus.png";
      } else if (osLower.includes("blackberry")) {
        return "/device/logo-blackberry.png";
      } else if (osLower.includes("lg")) {
        return "/device/logo-lg.png";
      } else if (osLower.includes("sony")) {
        return "/device/logo-sony.png";
      } else if (osLower.includes("vsmart")) {
        return "/device/logo-vsmart.png";
      } else if (osLower.includes("motorola")) {
        return "/device/logo-motorola.png";
      } else if (osLower.includes("realme")) {
        return "/device/logo-realme.png";
      } else if (osLower.includes("huawei")) {
        return "/device/logo-huawei.png";
      } else if (osLower.includes("lenovo")) {
        return "/device/logo-lenovo.png";
      }
    }
  }

  // Default fallback if neither FullModel nor os match
  return "/device/404.png";
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

interface InfoDeviceProps {
  findDevice: DeviceInfoData[];
  user: User;
}

const InfoDevice: React.FC<InfoDeviceProps> = ({
  findDevice: initialFindDevice, user
}) => {
  const deviceInfo = useDevice();
  const checkCurrentDevice = (item: DeviceInfoData): boolean => {
    const currentDevice = deviceInfo?.fullModel || deviceInfo?.os || deviceInfo?.device;
    if (typeof currentDevice === 'string') {
      if (currentDevice && (item.os || item.fullModel || item.device[2] || item.device[1])) {
        const fullModel =
          (item.fullModel ? item.fullModel.toLowerCase() : null) ||
          (typeof item.device[2] === 'string' ? item.device[2].toLowerCase() : null);
        if (fullModel && fullModel.includes((currentDevice as string).toLowerCase())) { // Ép kiểu currentDevice thành string
          return true;
        }
      }
    }
    return false;
  };
  // Sắp xếp lại danh sách findDevice ở đây
  const sortedDevices = initialFindDevice.sort((a, b) => {
    const aIsCurrentDevice = checkCurrentDevice(a) ? -1 : 1;
    const bIsCurrentDevice = checkCurrentDevice(b) ? -1 : 1;
    return aIsCurrentDevice - bIsCurrentDevice;
  });

  const [alertGuestModal,setAlertGuestModal] = useState(false);
  const [findDevice, setFindDevice] = useState(sortedDevices);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/limitdevice`, { data: { id } });
      const updatedDevices = findDevice.filter((device) => device.id !== id);
      setFindDevice(updatedDevices);
      toast.success("Xóa thành công.");
      setLoading(false);
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        setLoading(false);
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        setLoading(false);
        toast.error("Không thể xóa thiết bị duy nhất.");
      }
    } finally {
      setOpen(null); // Đảm bảo đóng AlertModal sau khi xử lý xong (thành công hoặc thất bại)
    }
  };

  const infoDevices = [
    {
      name: "Thiết bị đăng nhâp",
      state: (
        <div className="text-gray-600 break-all">
          {findDevice.map((item) => (
            <>
              <AlertModal
                isOpen={open !== null}
                onClose={() => setOpen(null)}
                onConfirm={() => {
                  if (open) handleDelete(open);
                }}
                message={`Hành động của bạn sẽ xóa đi vĩnh viễn: ${
                  findDevice.find((item) => item.id === open)?.fullModel ||
                  (findDevice.find((item) => item.id === open)?.os?.join(", ") ||
                    (item.device[1] !== "unknown" && item.device[2] !== "unknown" && item.device[1])) ||
                  "Thiết bị không xác định"
                }!`}
                loading={loading}
              />

              <div
                key={item.id}
                className="flex space-x-3 items-center space-y-4"
              >
                <div>
                  <Image
                    src={resolveImage(item)}
                    alt="Device Image"
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <Button
                    className="dark:text-white text-slate-900"
                    onClick={() => setOpen(item.id)}
                    variant="outline"
                    disabled={loading}
                  >
                    <Trash className="w-5 h-5 mr-1" />
                    Delete
                  </Button>
                  <div>
                    <h2>{` Đăng nhập đầu tiên ở trình duyệt: ${item.browser[0]}`}</h2>
                  </div>
                  <div className="hidden xl:block">
                    <h2>CPU: {item.cpu}</h2>
                  </div>
                  <div>
                    <h2>
                      Device:{" "}
                      {item.device
                        .filter((device) => device !== "unknown")
                        .join(", ")}
                    </h2>
                    <p className="block xl:hidden">
                      Full Model: {item.fullModel}
                    </p>
                  </div>
                  <div>
                    <h2>OS: {item.os.join(", ")}</h2>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      ),
      key: "device",
    },
  ];

  const wrapWithSheet = (infouser: InfoUser, content: React.ReactNode) => {
    if (infouser.key === "device") {
      return (
        <SheetDevice
          findDevice={findDevice}
          type={infouser.key} // Pass the key as type
          role={user.role}
          userId= {user?.id || ""}
          setAlertGuestModal={setAlertGuestModal}
        >
          {content}
        </SheetDevice>
      );
    }
    return content;
  };

  return (
    <>
     <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
      />
      <div className="dark:bg-white bg-slate-900 rounded-md overflow-hidden my-2">
        {findDevice.length === 0
          ? infoDevices.map((infoDevice) => (
              <div key={infoDevice.name}>
                {wrapWithSheet(
                  infoDevice,
                  <div className="cursor-pointer hover:bg-slate-300 hover:bg-opacity-40">
                    <div>
                      <div className="flex items-center justify-between px-4 py-2">
                        <div>
                          <div className="font-semibold text-white dark:text-slate-900">
                            {infoDevice.name}
                          </div>
                          <div className="text-gray-600 break-all">
                            {infoDevice.state}
                          </div>
                        </div>
                        <div>
                          <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          : infoDevices.map((infoDevice) => (
              <div key={infoDevice.name}>
                <div className="flex items-center justify-between px-4 py-2">
                  <div>
                    <div className="font-semibold text-white dark:text-slate-900">
                      {infoDevice.name}
                    </div>
                    <div className="text-gray-600 break-all">
                      {infoDevice.state}
                    </div>
                  </div>
                  <div className="relative w-5/12">
                    {wrapWithSheet(
                      infoDevice,
                      <div className="w-full break-all cursor-pointer">
                        <div className="absolute right-0 xl:right-4 top-1/2 transform -translate-y-1/2">
                          <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default InfoDevice;
