import { currentUser } from "@/lib/auth";
import InfoSocial from "../components/info-social";
import InfoUser from "../components/info-user";
import prismadb from "@/lib/prismadb";

const SettingProfile = async () => {
  const userId = await currentUser()
  const user = await prismadb.user.findUnique({
    where: {
      id: userId?.id,
    },
    include: {
      socialLink: true,
    },
  });
  const favorite = await prismadb.favorite.findMany()
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
        <InfoUser user={user! ?? undefined} favorite={favorite}/>

        <div className="font-semibold text-lg md:text-xl mt-5">
          Thông tin mạng xã hội
        </div>
        <div className="text-sm text-gray-500 py-2">
          Quản lý liên kết tới các trang mạng xã hội của bạn.
        </div>
        <InfoSocial user={user?.socialLink! ?? undefined}/>
      </div>
      
    </>
  );
}
export default SettingProfile;
