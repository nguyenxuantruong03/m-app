import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds,pricesales } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product1 = await prismadb.product1.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product2 = await prismadb.product2.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product3 = await prismadb.product3.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product4 = await prismadb.product4.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product5 = await prismadb.product5.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product6 = await prismadb.product6.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product7 = await prismadb.product7.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product8 = await prismadb.product8.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product9 = await prismadb.product9.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product10 = await prismadb.product10.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const product11 = await prismadb.product11.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const laptop = await prismadb.laptop.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const ipad = await prismadb.ipad.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const headphone = await prismadb.headphone.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const tivi = await prismadb.tivi.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const watch = await prismadb.watch.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  const mouse = await prismadb.mouse.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  product1.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  product2.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });
  product3.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  product4.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  product5.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });
  product6.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  product7.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  product8.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });
  product9.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  product10.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  product11.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });
  laptop.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  ipad.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  headphone.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });
  watch.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  tivi.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  mouse.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'VND',
        
        product_data: {
          name: product.name,
        },
        unit_amount: pricesales 
      }
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItem: {
        create: productIds.map((productId: string,product1Id:string,product2Id:string,product3Id:string,product4Id:string,product5Id:string,product6Id:string,product7Id:string,product8Id:string,product9Id:string,product10Id:string,product11Id:string,ipadId:string,laptopId:string,headphoneId:string,tiviId:string,watchId:string,mouseId:string) => ({
          product: {
            connect: {
              id: productId
            }
          },
          product1: {
            connect: {
              id: String(product1Id)
            }
          },
          product2: {
            connect: {
              id: String(product2Id)
            }
          },product3: {
            connect: {
              id: product3Id
            }
          },product4: {
            connect: {
              id: product4Id
            }
          },product5: {
            connect: {
              id: product5Id
            }
          },product6: {
            connect: {
              id: product6Id
            }
          },product7: {
            connect: {
              id: product7Id
            }
          },product8: {
            connect: {
              id: product8Id
            }
          },product9: {
            connect: {
              id: product9Id
            }
          },product10: {
            connect: {
              id: product10Id
            }
          },product11: {
            connect: {
              id: product11Id
            }
          },mouse: {
            connect: {
              id: mouseId
            }
          },laptop: {
            connect: {
              id: laptopId
            }
          },tivi: {
            connect: {
              id: tiviId
            }
          },watch: {
            connect: {
              id: watchId
            }
          },Ipad: {
            connect: {
              id: ipadId
            }
          },headphone: {
            connect: {
              id: headphoneId
            }
          }
        })),
        
      }
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    },
  });

  return NextResponse.json({ url: session.url }, {
    headers: corsHeaders
  });
};