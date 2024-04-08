// /api/comments/router.ts
import { currentUser } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request,
  { params }: { params: { storeId: string } }) {
    const body = await req.json();
    const { rating, comment, commenter,nameproduct,imageUrl  } = body;
    try {
      const userId = await currentUser();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
      const newComment = await prismadb.comment.create({
        data: {
          rating,
          comment,
          nameproduct,
          userId: userId.id || "",
          storeId: params.storeId,
        },
      });
      return NextResponse.json(newComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      return new NextResponse("Internal error", { status: 500 });
    }
}


export async function DELETE(req: Request,
  { params }: { params: { storeId: string } }) {
  try {
    const userId = await currentUser();
    const body = await req.json();
    const { id  } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const commentById = await prismadb.comment.findFirst({
      where: {
        userId: userId.id || "",
        storeId: params.storeId,
      }
    });

    if (!commentById) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.responseComment.deleteMany({
      where: {
        commentId: id,
      },
    });


    const comment = await prismadb.comment.delete({
      where: {
        id: id
      }
    });
  
    return NextResponse.json(comment);
  } catch (error) {
    console.log('[COMMENT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(req: Request,
  { params }: { params: { storeId: string } }) {
  try {
    const userId = await currentUser();
    const body = await req.json();
    const { id, rating, comment } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const existingComment = await prismadb.comment.findFirst({
      where: {
        id: id,
        userId: userId.id || "",
        storeId: params.storeId,
      },
    });

    if (!existingComment) {
      return new NextResponse("Comment not found or unauthorized", { status: 403 });
    }

    const updatedComment = await prismadb.comment.update({
      where: {
        id: id,
      },
      data: {
        rating: rating ?? existingComment.rating,
        comment: comment ?? existingComment.comment,
      },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error('[COMMENT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET() {
  try {
    const responseComment = await prismadb.comment.findMany({
      include: {
        responsecomment: true,
      },
    });
    return NextResponse.json(responseComment);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

