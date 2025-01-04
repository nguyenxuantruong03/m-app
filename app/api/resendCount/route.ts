import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/auth';
import { createTranslator } from 'next-intl';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { resendCount } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }
    
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
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
      JSON.stringify({ error: t("toastError.internalErrorPostResendCount") }),
      { status: 500 }
    );
  }
};
