import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { translateEmojiDelete, translateEmojiGet, translateEmojiPost } from "@/translate/translate-api";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const emojiPostMessage = translateEmojiPost(LanguageToUse)
  try {
    const body = await req.json();
    const { commentId, emoji, userId, productId, reviewId } = body;
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: emojiPostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (!commentId && !reviewId) {
      return new NextResponse(
        JSON.stringify({ error: emojiPostMessage.commentOrReviewIdNotFound }),
        { status: 400 }
      );
    }

    if (!emoji) {
      return new NextResponse(JSON.stringify({ error: emojiPostMessage.emojiRequired }), {
        status: 400,
      });
    }

    if (!productId) {
      return new NextResponse(
        JSON.stringify({ error: emojiPostMessage.productIdRequired }),
        { status: 400 }
      );
    }

    if (commentId) {
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
          case "sad":
            emojilengthData = { emojilengthSad: 1 };
          break;
        default:
          return new NextResponse(
            JSON.stringify({ error: emojiPostMessage.invalidEmojiType }),
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
    } else {
      const existingEmoji = await prismadb.emoji.findFirst({
        where: {
          reviewId,
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
          case "sad":
            emojilengthData = { emojilengthSad: 1 };
          break;
        default:
          return new NextResponse(
            JSON.stringify({ error: emojiPostMessage.invalidEmojiType }),
            { status: 400 }
          );
      }

      const emojidata = await prismadb.emoji.create({
        data: {
          reviewId,
          emoji,
          userId,
          productId,
          ...emojilengthData,
        },
      });

      return NextResponse.json(emojidata);
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: emojiPostMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const emojiDeleteMessage = translateEmojiDelete(LanguageToUse)

  const body = await req.json();
  const { commentId, emoji, userId, reviewId } = body;
  try {
    if (commentId) {
      const emojiData = await prismadb.emoji.findFirst({
        where: {
          commentId,
          userId,
          emoji,
        },
      });

      if (!emojiData) {
        return new NextResponse(JSON.stringify({ error: emojiDeleteMessage.emojiNotFound }), {
          status: 404,
        });
      }

      const emojidata = await prismadb.emoji.delete({
        where: {
          id: emojiData.id,
        },
      });

      return NextResponse.json(emojidata);
    } else {
      const emojiData = await prismadb.emoji.findFirst({
        where: {
          reviewId,
          userId,
          emoji,
        },
      });

      if (!emojiData) {
        return new NextResponse(JSON.stringify({ error: emojiDeleteMessage.emojiNotFound }), {
          status: 404,
        });
      }

      const emojidata = await prismadb.emoji.delete({
        where: {
          id: emojiData.id,
        },
      });

      return NextResponse.json(emojidata);
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: emojiDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const emojiGetMessage = translateEmojiGet(LanguageToUse)
  try {
    const emojidata = await prismadb.emoji.findMany({
      include: {
        user: {
          include: {
            imageCredential: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    return NextResponse.json(emojidata);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: emojiGetMessage }),
      { status: 500 }
    );
  }
}
