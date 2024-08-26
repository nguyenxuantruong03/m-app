import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { commentId, emoji, userId, productId } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!commentId) {
      return new NextResponse(
        JSON.stringify({ error: "Comment Id is required!" }),
        { status: 400 }
      );
    }
    if (!emoji) {
      return new NextResponse(JSON.stringify({ error: "Emoji is required!" }), {
        status: 400,
      });
    }

    if (!productId) {
      return new NextResponse(
        JSON.stringify({ error: "productId is required!" }),
        { status: 400 }
      );
    }

    const existingEmoji = await prismadb.emoji.findFirst({
      where: {
        commentId,
        userId,
        productId,
      },
    });

    // Delete the existing emoji if found
    if (existingEmoji) {
      await prismadb.emoji.delete({
        where: {
          id: existingEmoji.id,
        },
      });
    }

    // Xác định giá trị emojilength dựa trên loại emoji
    let emojilengthData: any = {}; // Đặt kiểu dữ liệu hợp lý hơn nếu cần
    switch (emoji) {
      case "like":
        emojilengthData = { emojilengthLike: 1 };
        break;
      case "haha":
        emojilengthData = { emojilengthHaha: 1 };
        break;
      case "wow":
        emojilengthData = { emojilengthWow: 1 };
        break;
      case "angry":
        emojilengthData = { emojilengthAngry: 1 };
        break;
      case "love":
        emojilengthData = { emojilengthLove: 1 };
        break;
      default:
        return new NextResponse(
          JSON.stringify({ error: "Invalid emoji type!" }),
          { status: 400 }
        );
    }

    const emojidata = await prismadb.emoji.create({
      data: {
        commentId,
        emoji,
        userId,
        productId,
        ...emojilengthData,
      },
    });

    return NextResponse.json(emojidata);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post emoji." }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();

  const { commentId, emoji, userId } = body;
  try {
    const emojiData = await prismadb.emoji.findFirst({
      where: {
        commentId,
        userId,
        emoji,
      },
    });

    if (!emojiData) {
      return new NextResponse(JSON.stringify({ error: "Emoji not found." }), {
        status: 404,
      });
    }

    const emojidata = await prismadb.emoji.delete({
      where: {
        id: emojiData.id,
      },
    });

    return NextResponse.json(emojidata);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete emojie." }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const emojidata = await prismadb.emoji.findMany({
      include: {
        user: {
          include: {
            imageCredential: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      }
    });

    return NextResponse.json(emojidata);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get emojie." }),
      { status: 500 }
    );
  }
}
