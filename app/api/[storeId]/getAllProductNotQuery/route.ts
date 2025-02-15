import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    const products = await prismadb.product.findMany({
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
        timeSaleStart: true,
        timeSaleEnd: true,
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

    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.product.internalErrorGetProduct") }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { id, isProductShowLive, isProductLivePin } = body;

    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.product.productIdNotFound") }),
        { status: 403 }
      );
    }

    // Nếu isProductLivePin được đặt là true, cần cập nhật tất cả sản phẩm khác thành false
    if (isProductLivePin) {
      await prismadb.product.updateMany({
        where: {
          id: {
            not: id, // Chỉ cập nhật các sản phẩm không phải là id hiện tại
          },
        },
        data: {
          isProductLivePin: false,
        },
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
      JSON.stringify({ error: t("toastError.product.internalErrorGetProduct") }),
      { status: 500 }
    );
  }
}
