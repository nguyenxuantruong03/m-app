import prismadb from "@/lib/prismadb";
import FeedBackClient from "./components/client";
import { FeedBackColumn } from "./components/columns";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const FeedBackPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showFeedBackRole = isRole;
  const feedBack = await prismadb.feedBack.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true
    }
  });

  const formattedFeedBack: FeedBackColumn[] = feedBack.map((item) => ({
    id: item.id,
    emotion: item.emotion,
    category: item.category,
    content: item.content,
    createdAt: item.createdAt,
    email: item.user.email,
    name: item.user.name,
    language: user?.language || "vi"
  }));
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showFeedBackRole}`}>
          {showFeedBackRole && <FeedBackClient data={formattedFeedBack} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default FeedBackPage;
