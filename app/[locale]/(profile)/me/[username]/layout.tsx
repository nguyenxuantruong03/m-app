import { redirect } from "next/navigation";

import { Container } from "./_components/container";
import { Sidebar } from "./_components/sidebar";
import { getSelfByUsername } from "@/lib/stream/auth-service";
import { Navbar } from "@/app/[locale]/(profile-user-other)/_components/navbar";
import BoxChat from "@/components/(client)/boxchat";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}
const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <div className="h-full text-slate-900">
        <Navbar exitLink={true} />
        <div className=" h-full pt-20">
          <Sidebar />
          <Container>{children}</Container>
        </div>
      </div>
      <BoxChat />
    </>
  );
};

export default CreatorLayout;
