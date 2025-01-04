import { currentUser } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { createTranslator } from 'next-intl';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { productId, quantity, userId, warranty,size,color } = body;

    if (!userId) {
        return new NextResponse(
          JSON.stringify({ error: t("toastError.userNotFound") }),
          { status: 403 }
        );
      }
      if (!quantity) {
        return new NextResponse(
          JSON.stringify({ error: t("toastError.quantityNotFound") }),
          { status: 403 }
        );
      }
      if (!productId) {
        return new NextResponse(
          JSON.stringify({ error: t("toastError.productIdNotFound") }),
          { status: 403 }
        );
      }

    const existingItem = await prismadb.cartItem.findFirst({
      where: { productId, userId,size,color },
    });

    if (existingItem) {
      const updatedItem = await prismadb.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
      return NextResponse.json(updatedItem);
    } else {
      const newItem = await prismadb.cartItem.create({
        data: {
          productId,
          quantity,
          userId,
          size,
          color,
          warranty
        },
      });
      return NextResponse.json(newItem);
    }
  } catch(error) {
    return new NextResponse(
        JSON.stringify({ error: t("toastError.internalErrorCartAddItem") }),
        { status: 500 }
      );
  }
}
