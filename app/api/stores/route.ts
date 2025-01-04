import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createTranslator } from "next-intl";

export async function GET(
  req: Request,
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {

    if (!user) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 403,
      });
    }

    if (user.role === UserRole.USER || user.role === UserRole.GUEST ) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 405 }
      );
    }

    const store = await prismadb.store.findMany();
    return NextResponse.json(store);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: t("toastError.internalErrorGetStore") }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();

    const { name } = body;

    if (!user) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 403,
      });
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: t("toastError.nameRequired") }), {
        status: 400,
      });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId: user.id || "",
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
          addressother:
            "457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân (Cửa hàng Trường Đạt).",
          socialLink: {
            create: {
              linkyoutube: "https://www.youtube.com/@nguyenxuantruong03",
              linkfacebook: "https://www.facebook.com/nguyenxuantruong03",
              linkinstagram: "https://www.instagram.com/nguyenxuantruong03",
              linktwitter: "https://x.com/ngxuantruong03",
              linklinkedin: "https://www.linkedin.com/in/xuantruong03",
              linkgithub: "https://github.com/nguyenxuantruong03",
              linktiktok: "https://www.tiktok.com/@ngxuantruong03",
              linkwebsite:
                "https://dashboadvdxdxuantruong.vercel.app/setting-user",
              linkother:
                "https://dashboadvdxdxuantruong.vercel.app/home-product",
            },
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

    const existingAdminUser = await prismadb.user.findUnique({
      where: {
        email: "vlxdtruongdat@gmail.com",
      },
    });
    
    if (!existingAdminUser) {
      const hashPasswordStore = await bcrypt.hash("vlxdtruongdat@123", 10);
      await prismadb.user.create({
        data: {
          id: "2611200326112003",
          email: "vlxdtruongdat@gmail.com",
          role: UserRole.ADMIN,
          name: "VLXD Trường Đạt",
          nameuser: "@vlxtruongdat",
          favorite: ["phobien"],
          bio: "Xin chào bạn đã tìm đến trang của khách hỗ trợ đăng nhập nhanh cho mọi người mua hàng và giúp người dùng lộ thông tin khi mua sản phẩm.",
          address: "457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân.",
          addressother:
            "457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân (Cửa hàng Trường Đạt).",
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
            },
          },
          frameAvatar: "/avatar-frame/frame-0.png",
          image: "/avatar/avatar-admin-chat.png",
          password: {
            create: [
              {
                password: hashPasswordStore,
              },
            ],
          },
        },
      });
    }

    return NextResponse.json(store);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: t("toastError.internalErrorPostStore") }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();
    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.idsArrayNotEmpty") }),
        { status: 400 }
      );
    }

    // Fetch all cartegories to delete, including their images
    const StoreToDelete = await prismadb.store.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = StoreToDelete.map(store => ({
      name: store.name,
    }));

    // Delete all the cartegories in one operation
    await prismadb.store.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Log the changes in a single database operation
    await prismadb.system.create({
      data: {
        storeId: "",
        delete: changesArray.map(change => `DeleteName: ${change.name}`),
        type: "DELETESTORE",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: t("toastSuccess.deletionSuccess") });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorDeleteStore") }),
      { status: 500 }
    );
  }
}