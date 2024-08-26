import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

  export async function POST(req: Request) {
    try {
        const { userId} = await req.json();
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      const order = await prismadb.order.findMany({
        where:{
            userId: userId
        },
        include: {
          orderItem: {
            include: {
              product: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    
      return NextResponse.json(order);
    } catch (error) {
      console.error("Error fetching comments:", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }