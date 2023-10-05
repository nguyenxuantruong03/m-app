"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const MainNav = ({className,...props}:React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Tổng quan",
      active: pathname === `/${params.storeId}`,
    },
  ];
  const billboards =[
    {
      href: `/${params.storeId}/billboards`,
      label: "Ảnh quảng cáo",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/billboardsmini`,
      label: "Ảnh quảng cáo nhỏ",
      active: pathname === `/${params.storeId}/billboardsmini`,
    },
    {
      href: `/${params.storeId}/billboardssale`,
      label: "Ảnh quảng cáo giảm giá",
      active: pathname === `/${params.storeId}/billboardssale`,
    },
  ]

  const categorys =[
    {
      href: `/${params.storeId}/categories`,
      label: "Điện thoại",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/categories1`,
      label: "Âm thanh",
      active: pathname === `/${params.storeId}/categories1`,
    },
    {
      href: `/${params.storeId}/categories2`,
      label: "Đồng hồ , máy ảnh",
      active: pathname === `/${params.storeId}/categories2`,
    },
    {
      href: `/${params.storeId}/categories3`,
      label: "Gia dụng,Smarthome",
      active: pathname === `/${params.storeId}/categories3`,
    },
    {
      href: `/${params.storeId}/categories4`,
      label: "Phụ kiện ",
      active: pathname === `/${params.storeId}/categories4`,
    },
    {
      href: `/${params.storeId}/categories5`,
      label: "PC,màn hình",
      active: pathname === `/${params.storeId}/categories5`,
    },
    {
      href: `/${params.storeId}/categories6`,
      label: "Tivi",
      active: pathname === `/${params.storeId}/categories6`,
    },
    {
      href: `/${params.storeId}/categories7`,
      label: "Ốp lưng",
      active: pathname === `/${params.storeId}/categories7`,
    },
    {
      href: `/${params.storeId}/categories8`,
      label: "Chuột, bàn phím",
      active: pathname === `/${params.storeId}/categories8`,
    },
    {
      href: `/${params.storeId}/categories9`,
      label: "Sim",
      active: pathname === `/${params.storeId}/categories9`,
    },
    {
      href: `/${params.storeId}/categories10`,
      label: "Laptop",
      active: pathname === `/${params.storeId}/categories10`,
    },
    {
      href: `/${params.storeId}/categories11`,
      label: "Hàng cũ",
      active: pathname === `/${params.storeId}/categories11`,
    },
  ]

  const parameters=[
    {
      href: `/${params.storeId}/size`,
      label: "Kích thước",
      active: pathname === `/${params.storeId}/size`,
    },
    {
      href: `/${params.storeId}/color`,
      label: "Màu sắc",
      active: pathname === `/${params.storeId}/color`,
    },
  ]

  const products = [
    {
        href: `/${params.storeId}/product`,
        label: "Điện thoại",
        active: pathname === `/${params.storeId}/product`,
      },
      {
        href: `/${params.storeId}/product1`,
        label: "Âm thanh",
        active: pathname === `/${params.storeId}/product1`,
      },
      {
        href: `/${params.storeId}/product2`,
        label: "Đồng hồ,máy ảnh",
        active: pathname === `/${params.storeId}/product2`,
      },
      {
        href: `/${params.storeId}/product3`,
        label: "Gia dụng,Smarthome",
        active: pathname === `/${params.storeId}/product3`,
      },
      {
        href: `/${params.storeId}/product4`,
        label: "Phụ kiện",
        active: pathname === `/${params.storeId}/product4`,
      },
      {
        href: `/${params.storeId}/product5`,
        label: "PC, màn hình",
        active: pathname === `/${params.storeId}/product5`,
      },
      {
        href: `/${params.storeId}/product6`,
        label: "Tivi",
        active: pathname === `/${params.storeId}/product6`,
      },
      {
        href: `/${params.storeId}/product7`,
        label: "Ốp lưng",
        active: pathname === `/${params.storeId}/product7`,
      },
      {
        href: `/${params.storeId}/product8`,
        label: "Chuột, bàn phím",
        active: pathname === `/${params.storeId}/product8`,
      },
      {
        href: `/${params.storeId}/product9`,
        label: "Sim",
        active: pathname === `/${params.storeId}/product9`,
      },
      {
        href: `/${params.storeId}/product10`,
        label: "Laptop",
        active: pathname === `/${params.storeId}/product10`,
      },
      {
        href: `/${params.storeId}/product11`,
        label: "Hàng cũ",
        active: pathname === `/${params.storeId}/product11`,
      },
  ]

  const orders= [
    {
      href: `/${params.storeId}/orders`,
      label: "Đơn hàng",
      active: pathname === `/${params.storeId}/orders`,
    },
    
  ]
  const settings =[
    {
      href: `/${params.storeId}/settings`,
      label: "Cài đặt",
      active: pathname === `/${params.storeId}/settings`,
    },
  ]
  return (
    <>
    {/* Overview */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 space-y-4",className)}>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Tổng quan</AccordionTrigger>
        <AccordionContent>
        {routes.map((route)=>(
            <Link
        key={route.href}
        href={route.href}
        className={cn("text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
        route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {route.label}
              </Link>
        ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </nav>
    {/* Billboard */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Billboard</AccordionTrigger>
        <AccordionContent>
        {billboards.map((billboard)=>(
        <Link
        key={billboard.href}
        href={billboard.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
        billboard.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {billboard.label}
        </Link>
    ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </nav>
    {/* Category */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Category</AccordionTrigger>
        <AccordionContent>
        {categorys.map((category)=>(
        <Link
        key={category.href}
        href={category.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
        category.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {category.label}
        </Link>
    ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </nav>
    {/* Parameter */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Parameter</AccordionTrigger>
        <AccordionContent>
        {parameters.map((parameter)=>(
        <Link
        key={parameter.href}
        href={parameter.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
        parameter.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {parameter.label}
        </Link>
    ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </nav>
    {/* Product */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product</AccordionTrigger>
        <AccordionContent>
        {products.map((product)=>(
        <Link
        key={product.href}
        href={product.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
        product.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {product.label}
        </Link>
    ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </nav>
    {/* Order */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Đơn hàng</AccordionTrigger>
        <AccordionContent>
        {orders.map((order)=>(
          <Link
              key={order.href}
              href={order.href}
              className={cn("text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
              order.active ? 'text-black dark:text-white' : 'text-muted-foreground'
              )}
          >
        {order.label}
          </Link>
        ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </nav>
     {/* Setting */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
     <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Cài đặt</AccordionTrigger>
        <AccordionContent>
        {settings.map((setting)=>(
            <Link
         key={setting.href}
         href={setting.href}
         className={cn("text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
         setting.active ? 'text-black dark:text-white' : 'text-muted-foreground'
         )}
         >
         {setting.label}
          </Link>
        ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </nav>
    </>
  )
};

export default MainNav;
