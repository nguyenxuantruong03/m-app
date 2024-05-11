import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const system = await prismadb.size.findMany();

    return NextResponse.json(system);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get system." }),
      { status: 500 }
    );
  }
}
