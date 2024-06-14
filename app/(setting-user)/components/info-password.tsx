import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import SheetSecurity from "../showsheet/sheet-security";

interface InfoPasswordProp {
  user: any;
  password: any;
}

const InfoPassword: React.FC<InfoPasswordProp> = ({ user, password }) => {
  const infopasswords = [
    {
      name: "Đổi mật khẩu",
      state: password
        ? `Đã đổi mật khẩu vào ngày: ${password}`
        : "Chưa đổi mật khẩu",
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "password",
    },
    {
      name: "Xác minh 2 bước",
      state: (
        <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
          {user?.isTwoFactorEnabled ? "ON" : "OFF"}
        </Badge>
      ),
      separator: <Separator className="border-[1px] border-gray-400" />,
      key: "2FA",
    },
  ];

  const wrapWithSheet = (infouser: any, content: React.ReactNode) => {
    if (infouser.key === "password" || infouser.key === "2FA") {
      return (
        <SheetSecurity
          password={password}
          isTwoFactorEnabled={user?.isTwoFactorEnabled}
          type={infouser.key} // Pass the key as type
        >
          {content}
        </SheetSecurity>
      );
    }
    return content;
  };
  return (
    <div className="dark:bg-white bg-slate-900 rounded-md overflow-hidden my-2">
    {infopasswords.map((infopassword) => (
      <div key={infopassword.name}>
        {wrapWithSheet(infopassword, (
          <div className="cursor-pointer hover:bg-slate-300 hover:bg-opacity-40">
            <div>
              <div className="flex items-center justify-between px-4 py-2">
                <div>
                  <div className="font-semibold text-white dark:text-slate-900">
                    {infopassword.name}
                  </div>
                  <div className="text-gray-600 break-all line-clamp-2">{infopassword.state}</div>
                </div>
                <div>
                  <ChevronRight className="h-5 w-5 dark:text-slate-900 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
        {infopassword.separator}
      </div>
    ))}
    </div>
  );
};

export default InfoPassword;
