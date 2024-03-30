import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse(
        JSON.stringify({ error: "Size id is required!" }),
        { status: 400 }
      );
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId
      }
    });
  
    return NextResponse.json(size);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get size." }),
      { status: 500 }
    );
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string, storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.sizeId) {
      return new NextResponse(
        JSON.stringify({ error: "Size id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      }
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
        { status: 403 }
      );
    }

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
      }
    });
  
    return NextResponse.json(size);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete size." }),
      { status: 500 }
    );
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string, storeId: string } }
) {
  try {   
    const userId = await currentUser();

    const body = await req.json();
    
    const { name, value } = body;
    
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: "Name is required!" }),
        { status: 400 }
      );
    }

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: "Value is required!" }),
        { status: 400 }
      );
    }

    if (!params.sizeId) {
      return new NextResponse(
        JSON.stringify({ error: "Size id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      }
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    const size = await prismadb.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      }
    });
  
    return NextResponse.json(size);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch size." }),
      { status: 500 }
    );
  }
};
