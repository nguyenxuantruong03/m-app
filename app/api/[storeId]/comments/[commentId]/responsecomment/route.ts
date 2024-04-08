// pages/api/comments/[commentsId]/responses.ts

import { currentUser } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';


export async function POST(req:Request, { params }: { params?: { commentId?: string} }) {
    const body = await req.json();
    const { description,commenter,imageUrl  } = body;
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }
    const existingComment = await prismadb.comment.findFirst({
      where: {
        id: params?.commentId,
        userId: userId.id || "",
      },
    });

    if (!existingComment) {
      return new NextResponse('Comment not found or unauthorized', { status: 403 });
    }
    const newResponse = await prismadb.responseComment.create({
      data: {
        description,
        userId: userId.id || "",
        commentId: params?.commentId || "",
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
    const userId = await currentUser();
    const body = await req.json();
    const { id  } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const commentById = await prismadb.comment.findFirst({
      where: {
        userId: userId.id || "",
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
    const userId = await currentUser();
    const body = await req.json();
    const { id, description } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const existingComment = await prismadb.comment.findFirst({
      where: {
        id: params?.commentId,
        userId: userId.id || "",
      },
    });

    if (!existingComment) {
      return new NextResponse("Comment not found or unauthorized", { status: 403 });
    }

    const updatedComment = await prismadb.responseComment.update({
      where: {
        id: id,
      },
      data: {
        description: description,
        // description: description ?? existingComment.comment,

      },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error('[COMMENTREPONSE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


// export async function GET({ params }: { params?: { commentId?: string } }) {
//   try {

//     const responseComment = await prismadb.responseComment.findMany({
//       where: {
//         commentId: params?.commentId,
//       },
//     });

//     return NextResponse.json(responseComment);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     return new NextResponse('Internal error', { status: 500 });
//   }
// }

