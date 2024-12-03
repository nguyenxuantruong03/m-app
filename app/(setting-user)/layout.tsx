import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import NavbarProfile from "./components/nav-profile";
import DropMenuHint from "@/components/(client)/dropmenu-hint";
import ScrollButton from "@/components/(client)/backtotop/backToTop";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await currentUser();
  if (!userId) {
    redirect("/auth/login");
  }
  if (userId?.ban === true) {
    redirect("/auth/login");
  }

  return (
    <>
      <div className="flex px-3 max-w-7xl mx-auto">
        <NavbarProfile dateofbirth={userId.dateofbirth} name={userId.name} />
        {children}
      </div>
      <ScrollButton />
      <DropMenuHint />
    </>
  );
}
