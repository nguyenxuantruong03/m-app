import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import NavbarProfile from "./components/nav-profile";

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
    <div className="flex max-w-xs sm:max-w-sm md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto">
      <NavbarProfile dateofbirth={userId.dateofbirth} name={userId.name}/>
      {children}
    </div>
  );
}
