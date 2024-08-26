import  prismadb  from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, ids } = body;

    if(!ids){
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy Ids !" }),
        { status: 400 }
      );
    }

    if(!userId){
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId !" }),
        { status: 400 }
      );
    }

   const removeSelectItem = await prismadb.cartItem.deleteMany({
      where: {
        userId,
        id: { in: ids },
      },
    });

    return NextResponse.json(removeSelectItem);
  } catch(error) {
    return new NextResponse(
        JSON.stringify({ error: "Internal error delete cartItem." }),
        { status: 500 }
      );
  }
}
