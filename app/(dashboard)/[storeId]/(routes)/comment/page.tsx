import prismadb from "@/lib/prismadb";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import FormSuccess from "@/components/form-success";
import CommentClient from "./components/client";
import { CommentColumn } from "./components/column";

const Comment = async () => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN;
  const showOrderRole = isRole;
  const comment = await prismadb.comment.findMany({
    include: {
      user: true,
      responsecomment: {
        include: {
          user: true
        },
      },
    },
  });

  const formattedComment: CommentColumn[] = comment.map((item) => {
   return {
    id: item.id,
    userId: item.user.id,
    name: item.user.name,
    email: item.user.email,
    role: item.user.role,
    rating: item.rating,
    comment: item.comment,
    banExpiresTime: item.user.banExpires,
    ban: item.user.ban,
    isbanforever: item?.user.isbanforever,
    description: item.responsecomment.map((item)=> { return(
    <div key={item.id}> 
      <div>{item.user.name}: {item.description}</div>
    </div>
    )}),
    createdAt: item.createdAt,
   }
  });

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