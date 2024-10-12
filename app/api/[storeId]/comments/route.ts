// /api/comments/router.ts
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const userId = await currentUser();
  const { rating, comment, productId } = body;

  if (!rating) {
    return new NextResponse(JSON.stringify({ error: "Rating is required!" }), {
      status: 400,
    });
  }
  if (!productId) {
    return new NextResponse(JSON.stringify({ error: "Product is required!" }), {
      status: 400,
    });
  }
  if (!comment) {
    return new NextResponse(JSON.stringify({ error: "Comment is required!" }), {
      status: 400,
    });
  }
  try {
    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const newComment = await prismadb.comment.create({
      data: {
        rating,
        comment,
        productId,
        userId: userId.id || "",
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
    console.error("Error creating comment:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    const body = await req.json();
    const { id } = body;
    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const commentById = await prismadb.comment.findFirst({
      where: {
        userId: userId.id || "",
      },
    });

    if (!commentById) {
      return new NextResponse("Unauthorized", { status: 405 });
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
    console.log("[COMMENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    const body = await req.json();
    const { id, rating, comment, changeReview } = body;

    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const existingComment = await prismadb.comment.findFirst({
      where: {
        id: id,
        userId: userId.id || "",
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
    console.error("[COMMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
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
    console.error("Error fetching comments:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
