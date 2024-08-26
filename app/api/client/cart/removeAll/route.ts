import prismadb from '@/lib/prismadb';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if(!userId){
        return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

  const removeAll = await prismadb.cartItem.deleteMany({
      where: { userId },
    });

    return NextResponse.json(removeAll);
  } catch(error) {
    return new NextResponse(
        JSON.stringify({ error: "Internal error post cartItem." }),
        { status: 500 }
      );
  }
}
