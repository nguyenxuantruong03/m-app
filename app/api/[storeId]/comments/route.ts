// /api/comments/router.ts
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import {
  translateCommentDelete,
  translateCommentGet,
  translateCommentPatch,
  translateCommentPost,
} from "@/translate/translate-api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { rating, comment, productId } = body;

  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const commentPostMessage = translateCommentPost(LanguageToUse);

  if (!rating) {
    return new NextResponse(
      JSON.stringify({ error: commentPostMessage.ratingRequired }),
      {
        status: 400,
      }
    );
  }
  if (!productId) {
    return new NextResponse(
      JSON.stringify({ error: commentPostMessage.productRequired }),
      {
        status: 400,
      }
    );
  }
  if (!comment) {
    return new NextResponse(
      JSON.stringify({ error: commentPostMessage.commentRequired }),
      {
        status: 400,
      }
    );
  }
  try {
    if (!user?.id) {
      return new NextResponse(
        JSON.stringify({ error: commentPostMessage.userIdNotFound }),
        {
          status: 400,
        }
      );
    }

    const newComment = await prismadb.comment.create({
      data: {
        rating,
        comment,
        productId,
        userId: user.id || "",
      },
      include: {
        user: {
          include: {
            imageCredential: {
              orderBy: {
                createdAt: "desc",
              },
            },
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
        product: true,
      },
    });
    return NextResponse.json(newComment);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: commentPostMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const commentDeleteMessage = translateCommentDelete(LanguageToUse);

  try {
    const body = await req.json();
    const { id } = body;

    if (!user?.id) {
      return new NextResponse(
        JSON.stringify({ error: commentDeleteMessage.userIdNotFound }),
        {
          status: 400,
        }
      );
    }

    const commentById = await prismadb.comment.findFirst({
      where: {
        userId: user.id || "",
      },
    });

    if (!commentById) {
      return new NextResponse(
        JSON.stringify({ error: commentDeleteMessage.commentByIdNotFound }),
        {
          status: 405,
        }
      );
    }

    await prismadb.emoji.deleteMany({
      where: {
        commentId: id,
      },
    });

    await prismadb.responseComment.deleteMany({
      where: {
        commentId: id,
      },
    });

    const comment = await prismadb.comment.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: commentDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const commentPatchMessage = translateCommentPatch(LanguageToUse);

  try {
    const body = await req.json();
    const { id, rating, comment, changeReview } = body;

    if (!user?.id) {
      return new NextResponse(
        JSON.stringify({ error: commentPatchMessage.userIdNotFound }),
        {
          status: 400,
        }
      );
    }

    const existingComment = await prismadb.comment.findFirst({
      where: {
        id: id,
        userId: user.id || "",
      },
    });

    const updatedComment = await prismadb.comment.update({
      where: {
        id: id,
      },
      data: {
        rating: rating ?? existingComment?.rating,
        comment: comment ?? existingComment?.comment,
        changeReview: changeReview,
        totalchange:
          existingComment?.totalchange != null
            ? existingComment.totalchange + 1
            : 1,
      },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: commentPatchMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function GET() {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const commentGetMessage = translateCommentGet(LanguageToUse)
  try {
    const responseComment = await prismadb.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        responsecomment: true,
        user: {
          include: {
            imageCredential: {
              orderBy: {
                createdAt: "desc",
              },
            },
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
        product: true,
      },
    });
    return NextResponse.json(responseComment);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: commentGetMessage }),
      { status: 500 }
    );
  }
}
