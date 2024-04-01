import ErrorCard from "@/components/auth/error-card";
import ErrorCardBan from "@/components/auth/error-card-ban";
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";

const AuthErrorPage = async () => {
  // Use NextAuth session to access user information
  const userId = await currentUser();
  const banuser = await prismadb.user.findFirst({ where: { id: userId?.id } });

  // Check if the user is banned and get ban information
  const isBanned = banuser?.ban;
  const banExpires = banuser?.banExpires;

  // Initialize daysLeft outside the if block
  let daysLeft: number;

  // Display ban message if the user is banned
  if (isBanned && banExpires) {
    const now = new Date();
    const banExpiresDate = new Date(banExpires);

    // Check if banExpiresDate is a valid date
    if (!isNaN(banExpiresDate.getTime())) {
      daysLeft = Math.ceil(
        (banExpiresDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
      );
    } else {
      // Provide a default value for daysLeft if banExpiresDate is not a valid date
      daysLeft = 0;
    }
  } else {
    // Provide a default value for daysLeft if the user is not banned
    daysLeft = 0;
  }

  return (
    <>
       {daysLeft > 0 ? <ErrorCardBan daysLeft={daysLeft} /> : <ErrorCard />}
    </>
  );
};

export default AuthErrorPage;
