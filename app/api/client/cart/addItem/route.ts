import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity, userId, warranty,size,color } = body;

    if (!userId) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy user id!" }),
          { status: 403 }
        );
      }
      if (!quantity) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy qquantity!" }),
          { status: 403 }
        );
      }
      if (!productId) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy product id!" }),
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
        JSON.stringify({ error: "Internal error post cartItem." }),
        { status: 500 }
      );
  }
}
