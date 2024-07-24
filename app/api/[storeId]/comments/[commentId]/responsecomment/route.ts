// pages/api/comments/[commentsId]/responses.ts
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';

export async function POST(req:Request, { params }: { params?: { commentId?: string} }) {
    const body = await req.json();
    const { description,product,comment } = body;
    const userId = await currentUser();
    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: "Description is required!" }),
        { status: 400 }
      );
    }
    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
  try {

    const newResponse = await prismadb.responseComment.create({
      data: {
          description:description,
          productId: product,
          commentId: comment,
          userId: userId?.id || "",
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(newResponse);
  } catch (error) {
    console.error('[RESPONSE_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,{ params }: { params?: { commentId?: string } }) {
  try {
    const body = await req.json();
    const { id  } = body;
    const userId = await currentUser();

    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const commentById = await prismadb.comment.findFirst({
      where: {
        userId: userId?.id || "",
        id: params?.commentId,
      }
    });

    if (!commentById) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const comment = await prismadb.responseComment.delete({
      where: {
        id: id
      }
    });
  
    return NextResponse.json(comment);
  } catch (error) {
    console.log('[COMMENTREPONSE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(req: Request,{ params }: { params?: { commentId?: string } }) {
  try {
    const body = await req.json();
    const { id, description,changeReview } = body;
    const userId = await currentUser();


    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const existingComment = await prismadb.responseComment.findFirst({
      where: {
        id: id,
        userId: userId?.id || "",
      },
    });

    const updatedComment = await prismadb.responseComment.update({
      where: {
        id: id,
      },
      data: {
        description: description,
        changeReview: changeReview,
        totalchange: existingComment?.totalchange != null ? existingComment.totalchange + 1 : 1,
      },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error('[COMMENTREPONSE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET(req: Request, { params }: { params?: { commentId?: string } }) {
  try {

    const responseComment = await prismadb.responseComment.findMany({
      where: {
        commentId: params?.commentId,
      },
      include: {
        user: true
      }
    });

    return NextResponse.json(responseComment);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

