import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
      const userId = await currentUser();
      const body = await req.json();

      const { id } = body;
      if (!userId) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy user id!" }),
          { status: 403 }
        );
      }
  
      const product = await prismadb.product.update({
        where: {
          id: id,
        },
        data: {
          timeSaleStart: null, 
          timeSaleEnd: null,
          isSale: false,
        },
      });
  
      return NextResponse.json(product);
    } catch (error) {
      console.error(error); // Log the error for debugging
      return new NextResponse(
        JSON.stringify({ error: "Internal error patch product sale." }),
        { status: 500 }
      );
    }
  }