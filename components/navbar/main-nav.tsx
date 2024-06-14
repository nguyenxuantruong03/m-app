"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Tổng quan",
      active: pathname === `/${params.storeId}`,
    },
  ];
  const datastatistics = [
    {
      href: `/${params.storeId}/datastatistics`,
      label: "Thống kê dữ liệu",
      active: pathname === `/${params.storeId}/datastatistics`,
    },
  ];
  const staff = [
    {
      href: `/${params.storeId}/attendancestaff`,
      label: "Nhân viên điểm danh",
      active: pathname === `/${params.storeId}/attendancestaff`,
    },
    {
      href: `/${params.storeId}/sentmailuser`,
      label: "Gửi Mail",
      active: pathname === `/${params.storeId}/sentmailuser`,
    },
    {
      href: `/${params.storeId}/manageattendance`,
      label: "Quản lý điểm danh",
      active: pathname === `/${params.storeId}/manageattendance`,
    },
    {
      href: `/${params.storeId}/salarystaff`,
      label: "Quản lý lương nhân viên",
      active: pathname === `/${params.storeId}/salarystaff`,
    },
    {
      href: `/${params.storeId}/wheelSpin`,
      label: "Quản lý xu, vòng quay",
      active: pathname === `/${params.storeId}/wheelSpin`,
    },
    {
      href: `/${params.storeId}/comment`,
      label: "Quản lý đánh giá",
      active: pathname === `/${params.storeId}/comment`,
    },
  ];
  const billboards = [
    {
      href: `/${params.storeId}/billboards`,
      label: "Ảnh quảng cáo",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/billboardstime`,
      label: "Thời gian hiển thị",
      active: pathname === `/${params.storeId}/billboardstime`,
    },
  ];

  const categorys = [
    {
      href: `/${params.storeId}/categories`,
      label: "Pin",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/categories1`,
      label: "Quạt",
      active: pathname === `/${params.storeId}/categories1`,
    },
    {
      href: `/${params.storeId}/categories2`,
      label: "Ống nhựa , Ống lưới xanh",
      active: pathname === `/${params.storeId}/categories2`,
    },
    {
      href: `/${params.storeId}/categories3`,
      label: "Dây điện",
      active: pathname === `/${params.storeId}/categories3`,
    },
    {
      href: `/${params.storeId}/categories4`,
      label: "Đá cắt",
      active: pathname === `/${params.storeId}/categories4`,
    },
    {
      href: `/${params.storeId}/categories5`,
      label: "Ổ khóa",
      active: pathname === `/${params.storeId}/categories5`,
    },
    {
      href: `/${params.storeId}/categories6`,
      label: "Keo",
      active: pathname === `/${params.storeId}/categories6`,
    },
    {
      href: `/${params.storeId}/categories7`,
      label: "Ổ cắm, mặt ổ cắm",
      active: pathname === `/${params.storeId}/categories7`,
    },
    {
      href: `/${params.storeId}/categories8`,
      label: "Sơn",
      active: pathname === `/${params.storeId}/categories8`,
    },
    {
      href: `/${params.storeId}/categories9`,
      label: "Vật liệu nhà tắm",
      active: pathname === `/${params.storeId}/categories9`,
    },
    {
      href: `/${params.storeId}/categories10`,
      label: "Bóng đèn",
      active: pathname === `/${params.storeId}/categories10`,
    },
    {
      href: `/${params.storeId}/categories11`,
      label: "Đồ thường dùng",
      active: pathname === `/${params.storeId}/categories11`,
    },
  ];

  const parameters = [
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
      href: `/${params.storeId}/productdetail`,
      label: "Chi tiết sản phẩm",
      active: pathname === `/${params.storeId}/productdetail`,
    },
  ];

  const products = [
    {
      href: `/${params.storeId}/product`,
      label: "Pin",
      active: pathname === `/${params.storeId}/product`,
    },
    {
      href: `/${params.storeId}/product1`,
      label: "Quạt",
      active: pathname === `/${params.storeId}/product1`,
    },
    {
      href: `/${params.storeId}/product2`,
      label: "Ống nhựa, Ống lưới xanh",
      active: pathname === `/${params.storeId}/product2`,
    },
    {
      href: `/${params.storeId}/product3`,
      label: "Dây điện",
      active: pathname === `/${params.storeId}/product3`,
    },
    {
      href: `/${params.storeId}/product4`,
      label: "Đá cắt",
      active: pathname === `/${params.storeId}/product4`,
    },
    {
      href: `/${params.storeId}/product5`,
      label: "Ổ khóa",
      active: pathname === `/${params.storeId}/product5`,
    },
    {
      href: `/${params.storeId}/product6`,
      label: "Keo",
      active: pathname === `/${params.storeId}/product6`,
    },
    {
      href: `/${params.storeId}/product7`,
      label: "Ổ cắm, mặt ổ cắm",
      active: pathname === `/${params.storeId}/product7`,
    },
    {
      href: `/${params.storeId}/product8`,
      label: "Sơn",
      active: pathname === `/${params.storeId}/product8`,
    },
    {
      href: `/${params.storeId}/product9`,
      label: "Vật liệu nhà tắm",
      active: pathname === `/${params.storeId}/product9`,
    },
    {
      href: `/${params.storeId}/product10`,
      label: "Bóng đèn",
      active: pathname === `/${params.storeId}/product10`,
    },
    {
      href: `/${params.storeId}/product11`,
      label: "Đồ thường dùng",
      active: pathname === `/${params.storeId}/product11`,
    },
  ];

  const orders = [
    {
      href: `/${params.storeId}/orders`,
      label: "Đơn hàng",
      active: pathname === `/${params.storeId}/orders`,
    },
  ];

  const user = [
    {
      href: `/${params.storeId}/settingusers`,
      label: "Người dùng",
      active: pathname === `/${params.storeId}/settingusers`,
    },
    {
      href: `/${params.storeId}/managestaff`,
      label: "Nhân viên",
      active: pathname === `/${params.storeId}/managestaff`,
    },
  ];

  const checkouts = [
    {
      href: `/${params.storeId}/coupon`,
      label: "Mã giảm giá",
      active: pathname === `/${params.storeId}/coupon`,
    },
    {
      href: `/${params.storeId}/taxrate`,
      label: "Thuế",
      active: pathname === `/${params.storeId}/taxrate`,
    },
    {
      href: `/${params.storeId}/shippingrates`,
      label: "Phí giao hàng",
      active: pathname === `/${params.storeId}/shippingrates`,
    },
  ];

  const settings = [
    {
      href: `/${params.storeId}/settings`,
      label: "Cài đặt",
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}/system`,
      label: "Hệ thống",
      active: pathname === `/${params.storeId}/system`,
    },
  ];
  return (
    <>
      {/* Overview */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Tổng quan</AccordionTrigger>
          <AccordionContent>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  route.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Data statistics */}
        <AccordionItem value="item-2">
          <AccordionTrigger>Thống kê dữ liệu</AccordionTrigger>
          <AccordionContent>
            {datastatistics.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  route.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Staff Attendance */}
        <AccordionItem value="item-3">
          <AccordionTrigger>Nhân viên</AccordionTrigger>
          <AccordionContent>
            {staff.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  route.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Billboard */}
        <AccordionItem value="item-4">
          <AccordionTrigger>Ảnh quảng cáo</AccordionTrigger>
          <AccordionContent>
            {billboards.map((billboard) => (
              <Link
                key={billboard.href}
                href={billboard.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  billboard.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {billboard.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Category */}
        <AccordionItem value="item-5">
          <AccordionTrigger>Loại hàng</AccordionTrigger>
          <AccordionContent>
            {categorys.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  category.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {category.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Parameter */}
        <AccordionItem value="item-6">
          <AccordionTrigger>Thông số</AccordionTrigger>
          <AccordionContent>
            {parameters.map((parameter) => (
              <Link
                key={parameter.href}
                href={parameter.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  parameter.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {parameter.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Product */}
        <AccordionItem value="item-7">
          <AccordionTrigger>Sản phẩm</AccordionTrigger>
          <AccordionContent>
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  product.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {product.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Order */}
        <AccordionItem value="item-8">
          <AccordionTrigger>Đơn hàng</AccordionTrigger>
          <AccordionContent>
            {orders.map((order) => (
              <Link
                key={order.href}
                href={order.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
                  order.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {order.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Người dùng */}
        <AccordionItem value="item-9">
          <AccordionTrigger>Người dùng</AccordionTrigger>
          <AccordionContent>
            {user.map((order) => (
              <Link
                key={order.href}
                href={order.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  order.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {order.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/*Thanh toán online */}
        <AccordionItem value="item-10">
          <AccordionTrigger>Thanh toán</AccordionTrigger>
          <AccordionContent>
            {checkouts.map((order) => (
              <Link
                key={order.href}
                href={order.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  order.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {order.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Setting */}
        <AccordionItem value="item-11">
          <AccordionTrigger>Cài đặt</AccordionTrigger>
          <AccordionContent>
            {settings.map((setting) => (
              <Link
                key={setting.href}
                href={setting.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
                  setting.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {setting.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default MainNav;
