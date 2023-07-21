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
      guaranteeprice,price,priceold,percentpromotion,isFeatured,isArchived,sizeId,colorId,specificationsId,salientfeaturesId,images} = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!heading) {
      return new NextResponse("heading is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("description is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }
    if (!headingrecommend) {
      return new NextResponse("headingrecommend is required", { status: 400 });
    }
    if (!infomationrecommend) {
      return new NextResponse("infomationrecommend is required", { status: 400 });
    }
    if (!warrantyrecommend) {
      return new NextResponse("warrantyrecommend is required", { status: 400 });
    }
    if (!vatrecommend) {
      return new NextResponse("vatrecommend is required", { status: 400 });
    }
    if (!promotionheading) {
      return new NextResponse("promotionheading is required", { status: 400 });
    }
    if (!promotiondescription) {
      return new NextResponse("promotiondescription is required", { status: 400 });
    }
    if (!guaranteeheading) {
      return new NextResponse("guaranteeheading is required", { status: 400 });
    }
    if (!guaranteedescription) {
      return new NextResponse("guaranteedescription is required", { status: 400 });
    }
    if (!guaranteeinfomation) {
      return new NextResponse("guaranteeinfomation is required", { status: 400 });
    }
    if (!guaranteeprice) {
      return new NextResponse("guaranteeprice is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }
    if (!priceold) {
      return new NextResponse("priceold is required", { status: 400 });
    }
    if (!percentpromotion) {
      return new NextResponse("percentpromotion is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("sizeId is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("colorId is required", { status: 400 });
    }
    if (!specificationsId) {
      return new NextResponse("specificationsId", { status: 403 });
    }
    if (!salientfeaturesId) {
      return new NextResponse("salientfeaturesId is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("images is required", { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,heading,description,categoryId,headingrecommend,
      infomationrecommend,warrantyrecommend,vatrecommend,promotionheading,
      promotiondescription,guaranteeheading,guaranteedescription,guaranteeinfomation,
      guaranteeprice,price,priceold,percentpromotion,isFeatured,isArchived,sizeId,colorId,specificationsId,salientfeaturesId,
      images:{
        createMany:{
          data: [
            ...images.map((image:{url: string}) => image)
          ]
        },
      },

        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_POST]', error);
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

    const product = await prismadb.product.findMany({
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
        images: true,
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
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
