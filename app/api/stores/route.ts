import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorizd ", { status: 403 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId: userId.role as UserRole,
      },
    });

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: "guest@gmail.com",
      },
    });
    
    if (!existingUser) {
      const hashPassword = await bcrypt.hash("guestguest@123", 10);
      await prismadb.user.create({
        data: {
          email: "guest@gmail.com",
          role: UserRole.GUEST,
          name: "Người ẩn danh",
          nameuser: "@guest",
          favorite: ["phobien"],
          bio: "Xin chào bạn đã tìm đến trang của khách hỗ trợ đăng nhập nhanh cho mọi người mua hàng và giúp người dùng lộ thông tin khi mua sản phẩm.",
          address: "457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân.",
          addressother: "457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân (Cửa hàng Trường Đạt).",
          socialLink: {
            create: {
              linkyoutube: "https://www.youtube.com/@nguyenxuantruong03",
              linkfacebook: "https://www.facebook.com/nguyenxuantruong03",
              linkinstagram: "https://www.instagram.com/nguyenxuantruong03",
              linktwitter: "https://x.com/ngxuantruong03",
              linklinkedin: "https://www.linkedin.com/in/xuantruong03",
              linkgithub: "https://github.com/nguyenxuantruong03",
              linktiktok: "https://www.tiktok.com/@ngxuantruong03",
              linkwebsite: "https://dashboadvdxdxuantruong.vercel.app/setting-user",
              linkother: "https://dashboadvdxdxuantruong.vercel.app/home-product",
            }
          },
          frameAvatar: "/avatar-frame/frame-0.png",
          image: "/avatar/avatar-default.jpg",
          password: {
            create: [
              {
                password: hashPassword,
              },
            ],
          },
        },
      });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("POST failed", { status: 500 });
  }
}
