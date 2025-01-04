import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

export async function GET(req: Request) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  const { searchParams } = new URL(req.url);
  const value = searchParams.get("value") || "";
  try {

    const searchProduct = await prismadb.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: value,
            },
          },
          {
            heading: {
              contains: value,
            },
          },
          {
            description: {
              contains: value,
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        heading: true,
        productType: true,
        images: {
          select: {
            url: true,
          },
        },
        productdetail: {
          select: {
            price1: true,
            percentpromotion1: true,
          },
        },
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
      take: 10,
    });

    return NextResponse.json(searchProduct);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.product.internalErrorGetProduct") }),
      { status: 500 }
    );
  }
}
