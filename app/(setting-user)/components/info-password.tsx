"use client";
import { ChevronRight, Drama, KeyRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import SheetPassword from "../showsheet/sheet-password";
import { User } from "@prisma/client";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import { useState } from "react";
import {
  translateChangePassword,
  translatePasswordChanged,
  translatePasswordNotChanged,
  translateTwoFactorVerification,
} from "@/translate/translate-client";

interface InfoPasswordProp {
  user: User;
  password: string | null;
  languageToUse: string;
}

interface InfoUser {
  key: string;
}

const InfoPassword: React.FC<InfoPasswordProp> = ({
  user,
  password,
  languageToUse,
}) => {
  const [alertGuestModal, setAlertGuestModal] = useState(false);

  //language
  const changePasswordMessage = translateChangePassword(languageToUse);
  const passwordChangedMessage = translatePasswordChanged(
    languageToUse,
    password
  );
  const passwordNotChangedMessage = translatePasswordNotChanged(languageToUse);
  const twoFactorVerificationMessage =
    translateTwoFactorVerification(languageToUse);

  const infopasswords = [
    {
      name: (
        <span className="flex items-center">
          <KeyRound className="h-4 w-4 mr-1" />
          {changePasswordMessage}
        </span>
      ),
      state: password ? passwordChangedMessage : passwordNotChangedMessage,
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "password",
    },
    {
      name: (
        <span className="flex items-center mb-2">
          <Drama className="h-4 w-4 mr-1" />
          {twoFactorVerificationMessage}
        </span>
      ),
      state: (
        <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
          {user?.isTwoFactorEnabled ? "ON" : "OFF"}
        </Badge>
      ),
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "2FA",
    },
  ];

  const wrapWithSheet = (infouser: InfoUser, content: React.ReactNode) => {
    if (infouser.key === "password" || infouser.key === "2FA") {
      return (
        <SheetPassword
          password={password}
          isTwoFactorEnabled={user?.isTwoFactorEnabled}
          type={infouser.key} // Pass the key as type
          role={user.role}
          userId={user?.id || ""}
          setAlertGuestModal={setAlertGuestModal}
          languageToUse={languageToUse}
        >
          {content}
        </SheetPassword>
      );
    }
    return content;
  };
  return (
    <>
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
        languageToUse={languageToUse}
      />
      <div className="dark:bg-white bg-slate-900 rounded-md overflow-hidden my-2">
        {infopasswords.map((infopassword) => (
          <div key={infopassword.key}>
            {wrapWithSheet(
              infopassword,
              <div className="cursor-pointer hover:bg-slate-300 hover:bg-opacity-40">
                <div>
                  <div className="flex items-center justify-between px-4 py-2">
                    <div>
                      <div className="font-semibold text-white dark:text-slate-900">
                        {infopassword.name}
                      </div>
                      <div className="text-gray-600 break-all line-clamp-2">
                        {infopassword.state}
                      </div>
                    </div>
                    <div>
                      <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {infopassword.separator}
          </div>
        ))}
      </div>
    </>
  );
};

export default InfoPassword;
