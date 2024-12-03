"use client";
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
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  translateAccompaniedWithUsToday,
  translateAccountManagement,
  translateAccountSettings,
  translateHappyBirthday,
  translateInfo,
  translatePasswordAndSecurity,
  translatePersonalInfo,
  translateSecurity,
  translateSpecialBirthdayMessage,
} from "@/translate/translate-client";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

interface NavbarProfileProps {
  dateofbirth: Date | null;
  name: string | null | undefined;
}

const NavbarProfile: React.FC<NavbarProfileProps> = ({ dateofbirth, name }) => {
  const user = useCurrentUser();
  const pathname = usePathname();

  const [showBirthdayMessage, setShowBirthdayMessage] = useState(true);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const personalInfoMessage = translatePersonalInfo(languageToUse);
  const infoMessage = translateInfo(languageToUse);
  const passwordAndSecurityMessage =
    translatePasswordAndSecurity(languageToUse);
  const securityMessage = translateSecurity(languageToUse);
  const accountSettingMessage = translateAccountSettings(languageToUse);
  const accountManagementMessage = translateAccountManagement(languageToUse);
  const happyBirthdayMessage = translateHappyBirthday(languageToUse);
  const accompaniedWithUsTodayMessage =
    translateAccompaniedWithUsToday(languageToUse);
  const specialBirthdayMessage = translateSpecialBirthdayMessage(languageToUse);

  const mainnavs = [
    {
      name: personalInfoMessage,
      nameMobile: infoMessage,
      href: `/setting-profile`,
      icon: User,
    },
    {
      name: passwordAndSecurityMessage,
      nameMobile: securityMessage,
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
          duration={23 * 1000}
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
          <Link href="/home-product">
            <div className="hidden xl:block">
              <Image
                alt=""
                src="/images/logo-custom.png"
                width="140"
                height="30"
                className="rounded-sm hover:opacity-75 transition"
              />
            </div>
            <div className="block xl:hidden">
              <Image
                alt=""
                src="/images/logo-mini.png"
                width="45"
                height="30"
                className="rounded-sm bg-[#c3c3c3] py-1.5 px-2.5 hover:opacity-75 transition"
              />
            </div>
          </Link>
          <Link href="/home-product" className="cursor-pointer">
            <div className="fixed right-4 top-4 xl:right-12 xl:top-8 rounded-full p-2 bg-slate-300 bg-opacity-30 shadow-lg hover:bg-slate-500">
              <X className="h-6 w-6 font-bold dark:text-slate-900 text-white" />
            </div>
          </Link>
          <div className="font-semibold text-lg md:text-2xl my-3">
            {accountSettingMessage}
          </div>
          <div className="text-sm text-gray-500">
            {accountManagementMessage}
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
                  <span className="hidden md:block">{mainnav.name}</span>
                  <span className="block md:hidden">{mainnav.nameMobile}</span>
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
              {happyBirthdayMessage}
              <span className="inline-block font-bold ml-1">
                <ColorfulText text={name} />
              </span>{" "}
              {accompaniedWithUsTodayMessage}
              <span className="inline-block font-bold ml-1">
                <ColorfulText text={birthday} />
              </span>{" "}
              {specialBirthdayMessage}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default NavbarProfile;

const colors = [
  "text-red-500",
  "text-yellow-500",
  "text-green-500",
  "text-blue-500",
  "text-purple-500",
  "text-orange-500",
  "text-amber-500",
  "text-lime-500",
  "text-teal-500",
  "text-cyan-500",
  "text-sky-500",
  "text-indigo-500",
  "text-fuchsia-500",
  "text-violet-500",
  "text-emerald-500",
  "text-pink-500",
  "text-purple-500",
];

// Hàm để lấy màu sắc, đảm bảo không trùng màu trước đó
const getColor = (index: number, prevColor: string): string => {
  let newColor = colors[index % colors.length];
  while (newColor === prevColor) {
    index++;
    newColor = colors[index % colors.length];
  }
  return newColor;
};

interface ColorfulTextProps {
  text: string | null | undefined;
}

const ColorfulText: React.FC<ColorfulTextProps> = ({ text }) => {
  let prevColor = "";
  return (
    <>
      {text ? (
        <span>
          {text.split("").map((char, index) => {
            const color = getColor(index, prevColor);
            prevColor = color;
            return (
              <span key={index} className={color}>
                {char}
              </span>
            );
          })}
        </span>
      ) : (
        ""
      )}
    </>
  );
};
