import prismadb from "@/lib/prismadb";
import InfoPassword from "../components/info-password";
import { currentUser } from "@/lib/auth";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam
import viLocale from "date-fns/locale/vi";
import InfoDecive from "../components/info-device";
import { getAccountByUserId } from "@/data/account";

const PasswordSecurity = async () => {
  const userId = await currentUser()
  const account = await getAccountByUserId(userId?.id || "");
  const user = await prismadb.user.findUnique({
    where: {
      id: userId?.id,
    },
    include: {
      password: true,
    },
  });

  const findDevice = await prismadb.deviceInfo.findMany({
    where: {
      userId: userId?.id
    }
  })

  const formatPassword = user?.password?.length ? user?.password[0].createdAt 
    ? format(
        utcToZonedTime(
          new Date(new Date(user?.password[0].createdAt )),
          vietnamTimeZone
        ),
        "E '-' dd/MM/yyyy '-' HH:mm:ss a",
        { locale: viLocale }
      )
    : null
    : "Chưa đổi mật khẩu";

  // Kiểm tra điều kiện để quyết định có render InfoDevice hay không
  const shouldRenderDeviceInfo = !(
    account?.provider === "github" ||
    account?.provider === "google" ||
    account?.provider === "facebook" ||
    account?.provider === "gitlab" ||
    account?.provider === "reddit" ||
    account?.provider === "spotify" ||
    account?.provider === "twitter"
  );
  return (
    <div className="w-full h-full ml-5 lg:pl-12 my-8">
      <div className="font-semibold text-lg md:text-2xl">
        Mật khẩu và bảo mật
      </div>
      <div className="text-sm text-gray-500 py-2">
        Quản lý mật khẩu và cài đặt bảo mật.
      </div>
      <div className="font-semibold text-lg md:text-xl mt-5">
        Đăng nhập & khôi phục
      </div>
      <div className="text-sm text-gray-500 py-2">
        Quản lý mật khẩu và xác minh 2 bước.
      </div>
      <InfoPassword user={user} password={formatPassword} />

      {shouldRenderDeviceInfo && (
        <>
          <div className="font-semibold text-lg md:text-xl mt-5">
            Kiểm tra thiết bị
          </div>
          <div className="text-sm text-gray-500 py-2">
            Quản lý thiết bị đang đăng nhập và giới hạn.
          </div>
          <InfoDecive findDevice={findDevice} />
        </>
      )}
    </div>
  );
};

export default PasswordSecurity;
