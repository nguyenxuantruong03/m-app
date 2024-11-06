import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/auth';
import { UserRole } from '@prisma/client';
 
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { resendCount } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }
// Cập nhật resendCount trong cơ sở dữ liệu
   const resentCount = await prismadb.user.update({
      where: {id: userId?.id || ""},
      data: {
        resendCount: resendCount
      }
    });
  
    return NextResponse.json(resentCount);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post resendCount." }),
      { status: 500 }
    );
  }
};
