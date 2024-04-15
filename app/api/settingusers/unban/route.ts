import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const body = await req.json();
    const { userId } = body;
  
    try {
      const unbanUser = await prismadb.user.update({
        where: { id: userId },
        data: {
          ban: false,
          resendCount: 0,
          banExpires: null, 
        },
      });
  
      return NextResponse.json(unbanUser);
    } catch (error) {
      console.error("Error unbanning user:", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }