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
  ];
  const billboards = [
    {
      href: `/${params.storeId}/billboards`,
      label: "Ảnh quảng cáo",
      active: pathname === `/${params.storeId}/billboards`,
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
    {
      href: `/${params.storeId}/manageattendance`,
      label: "Điểm danh",
      active: pathname === `/${params.storeId}/manageattendance`,
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
  ];
  return (
    <>
      {/* Overview */}
      <nav
        className={cn(
          "flex items-center space-x-4 lg:space-x-6 space-y-4",
          className
        )}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Tổng quan</AccordionTrigger>
            <AccordionContent>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
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
        </Accordion>
      </nav>
      {/* Data statistics */}
      <nav
        className={cn(
          "flex items-center space-x-4 lg:space-x-6 space-y-4",
          className
        )}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Thống kê dữ liệu</AccordionTrigger>
            <AccordionContent>
              {datastatistics.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
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
        </Accordion>
      </nav>
      {/* Staff Attendance */}
      <nav
        className={cn(
          "flex items-center space-x-4 lg:space-x-6 space-y-4",
          className
        )}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Nhân viên</AccordionTrigger>
            <AccordionContent>
              {staff.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
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
        </Accordion>
      </nav>
      {/* Billboard */}
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
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
        </Accordion>
      </nav>
      {/* Category */}
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
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
        </Accordion>
      </nav>
      {/* Parameter */}
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
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
        </Accordion>
      </nav>
      {/* Product */}
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
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
        </Accordion>
      </nav>
      {/* Order */}
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
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
        </Accordion>
      </nav>
      {/* Người dùng */}
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
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
        </Accordion>
      </nav>
      {/*Thanh toán online */}
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
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
        </Accordion>
      </nav>
      {/* Setting */}
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
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
      </nav>
    </>
  );
};

export default MainNav;
