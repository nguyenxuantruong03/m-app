import NextAuth,{type DefaultSession} from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER" | "STAFF"  | "SHIPPER" | "GUEST" | "MARKETING";
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    imageCredential: string[];
    ban: boolean
}

declare module "next-auth" {
    interface Session {
     user: ExtendedUser;
    }
  }