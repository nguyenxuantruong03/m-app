import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import CommentClient from "./components/client";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
import { CommentColumn } from "./components/column";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const Comment = async () => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const comment = await prismadb.comment.findMany({
    include: {
      user: true,
      responsecomment: true
    },
  });

  const formattedComment: CommentColumn[] = comment.map((item) => ({
    id: item.id,
    name: item.user.name,
    email: item.user.email,
    role: item.user.role,
    rating: item.rating,
    comment: item.comment,
    nameproduct: item.nameproduct,
    description: item.responsecomment.map((item)=> item.description),
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
        {showOrderRole && <CommentClient data={formattedComment} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default Comment;
