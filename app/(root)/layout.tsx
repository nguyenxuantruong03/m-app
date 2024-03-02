import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const userId = await prismadb.user.findFirst({ where: { id: user?.id } });
  if (!userId || !user) {
     redirect("/auth/login");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId: {
        equals: UserRole.USER,
      },
    },
  });
  /* Mã đang kiểm tra xem cửa hàng có tồn tại cho người dùng hiện tại hay không. Nếu một cửa hàng tồn tại, nó sẽ chuyển hướng
     người dùng đến trang tương ứng với ID của cửa hàng đó. */
  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
