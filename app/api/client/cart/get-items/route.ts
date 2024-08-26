import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { userId } = body;
      
      const cartItemData = await prismadb.cartItem.findMany({
        where: {
          userId: userId
        },
        include: {
          user: true,
          product: {
            include: {
              images: true,
              productdetail: {
                include: {
                  size1: true,
                  color1: true,
                  size2: true,
                  color2: true,
                  size3: true,
                  color3: true,
                  size4: true,
                  color4: true,
                  size5: true,
                  color5: true,
                  category: true,
                }
              }
            }
          }
        }
      });

      return NextResponse.json(cartItemData);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Internal error get cartItem." }),
        { status: 500 }
      );
    }
  }