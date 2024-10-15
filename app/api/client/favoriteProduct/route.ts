import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const {id, productId, userId,selectedSize,selectedColor,productName } = body;

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: "Không tìm thấy user id!" }),
      { status: 403 }
    );
  }

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: "Không tìm thấy id favorite!" }),
      { status: 403 }
    );
  }

  if (!productId) {
    return new NextResponse(
      JSON.stringify({ error: "ProductId is required!" }),
      { status: 400 }
    );
  }

  
  if (!productName) {
    return new NextResponse(
      JSON.stringify({ error: "productName is required!" }),
      { status: 400 }
    );
  }

  
  if (!selectedSize) {
    return new NextResponse(
      JSON.stringify({ error: "Size is required!" }),
      { status: 400 }
    );
  }

  if (!selectedColor) {
    return new NextResponse(
      JSON.stringify({ error: "Color is required!" }),
      { status: 400 }
    );
  }

  try {
    const favoriteProduct = await prismadb.favoriteProduct.create({
      data: {
        id: id,
        productName,
        productId,
        userId,
        selectedSize,
        selectedColor
      },
    });

    return NextResponse.json(favoriteProduct);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post favoriteProduct." }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
    const body = await req.json();
  
    const { id, userId } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy id!" }),
        { status: 403 }
      );
    }

    try {
      const favoriteProduct = await prismadb.favoriteProduct.deleteMany({
        where: {
          id,
          userId,
        },
      });
  
      return NextResponse.json(favoriteProduct);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Internal error post favoriteProduct." }),
        { status: 500 }
      );
    }
  }
  

  export async function PATCH(req: Request) {
    try {
      const body = await req.json();
      const { userId } = body;
      
      const FavoriteItemData = await prismadb.favoriteProduct.findMany({
        where: {
          userId: userId
        },
        include: {
          user: true,
          product: {
            include: {
              images: true,
              comment: true,
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

      return NextResponse.json(FavoriteItemData);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Internal error get favorite Product." }),
        { status: 500 }
      );
    }
  }