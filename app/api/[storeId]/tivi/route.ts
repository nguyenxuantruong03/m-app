import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name,heading,description,categoryId,headingrecommend,
      infomationrecommend,warrantyrecommend,vatrecommend,promotionheading,
      promotiondescription,guaranteeheading,guaranteedescription,guaranteeinfomation,
      guaranteeprice,price,priceold,percentpromotion,isFeatured,isArchived,sizeId,colorId,specificationsId,salientfeaturesId,imagestivi} = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!heading) {
      return new NextResponse("Heading is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("CategoryId is required", { status: 400 });
    }
    if (!headingrecommend) {
      return new NextResponse("Headingrecommend is required", { status: 400 });
    }
    if (!infomationrecommend) {
      return new NextResponse("Infomationrecommend is required", { status: 400 });
    }
    if (!warrantyrecommend) {
      return new NextResponse("Warrantyrecommend is required", { status: 400 });
    }
    if (!vatrecommend) {
      return new NextResponse("Vatrecommend is required", { status: 400 });
    }
    if (!promotionheading) {
      return new NextResponse("Promotionheading is required", { status: 400 });
    }
    if (!promotiondescription) {
      return new NextResponse("Promotiondescription is required", { status: 400 });
    }
    if (!guaranteeheading) {
      return new NextResponse("Guaranteeheading is required", { status: 400 });
    }
    if (!guaranteedescription) {
      return new NextResponse("Guaranteedescription is required", { status: 400 });
    }
    if (!guaranteeinfomation) {
      return new NextResponse("Guaranteeinfomation is required", { status: 400 });
    }
    if (!guaranteeprice) {
      return new NextResponse("Guaranteeprice is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!priceold) {
      return new NextResponse("Priceold is required", { status: 400 });
    }
    if (!percentpromotion) {
      return new NextResponse("Percentpromotion is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("SizeId is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("ColorId is required", { status: 400 });
    }
    if (!specificationsId) {
      return new NextResponse("SpecificationsId", { status: 403 });
    }
    if (!salientfeaturesId) {
      return new NextResponse("SalientfeaturesId", { status: 403 });
    }
    if (!imagestivi || !imagestivi.length) {
      return new NextResponse("Images is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const ipads = await prismadb.tivi.create({
      data: {
        name,heading,description,categoryId,headingrecommend,
      infomationrecommend,warrantyrecommend,vatrecommend,promotionheading,
      promotiondescription,guaranteeheading,guaranteedescription,guaranteeinfomation,
      guaranteeprice,price,priceold,percentpromotion,isFeatured,isArchived,sizeId,colorId,specificationsId,salientfeaturesId,
      imagestivi:{
        createMany:{
          data: [
            ...imagestivi.map((image:{url: string}) => image)
          ]
        },
      },

        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(ipads);
  } catch (error) {
    console.log('[TIVI_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const specificationsId = searchParams.get('specificationsId') || undefined;
    const salientfeaturesId = searchParams.get('salientfeaturesId') || undefined;
    const isFeatured = searchParams.get('isFeatured');
    
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const ipads = await prismadb.tivi.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        specificationsId,
        salientfeaturesId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false ,
      },
      include:{
        imagestivi: true,
        category: true,
        color: true,
        size: true,
        specifications: true,
        salientfeatures: true,
      },
      orderBy:{
        createdAt: 'desc'
      }
    });
  
    return NextResponse.json(ipads);
  } catch (error) {
    console.log('[TIVI_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
