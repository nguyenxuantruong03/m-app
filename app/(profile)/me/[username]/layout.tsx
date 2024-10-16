import { redirect } from "next/navigation";

import { Container } from "./_components/container";
import { Sidebar } from "./_components/sidebar";
import { getSelfByUsername } from "@/lib/stream/auth-service";
import { Navbar } from "@/app/(profile-user-other)/_components/navbar";

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
    <div className="bg-white h-full text-slate-900">
      <Navbar exitLink={true}/>
      <div className="flex h-full pt-20 bg-white">
        <Sidebar />
        <Container>
        {children}
        </Container>
      </div>
    </div>
  );
};

export default CreatorLayout;
