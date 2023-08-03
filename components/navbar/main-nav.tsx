"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = ({className,...props}:React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Tổng quan",
      active: pathname === `/${params.storeId}`,
    },
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
    {
      href: `/${params.storeId}/categories`,
      label: "Phân loại",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/categories1`,
      label: "Phân loại 1",
      active: pathname === `/${params.storeId}/categories1`,
    },
    {
      href: `/${params.storeId}/categories2`,
      label: "Phân loại 2",
      active: pathname === `/${params.storeId}/categories2`,
    },
    {
      href: `/${params.storeId}/categories3`,
      label: "Phân loại 3",
      active: pathname === `/${params.storeId}/categories3`,
    },
    {
      href: `/${params.storeId}/categories4`,
      label: "Phân loại 4",
      active: pathname === `/${params.storeId}/categories4`,
    },
    {
      href: `/${params.storeId}/categories5`,
      label: "Phân loại 5",
      active: pathname === `/${params.storeId}/categories5`,
    },
    {
      href: `/${params.storeId}/categories6`,
      label: "Phân loại 6",
      active: pathname === `/${params.storeId}/categories6`,
    },
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
    {
      href: `/${params.storeId}/specifications`,
      label: "Thông số kỹ thuật",
      active: pathname === `/${params.storeId}/specifications`,
    },
    {
      href: `/${params.storeId}/salientfeatures`,
      label: "Tính năng nổi bật",
      active: pathname === `/${params.storeId}/salientfeatures`,
    },
    {
      href: `/${params.storeId}/product`,
      label: "Sản phẩm",
      active: pathname === `/${params.storeId}/product`,
    },
    {
      href: `/${params.storeId}/product1`,
      label: "Sản phẩm1",
      active: pathname === `/${params.storeId}/product1`,
    },
    {
      href: `/${params.storeId}/product2`,
      label: "Sản phẩm2",
      active: pathname === `/${params.storeId}/product2`,
    },
    {
      href: `/${params.storeId}/product3`,
      label: "Sản phẩm3",
      active: pathname === `/${params.storeId}/product3`,
    },
    {
      href: `/${params.storeId}/product4`,
      label: "Sản phẩm4",
      active: pathname === `/${params.storeId}/product4`,
    },
    {
      href: `/${params.storeId}/product5`,
      label: "Sản phẩm5",
      active: pathname === `/${params.storeId}/product5`,
    },
    {
      href: `/${params.storeId}/product6`,
      label: "Sản phẩm6",
      active: pathname === `/${params.storeId}/product6`,
    },
    {
      href: `/${params.storeId}/tivi`,
      label: "Tivi",
      active: pathname === `/${params.storeId}/tivi`,
    },
    {
      href: `/${params.storeId}/watch`,
      label: "Đồng hồ thông minh",
      active: pathname === `/${params.storeId}/watch`,
    },
    {
      href: `/${params.storeId}/headphone`,
      label: "Tai nghe",
      active: pathname === `/${params.storeId}/headphone`,
    },
    {
      href: `/${params.storeId}/ipad`,
      label: "Ipad",
      active: pathname === `/${params.storeId}/ipad`,
    },
    {
      href: `/${params.storeId}/laptop`,
      label: "Laptop",
      active: pathname === `/${params.storeId}/laptop`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Khác",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Cài đặt",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
    {routes.map((route)=>(
        <Link
        key={route.href}
        href={route.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary",
        route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {route.label}
        </Link>
    ))}
    </nav>
  )
};

export default MainNav;
