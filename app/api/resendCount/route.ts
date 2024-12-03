import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { translateResendCountPost } from '@/translate/translate-api';
 
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const resendCountPostMessage = translateResendCountPost(LanguageToUse)
  try {
    const body = await req.json();
    const { resendCount } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: resendCountPostMessage.userIdNotFound }),
        { status: 403 }
      );
    }
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: resendCountPostMessage.storeIdRequired }),
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
        JSON.stringify({ error: resendCountPostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }
// Cập nhật resendCount trong cơ sở dữ liệu
   const resentCount = await prismadb.user.update({
      where: {id: user?.id || ""},
      data: {
        resendCount: resendCount
      }
    });
  
    return NextResponse.json(resentCount);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: resendCountPostMessage.internalErrorPostResendCount }),
      { status: 500 }
    );
  }
};
