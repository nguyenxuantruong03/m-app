import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import CustomNav from "./custom-nav";

const Navbar= async () => {
  const userId = await currentUser();

  if (!userId || !userId.id) {
    redirect("/auth/login");
  }

  const imageCredentials = userId?.imageCredential;
  // Use the first image from imageCredential hoăc ảnh iamge nêu ko có thì dùng deafault
  const avatarImage =imageCredentials ||(imageCredentials ? imageCredentials : null) ||userId?.image;
  const store = await prismadb.store.findMany();

  return (
    <>
    <CustomNav store={store} avatarImage={avatarImage}/>
    </>
  );
};

export default Navbar;
