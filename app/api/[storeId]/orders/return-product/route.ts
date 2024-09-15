import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
      const userId = await currentUser();
      const body = await req.json();
  
      const { orderId, imagereturnProduct,description } = body;
  
      if (!userId) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy user id!" }),
          { status: 403 }
        );
      }

      if(!imagereturnProduct){
        return new NextResponse(
          JSON.stringify({ error: "Hãy thêm ảnh lỗi cần trả hàng!" }),
          { status: 404 }
        );
      }

      if(!description){
        return new NextResponse(
          JSON.stringify({ error: "Hãy thêm nội dung cần trả hàng!" }),
          { status: 404 }
        );
      }
  
      const order = await prismadb.order.update({
        where: {
          id: orderId,
        },
        data: {
          returnProduct:true,
          status: StatusOrder.Tra_hang,
          userIdStaff: userId?.id || "",
          destiontionReturnProduct: description,
          imagereturnProduct: {
            createMany: {
              data: [...imagereturnProduct.map((image: { url: string }) => image)],
            },
          },
        },
      });
  
      return NextResponse.json(order);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Internal error patch order." }),
        { status: 500 }
      );
    }
  }