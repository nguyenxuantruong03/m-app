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
      href: `/${params.storeId}/billboardsdelivery`,
      label: "Ảnh quảng cáo giao hàng",
      active: pathname === `/${params.storeId}/billboardsdelivery`,
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
      label: "laptop",
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
