import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if(!id){
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy Id!" }),
        { status: 500 }
      );
    }
    const removeItem = await prismadb.cartItem.delete({
      where: { id: id  },
    })

    return NextResponse.json(removeItem);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete cartItem." }),
      { status: 500 }
    );
  }
}
