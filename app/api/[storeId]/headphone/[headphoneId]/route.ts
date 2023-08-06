import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { headphoneId: string } }
) {
  try {
    if (!params.headphoneId) {
      return new NextResponse("Headphone id is required", { status: 400 });
    }

    const ipads = await prismadb.headphone.findUnique({
      where: {
        id: params.headphoneId
      },
      include:{
        imagesheadphone: true,
        category: true,
        size: true,
        color: true,
        specifications: true,
        salientfeatures: true
      }
    });
  
    return NextResponse.json(ipads);
  } catch (error) {
    console.log('[HEADPHONE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { headphoneId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.headphoneId) {
      return new NextResponse("Headphone id is required", { status: 400 });
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

    const product = await prismadb.headphone.delete({
      where: {
        id: params.headphoneId,
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[HEADPHONE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { headphoneId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { name,heading,description,categoryId,promotionheading,
      promotiondescription,guaranteeheading,guaranteedescription,guaranteeinfomation,
      guaranteeprice,price,priceold,percentpromotion,isFeatured,isArchived,sizeId,colorId,specificationsId,salientfeaturesId,imagesheadphone} = body;

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
    if (!imagesheadphone || !imagesheadphone.length) {
      return new NextResponse("Images is required", { status: 400 });
    }

    if (!params.headphoneId) {
      return new NextResponse("Headphone id is required", { status: 400 });
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

    await prismadb.headphone.update({
      where:{
        id: params.headphoneId,
      },
      data:{
        name,heading,description,categoryId,promotionheading,
        promotiondescription,guaranteeheading,guaranteedescription,guaranteeinfomation,
        guaranteeprice,price,priceold,percentpromotion,sizeId,colorId,specificationsId,salientfeaturesId,
        imagesheadphone:{
          deleteMany:{}
        },
        isFeatured,
        isArchived,
      }
    })

    const product = await prismadb.headphone.update({
      where: {
        id: params.headphoneId,
      },
      data: {
        imagesheadphone:{
          createMany:{
            data:[
              ...imagesheadphone.map((image:{url: string})=> image)
            ]
          }
        }
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[HEADPHONE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
