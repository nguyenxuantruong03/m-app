import prismadb from '@/lib/prismadb';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
        JSON.stringify({ error: "Internal error update cartItem." }),
        { status: 500 }
      );
  }
}
