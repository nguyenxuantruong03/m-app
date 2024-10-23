import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const product = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
      },
      select: {
        id: true,
        productType: true,
        images: true,
        isProductShowLive: true,
        isProductLivePin: true,
        heading: true,
        name: true,
        sold: true,
        timeSale: true,
        isSale: true,
        productdetail: {
          include: {
            category: true,
            color1: true,
            color2: true,
            color3: true,
            color4: true,
            color5: true,
            size1: true,
            size2: true,
            size3: true,
            size4: true,
            size5: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get product." }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, isProductShowLive, isProductLivePin } = body;

    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy id product!" }),
        { status: 403 }
      );
    }

     // Nếu isProductLivePin được đặt là true, cần cập nhật tất cả sản phẩm khác thành false
     if (isProductLivePin) {
      await prismadb.product.updateMany({
        where: {
          id: {
            not: id // Chỉ cập nhật các sản phẩm không phải là id hiện tại
          }
        },
        data: {
          isProductLivePin: false
        }
      });
    }

    const product = await prismadb.product.update({
      where: { id },
      data: {
        isProductShowLive,
        isProductLivePin,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post product." }),
      { status: 500 }
    );
  }
}
