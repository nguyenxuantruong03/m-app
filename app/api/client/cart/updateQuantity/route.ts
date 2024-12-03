import { currentUser } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { translateQuantityItemUpdate } from '@/translate/translate-api';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const quantityItemUpdate = translateQuantityItemUpdate(LanguageToUse)
  try {
    const body = await req.json();
    const { id, quantity,warranty } = body;

    const updatedItem = await prismadb.cartItem.update({
      where: { id },
      data: { quantity,warranty },
    });

    return NextResponse.json(updatedItem);
  } catch(error) {
    return new NextResponse(
        JSON.stringify({ error: quantityItemUpdate }),
        { status: 500 }
      );
  }
}
