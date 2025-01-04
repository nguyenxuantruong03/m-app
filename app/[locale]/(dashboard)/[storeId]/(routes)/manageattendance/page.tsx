import prismadb from "@/lib/prismadb";
import { format, subHours } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { ManageAttendancesColumn } from "./components/column";
import ManageAttendanceClient from "./components/client";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";

const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const ManageAttendance = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const currentUsers = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const calendar = await prismadb.eventCalendar.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: [
      {
        start: "desc",
      },
    ],
    include: {
      user: true,
    },
  });

  const formattedAttendance: ManageAttendancesColumn[] = calendar.map(
    (item) => ({
      id: item.id,
      userId: item.userId,
      user: item.user.name,
      wokingTime: item.user.workingTime,
      email: item.user.email,
      language: currentUsers?.language || "vi",
      attendancestart: item.attendancestart,
      attendanceend: item.attendanceend,
      allDay: item.allDay,
      title: item.title,
      urlImageAttendance: item.urlImageAttendance,
      qrcodeCheckAttendance: item.qrcodeCheckAttendance,
      delayTime: item.delayTime,
      isCheckAttendanceImage: item.isCheckAttendanceImage,
      updateNFC: item.updateNFC
        ? format(
            utcToZonedTime(
              subHours(new Date(item.updateNFC), 7),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
      updateImage: item.updateImage
        ? format(
            utcToZonedTime(
              subHours(new Date(item.updateImage), 7),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
      end: item.end
        ? format(
            utcToZonedTime(subHours(new Date(item.end), 7), vietnamTimeZone),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
      start: item.start
        ? format(
            utcToZonedTime(subHours(new Date(item.start), 7), vietnamTimeZone),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
    })
  );

  return (
    <RoleGate allowedRole={[UserRole.ADMIN]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showOrderRole}`}>
          {showOrderRole && (
            <ManageAttendanceClient data={formattedAttendance} />
          )}
        </div>
      </div>
    </RoleGate>
  );
};

export default ManageAttendance;
