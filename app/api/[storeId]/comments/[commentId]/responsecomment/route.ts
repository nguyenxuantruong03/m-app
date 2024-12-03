// pages/api/comments/[commentsId]/responses.ts
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import {
  translateResponseCommentDelete,
  translateResponseCommentGet,
  translateResponseCommentPatch,
  translateResponseCommentPost,
} from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params?: { commentId?: string } }
) {
  const body = await req.json();
  const { description, product, comment } = body;
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const reponseCommentPostMessage = translateResponseCommentPost(LanguageToUse);

  if (!description) {
    return new NextResponse(
      JSON.stringify({ error: reponseCommentPostMessage.descriptionRequired }),
      { status: 400 }
    );
  }

  if (!user?.id) {
    return new NextResponse(
      JSON.stringify({ error: reponseCommentPostMessage.userIdNotFound }),
      {
        status: 400,
      }
    );
  }
  try {
    const newResponse = await prismadb.responseComment.create({
      data: {
        description: description,
        productId: product,
        commentId: comment,
        userId: user?.id || "",
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
      },
    });

    return NextResponse.json(newResponse);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: reponseCommentPostMessage.internalError,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params?: { commentId?: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const reponseCommentDeleteMessage =
    translateResponseCommentDelete(LanguageToUse);

  try {
    const body = await req.json();
    const { id } = body;

    if (!user?.id) {
      return new NextResponse(
        JSON.stringify({ error: reponseCommentDeleteMessage.userIdNotFound }),
        {
          status: 400,
        }
      );
    }

    const comment = await prismadb.responseComment.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: reponseCommentDeleteMessage.internalError,
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params?: { commentId?: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const responseCommentPatchMessage =
    translateResponseCommentPatch(LanguageToUse);

  try {
    const body = await req.json();
    const { id, description, changeReview } = body;

    if (!user?.id) {
      return new NextResponse(
        JSON.stringify({ error: responseCommentPatchMessage.userIdNotFound }),
        {
          status: 400,
        }
      );
    }

    const existingComment = await prismadb.responseComment.findFirst({
      where: {
        id: id,
        userId: user?.id || "",
      },
    });

    const updatedComment = await prismadb.responseComment.update({
      where: {
        id: id,
      },
      data: {
        description: description,
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
      JSON.stringify({
        error: responseCommentPatchMessage.internalError,
      }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params?: { commentId?: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const responseCommentGetMessage = translateResponseCommentGet(LanguageToUse);
  try {
    const responseComment = await prismadb.responseComment.findMany({
      where: {
        commentId: params?.commentId,
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
      },
    });

    return NextResponse.json(responseComment);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: responseCommentGetMessage,
      }),
      { status: 500 }
    );
  }
}
