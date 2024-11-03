import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";
import Gitlab from "next-auth/providers/gitlab";
import Reddit from "next-auth/providers/reddit";
import Spotify from "next-auth/providers/spotify";
import Twitter from "next-auth/providers/twitter";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import prismadb from "./lib/prismadb";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Facebook({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
    Gitlab({
      clientId: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
    }),
    Reddit({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: {
        params: {
          duration: "permanent",
        },
      },
    }),
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET,
    }),
    Twitter({
      clientId: process.env.AUTH_TWITCH_ID,
      clientSecret: process.env.AUTH_TWITCH_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user) return null;

          // Truy vấn mật khẩu của người dùng từ mô hình Password
          const userPasswords = await prismadb.password.findMany({
            where: {
              userId: user.id,
            },
            orderBy: {
              createdAt: "desc", // Sắp xếp theo thời gian giảm dần để lấy mật khẩu mới nhất
            },
            take: 1, // Chỉ lấy mật khẩu mới nhất
          });

          if (userPasswords.length === 0) return null;

          // Kiểm tra mật khẩu
          // // Còn nếu password bằng guestguest@123A thì ko cần compare
          let passwordsMatch = false;
          if (password === "guestguest@123A") {
            passwordsMatch = true;
          } else {
            passwordsMatch = await bcrypt.compare(password, userPasswords[0].password);
          }
        

          if (passwordsMatch && !user.ban) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
