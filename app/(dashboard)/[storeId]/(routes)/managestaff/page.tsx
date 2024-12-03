import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { ManageStaffsColumn } from "./components/column";
import ManageStaffClient from "./components/client";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const ManageStaff = async ({ params }: { params: { storeId: string } }) => {
  const currentUsers = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const user = await prismadb.user.findMany({
    where: {
      role: {
        in: ["ADMIN", "STAFF"],
      },
    },
    include: {
      imageCredential: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  const formattedUser: ManageStaffsColumn[] = user.map((item) => ({
    id: item.id,
    language: currentUsers?.language || "vi",
    isCitizen: item.isCitizen,
    numberCCCD: item.numberCCCD,
    imageCredential: item.imageCredential[0]?.url,
    imageCredentialUrl: item.imageCredential,
    image: item.image,
    name: item.name,
    email: item.email,
    issued: item.issued,
    gender: item.gender,
    degree: item.degree,
    maritalStatus: item.maritalStatus,
    phonenumber: item.phonenumber,
    workingTime: item.workingTime,
    ban: item.ban,
    role: item.role,
    sentVeirifi: item.sentVeirifi,
    timestartwork: item.timestartwork,
    urlimageCheckAttendance: item.urlimageCheckAttendance,
    codeNFC: item.codeNFC,
    daywork: item.daywork,
    dateRange: item.dateRange ? format(item.dateRange, "dd/MM/yyyy") : null,
    dateRangepatch: item.dateRange,
    dateofbirthpatach: item.dateofbirth,
    dateofbirth: item.dateofbirth
      ? format(item.dateofbirth, "dd/MM/yyyy")
      : null,
    updatedAt: item.updatedAt,
    createdAt: item.createdAt,
    createdAtString: item.createdAt
      ? format(
          utcToZonedTime(new Date(new Date(item.createdAt)), vietnamTimeZone),
          "E '-' dd/MM/yyyy '-' HH:mm:ss a",
          { locale: viLocale }
        )
      : null,
  }));

  return (
    <RoleGate allowedRole={[UserRole.ADMIN]}>
      <div className={`space-y-4 p-8 pt-6 ${showOrderRole}`}>
        {showOrderRole && <ManageStaffClient data={formattedUser} />}
      </div>
    </RoleGate>
  );
};

export default ManageStaff;
