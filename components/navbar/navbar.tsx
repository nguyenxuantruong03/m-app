import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "@/data/account";
import CustomNav from "./custom-nav";

const Navbar= async () => {
  const userId = await currentUser();

  if (!userId || !userId.id) {
    redirect("/auth/login");
  }

  const account = await getAccountByUserId(userId.id);
  const imageCredentials = userId?.imageCredential[0];
  const isGitHubOrGoogleUser =
  account?.provider === "github" || 
  account?.provider === "google" || 
  account?.provider === "facebook" || 
  account?.provider === "gitlab" || 
  account?.provider === "reddit" || 
  account?.provider === "spotify" || 
  account?.provider === "twitter";
    const avatarImage =imageCredentials ||(imageCredentials ? imageCredentials[0] : null) ||userId?.image;
  const store = await prismadb.store.findMany({
    where: {
      userId: {
        equals: UserRole.USER,
      },
    },
  });

  return (
    <>
    <CustomNav store={store} isGitHubOrGoogleUser={isGitHubOrGoogleUser} avatarImage={avatarImage}/>
    </>
  );
};

export default Navbar;
