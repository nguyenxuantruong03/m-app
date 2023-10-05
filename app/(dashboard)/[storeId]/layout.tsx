import Navbar from "@/components/navbar/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
    <div className="flex">
      <div className="w-[280px] h-full bg-red-300 rounded-md bg-opacity-50">
      <Navbar />
      </div>
      {children}
    </div>
    </>
  );
}
