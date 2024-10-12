import { Gender, ImageReview, Review } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER" | "STAFF" | "SHIPPER" | "GUEST" | "MARKETING";
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  provider: string;
  imageCredential: string;
  favorite: string[];
  ban: boolean;
  timestartwork: string;
  urlimageCheckAttendance: string;
  codeNFC: string;
  daywork: string[];
  nameuser: string;
  bio: string; 
  address:string; 
  addressother:string; 
  gender: Gender; 
  phonenumber: string;
  frameAvatar:string
  dateofbirth: DateTime;
  isCitizen: boolean;
  createdAt: DateTime
  linkyoutube: string;
  linkfacebook: string;
  linkinstagram: string;
  linktwitter: string;
  linklinkedin: string;
  linkgithub: string;
  linktiktok: string;
  linkwebsite: string;
  linkother: string;
  isLive: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
