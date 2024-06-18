"use client"
import { useEffect, useState } from "react";
import { utcToZonedTime } from "date-fns-tz";
import { format, subHours } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { User, Shield, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import FireworksComponent from "@/components/canvas-confetti";
import viLocale from "date-fns/locale/vi";
import "./style.css";

const vietnamTimeZone = "Asia/Ho_Chi_Minh";

interface NavbarProfileProps {
  dateofbirth: Date | null;
  name: string | null | undefined;
}

const NavbarProfile: React.FC<NavbarProfileProps> = ({ dateofbirth, name }) => {
  const pathname = usePathname();

  const [showBirthdayMessage, setShowBirthdayMessage] = useState(true);

  const mainnavs = [
    {
      name: "Thông tin cá nhân",
      href: `/setting-profile`,
      icon: User,
    },
    {
      name: "Mật khẩu và bảo mật",
      href: `/password-security`,
      icon: Shield,
    },
  ];

  const birthdayDate = dateofbirth
    ? utcToZonedTime(subHours(new Date(dateofbirth), 7), vietnamTimeZone)
    : null;

  const today = new Date();
  const isBirthdayToday =
    birthdayDate &&
    birthdayDate.getDate() === today.getDate() &&
    birthdayDate.getMonth() === today.getMonth();

  const BirthdayFireworks: React.FC<{ isBirthdayToday: boolean }> = ({
    isBirthdayToday,
  }) => {
    if (isBirthdayToday) {
      return (
        <FireworksComponent
          width="100%"
          height="100%"
          left="0"
          bottom="10"
          position="fixed"
          particleCount={5}
          colors={["#dc2626", "#facc15", "#22c55e", "#3b82f6", "#9333ea"]}
          zindex={-1}
          duration= {23 * 1000}
        />
      );
    } else {
      return null;
    }
  };

  let birthday = birthdayDate
    ? format(birthdayDate, "E '-' dd/MM/yyyy", {
        locale: viLocale,
      })
    : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBirthdayMessage(false);
    }, 25000); // Hide message after 20 seconds

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  return (
    <>
      <div className="relative w-1/2 md:w-[45%]">
        <div className="pr-4 lg:pr-12 my-8">
          <Link href="/" className="cursor-pointer flex">
            <Image
              className="h-8 w-auto sm:h-12 mb-5"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="404"
              width="50"
              height="50"
            />
          </Link>
          <Link href="/" className="cursor-pointer">
            <div className="fixed right-4 top-4 xl:right-12 xl:top-8 rounded-full p-2 bg-slate-300 bg-opacity-30 shadow-lg hover:bg-slate-500">
              <X className="h-6 w-6 font-bold dark:text-slate-900 text-white" />
            </div>
          </Link>
          <div className="font-semibold text-lg md:text-2xl my-3">
            Cài đặt tài khoản
          </div>
          <div className="text-sm text-gray-500">
            Quản lý tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật,
            quản lý thông báo, v.v.
          </div>

          {mainnavs.map((mainnav) => {
            const isActive = pathname === mainnav.href;
            const Icon = mainnav.icon;
            return (
              <Link
                key={mainnav.href}
                href={mainnav.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 my-4 p-3 rounded-md overflow-hidden",
                  isActive
                    ? "dark:text-slate-800 text-white dark:bg-white bg-slate-800 shadow-md"
                    : "text-slate-800 dark:text-white"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    fill={isActive ? "rgb(0 0 0)" : "rgb(255 255 255)"}
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "dark:text-slate-800 text-white"
                        : "text-slate-800 dark:text-white"
                    )}
                  />
                  <span>{mainnav.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <Separator
          orientation="vertical"
          className="absolute top-0 bottom-0 right-0 h-screen"
        />
        <Separator
          orientation="vertical"
          className="absolute top-0 bottom-0 right-0 h-full"
        />
      </div>

      {showBirthdayMessage && isBirthdayToday && (
        <>
          <BirthdayFireworks isBirthdayToday={isBirthdayToday} />
          <div className="container left-0 xl:left-12 2xl:left-auto">
            <p className="container-text-auto-right">
              Chức mừng sinh nhật{" "}
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold">
                {name}
              </span>{" "}
              đã dồng hành cùng chúng tôi. Ngày{" "}
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold">
                {birthday}
              </span>{" "}
              là ngày đặc biệt dành cho bạn. Chúc bạn ngày sinh nhật vui vẻ! 🎉🎉🎉
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default NavbarProfile;
