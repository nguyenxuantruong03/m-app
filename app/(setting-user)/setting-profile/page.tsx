import { currentUser } from "@/lib/auth";
import InfoSocial from "../components/info-social";
import InfoUser from "../components/info-user";

const SettingProfile = async () => {
  const userId = await currentUser()
  return (
    <>
      <div className="w-full h-full ml-5 lg:pl-12 my-8">
        <div className="font-semibold text-lg md:text-2xl ">
          Thông tin cá nhân
        </div>
        <div className="text-sm text-gray-500 py-2">
          Quản lý thông tin cá nhân của bạn.
        </div>
        <div className="font-semibold text-lg md:text-xl mt-5">
          Thông tin cơ bản
        </div>
        <div className="text-sm text-gray-500 py-2">
          Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.
        </div>
        <InfoUser user={userId}/>

        <div className="font-semibold text-lg md:text-xl mt-5">
          Thông tin mạng xã hội
        </div>
        <div className="text-sm text-gray-500 py-2">
          Quản lý liên kết tới các trang mạng xã hội của bạn.
        </div>
        <InfoSocial user={userId}/>
      </div>
      
    </>
  );
}
export default SettingProfile;
