import { currentUser } from "@/lib/auth";
import InfoSocial from "@/app/(setting-user)/components/info-social";
import InfoUser from "@/app/(setting-user)/components/info-user";
import prismadb from "@/lib/prismadb";

interface SettingProfileProps {
  isCustomWarehouse?: boolean;
}

const SettingProfilePage = async ({isCustomWarehouse = false}:SettingProfileProps) => {
  const userId = await currentUser()
  const user = await prismadb.user.findUnique({
    where: {
      id: userId?.id,
    },
    include: {
      socialLink: true,
      imageCredential: {
        orderBy: {
            createdAt: 'desc'
        }
    }
    },
  });
  const favorite = await prismadb.favorite.findMany()
  return (
    <>
      <div className={`${ isCustomWarehouse ? "w-full h-full md:pl-5 lg:pl-12 my-8" : "w-full h-full ml-5 lg:pl-12 my-8"}`}>
        <div className="font-semibold text-lg md:text-2xl text-salte-900 dark:text-slate-200">
          Thông tin cá nhân
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
          Quản lý thông tin cá nhân của bạn.
        </div>
        <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
          Thông tin cơ bản
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 py-2 ">
          Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.
        </div>
        <InfoUser isCustomWarehouse={isCustomWarehouse} user={user! ?? undefined} imageCredential={user?.imageCredential[0]?.url || ""} favorite={favorite}/>

        <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
          Thông tin mạng xã hội
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
          Quản lý liên kết tới các trang mạng xã hội của bạn.
        </div>
        <InfoSocial existingUser={user! ?? undefined} userSocial={user?.socialLink! ?? undefined}/>
      </div>
      
    </>
  );
}
export default SettingProfilePage;
