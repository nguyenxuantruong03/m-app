import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole} from "@/lib/auth";
import { UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import { ManageStaffsColumn } from "./components/column";
import ManageStaffClient from "./components/client";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const ManageStaff = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const user = await prismadb.user.findMany({
    where: {
      role: {
        in: ["ADMIN", "STAFF"]
      }
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
  

  const formattedUser: ManageStaffsColumn[] = user.map((item) => ({
    id: item.id,
    isCitizen: item.isCitizen,
    numberCCCD: item.numberCCCD,
    imageCredential: item.imageCredential
      .map((orderItem) => {
        return orderItem;
      })
      .join(", "),
    image: item.image,
    name: item.name,
    email: item.email,
    issued: item.issued,
    gender: item.gender,
    degree:  item.degree,
    maritalStatus: item.maritalStatus,
    phonenumber: item.phonenumber,
    workingTime: item.workingTime,
    ban: item.ban,
    role: item.role,
    sentVeirifi: item.sentVeirifi,
    timestartwork: item.timestartwork,
    urlimageCheckAttendance: item.urlimageCheckAttendance,
    codeNFC: item.codeNFC,
    daywork:item.daywork,
    dateRange: item.dateRange
    ? format(item.dateRange, "dd/MM/yyyy")
    : null,
    dateofbirth: item.dateofbirth
    ? format(item.dateofbirth, "dd/MM/yyyy")
    : null,
    createdAt: item.createdAt
        ? format(
            utcToZonedTime(
              new Date(new Date(item.createdAt)),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
  }));


  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showOrderRole}`}>
          {showOrderRole && <ManageStaffClient data={formattedUser} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ManageStaff;
