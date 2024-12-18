import { Suspense } from "react";
import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import DropMenuHint from "@/components/(client)/dropmenu-hint";
import ScrollButton from "@/components/(client)/backtotop/backToTop";
import BoxChat from "@/components/(client)/boxchat";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20 ">
        <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
        </Suspense>
        <Container>{children} </Container>
      </div>
      <ScrollButton />
      <DropMenuHint />
      <BoxChat />
    </>
  );
};

export default BrowseLayout;
