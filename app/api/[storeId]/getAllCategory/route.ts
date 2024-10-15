import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function GET(
  req: Request,
) {
  try {
    const category = await prismadb.category.findMany();

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get category." }),
      { status: 500 }
    );
  }
}
