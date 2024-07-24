import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
  ) {
    const body = await req.json();
    const { userId } = body;
    if(!userId){
        return new NextResponse(
            JSON.stringify({ error: "UserId is required!" }),
            { status: 400 }
          );
    }
    try {
        const banuser = await prismadb.user.update({
            where: { id: userId },
            data: {
                isCitizen : true
            },
          });
      return NextResponse.json(banuser);
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: "Lỗi cục bộ khi xác thực!" }), {
        status: 500,
      });
    }
  }

  export async function PATCH(
    req: Request,
  ) {
    const body = await req.json();
    const { userId } = body;
    if(!userId){
        return new NextResponse(
            JSON.stringify({ error: "UserId is required!" }),
            { status: 400 }
          );
    }
    try {
        const banuser = await prismadb.user.update({
            where: { id: userId },
            data: {
                isCitizen : false
            },
          });
      return NextResponse.json(banuser);
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: "Lỗi cục bộ khi bỏ xác thực!" }), {
        status: 500,
      });
    }
  }