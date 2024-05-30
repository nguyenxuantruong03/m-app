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
import {
  AlignJustify,
  AppWindow,
  AppWindowMac,
  AreaChart,
  Banknote,
  Boxes,
  Cable,
  CalendarDays,
  CalendarRange,
  CircleEllipsis,
  Construction,
  Contact,
  Container,
  Fan,
  Gauge,
  HandCoins,
  Landmark,
  Layers3,
  Lightbulb,
  LineChart,
  LockKeyhole,
  Mail,
  MessageSquareMore,
  Package2,
  PackageOpen,
  PaintRoller,
  Palette,
  PencilRuler,
  PlugZap,
  Receipt,
  ReceiptText,
  ServerCog,
  Settings,
  ShowerHead,
  TicketPercent,
  UserRound,
  Users,
  UsersRound,
  Settings2,
  AlignEndHorizontal,
  Droplet,
  Webhook,
  Battery,
  Pipette,
} from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const NavbarIcon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: <Gauge className="size-5" />,
      title: "Tổng quan",
      active: pathname === `/${params.storeId}`,
    },
  ];
  const datastatistics = [
    {
      href: `/${params.storeId}/datastatistics`,
      label: <AreaChart className="size-5" />,
      title: "Thống kê dữ liệu",
      active: pathname === `/${params.storeId}/datastatistics`,
    },
  ];
  const staff = [
    {
      href: `/${params.storeId}/attendancestaff`,
      label: <CalendarDays className="size-5" />,
      title: "Nhân viên điểm danh",
      active: pathname === `/${params.storeId}/attendancestaff`,
    },
    {
      href: `/${params.storeId}/sentmailuser`,
      label: <Mail className="size-5" />,
      title: "Gửi Mail",
      active: pathname === `/${params.storeId}/sentmailuser`,
    },
    {
      href: `/${params.storeId}/manageattendance`,
      label: <CalendarRange className="size-5" />,
      title: "Quản lý điểm danh",
      active: pathname === `/${params.storeId}/manageattendance`,
    },
    {
      href: `/${params.storeId}/salarystaff`,
      label: <Landmark className="size-5" />,
      title: "Quản lý lương nhân viên",
      active: pathname === `/${params.storeId}/salarystaff`,
    },
    {
      href: `/${params.storeId}/wheelSpin`,
      label: <HandCoins className="size-5" />,
      title: "Quản lý xu, vòng quay",
      active: pathname === `/${params.storeId}/wheelSpin`,
    },
    {
      href: `/${params.storeId}/comment`,
      label: <MessageSquareMore className="size-5" />,
      title: "Quản lý đánh giá",
      active: pathname === `/${params.storeId}/comment`,
    },
  ];
  const billboards = [
    {
      href: `/${params.storeId}/billboards`,
      label: <AppWindowMac className="size-5" />,
      title: "Ảnh quảng cáo",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/billboardstime`,
      label: <AppWindow className="size-5" />,
      title: "Thời gian hiển thị",
      active: pathname === `/${params.storeId}/billboardstime`,
    },
  ];

  const categorys = [
    {
      href: `/${params.storeId}/categories`,
      label: <Battery className="size-5" />,
      title: "Pin",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/categories1`,
      label: <Fan className="size-5" />,
      title: "Quạt",
      active: pathname === `/${params.storeId}/categories1`,
    },
    {
      href: `/${params.storeId}/categories2`,
      label: <Droplet className="size-5" />,
      title: "Ống nhựa, Ống lưới xanh",
      active: pathname === `/${params.storeId}/categories2`,
    },
    {
      href: `/${params.storeId}/categories3`,
      label: <Cable className="size-5" />,
      title: "Dây điện",
      active: pathname === `/${params.storeId}/categories3`,
    },
    {
      href: `/${params.storeId}/categories4`,
      label: <Webhook className="size-5" />,
      title: "Đá cắt",
      active: pathname === `/${params.storeId}/categories4`,
    },
    {
      href: `/${params.storeId}/categories5`,
      label: <LockKeyhole className="size-5" />,
      title: "Ổ khóa",
      active: pathname === `/${params.storeId}/categories5`,
    },
    {
      href: `/${params.storeId}/categories6`,
      label: <Pipette className="size-5" />,
      title: "Keo",
      active: pathname === `/${params.storeId}/categories6`,
    },
    {
      href: `/${params.storeId}/categories7`,
      label: <PlugZap className="size-5" />,
      title: "Ổ cắm, mặt ổ cắm",
      active: pathname === `/${params.storeId}/categories7`,
    },
    {
      href: `/${params.storeId}/categories8`,
      label: <PaintRoller className="size-5" />,
      title: "Sơn",
      active: pathname === `/${params.storeId}/categories8`,
    },
    {
      href: `/${params.storeId}/categories9`,
      label: <ShowerHead className="size-5" />,
      title: "Vật liệu nhà tắm",
      active: pathname === `/${params.storeId}/categories9`,
    },
    {
      href: `/${params.storeId}/categories10`,
      label: <Lightbulb className="size-5" />,
      title: "Bóng đèn",
      active: pathname === `/${params.storeId}/categories10`,
    },
    {
      href: `/${params.storeId}/categories11`,
      label: <CircleEllipsis className="size-5" />,
      title: "Đồ thường dùng",
      active: pathname === `/${params.storeId}/categories11`,
    },
  ];

  const parameters = [
    {
      href: `/${params.storeId}/size`,
      label: <PencilRuler className="size-5" />,
      title: "Kích thước",
      active: pathname === `/${params.storeId}/size`,
    },
    {
      href: `/${params.storeId}/color`,
      label: <Palette className="size-5" />,
      title: "Màu sắc",
      active: pathname === `/${params.storeId}/color`,
    },
    {
      href: `/${params.storeId}/productdetail`,
      label: <Boxes className="size-5" />,
      title: "Chi tiết sản phẩm",
      active: pathname === `/${params.storeId}/productdetail`,
    },
  ];

  const products = [
    {
      href: `/${params.storeId}/product`,
      label: <Battery className="size-5" />,
      title: "Pin",
      active: pathname === `/${params.storeId}/product`,
    },
    {
      href: `/${params.storeId}/product1`,
      label: <Fan className="size-5" />,
      title: "Quạt",
      active: pathname === `/${params.storeId}/product1`,
    },
    {
      href: `/${params.storeId}/product2`,
      label: <Droplet className="size-5" />,
      title: "Ống nhựa, Ống lưới xanh",
      active: pathname === `/${params.storeId}/product2`,
    },
    {
      href: `/${params.storeId}/product3`,
      label: <Cable className="size-5" />,
      title: "Dây điện",
      active: pathname === `/${params.storeId}/product3`,
    },
    {
      href: `/${params.storeId}/product4`,
      label: <Webhook className="size-5" />,
      title: "Đá cắt",
      active: pathname === `/${params.storeId}/product4`,
    },
    {
      href: `/${params.storeId}/product5`,
      label: <LockKeyhole className="size-5" />,
      title: "Ổ khóa",
      active: pathname === `/${params.storeId}/product5`,
    },
    {
      href: `/${params.storeId}/product6`,
      label: <Pipette className="size-5" />,
      title: "Keo",
      active: pathname === `/${params.storeId}/product6`,
    },
    {
      href: `/${params.storeId}/product7`,
      label: <PlugZap className="size-5" />,
      title: "Ổ cắm, mặt ổ cắm",
      active: pathname === `/${params.storeId}/product7`,
    },
    {
      href: `/${params.storeId}/product8`,
      label: <PaintRoller className="size-5" />,
      title: "Sơn",
      active: pathname === `/${params.storeId}/product8`,
    },
    {
      href: `/${params.storeId}/product9`,
      label: <ShowerHead className="size-5" />,
      title: "Vật liệu nhà tắm",
      active: pathname === `/${params.storeId}/product9`,
    },
    {
      href: `/${params.storeId}/product10`,
      label: <Lightbulb className="size-5" />,
      title: "Bóng đèn",
      active: pathname === `/${params.storeId}/product10`,
    },
    {
      href: `/${params.storeId}/product11`,
      label: <CircleEllipsis className="size-5" />,
      title: "Đồ thường dùng",
      active: pathname === `/${params.storeId}/product11`,
    },
  ];

  const orders = [
    {
      href: `/${params.storeId}/orders`,
      label: <PackageOpen className="size-5" />,
      title: "Đơn hàng",
      active: pathname === `/${params.storeId}/orders`,
    },
  ];

  const users = [
    {
      href: `/${params.storeId}/settingusers`,
      label: <UsersRound className="size-5" />,
      title: "Người dùng",
      active: pathname === `/${params.storeId}/settingusers`,
    },
    {
      href: `/${params.storeId}/managestaff`,
      label: <UserRound className="size-5" />,
      title: "Nhân viên",
      active: pathname === `/${params.storeId}/managestaff`,
    },
  ];

  const checkouts = [
    {
      href: `/${params.storeId}/coupon`,
      label: <TicketPercent className="size-5" />,
      title: "Mã giảm giá",
      active: pathname === `/${params.storeId}/coupon`,
    },
    {
      href: `/${params.storeId}/taxrate`,
      label: <Receipt className="size-5" />,
      title: "Thuế",
      active: pathname === `/${params.storeId}/taxrate`,
    },
    {
      href: `/${params.storeId}/shippingrates`,
      label: <ReceiptText className="size-5" />,
      title: "Phí giao hàng",
      active: pathname === `/${params.storeId}/shippingrates`,
    },
  ];

  const settings = [
    {
      href: `/${params.storeId}/settings`,
      label: <Settings className="size-5" />,
      title: "Cài đặt",
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}/system`,
      label: <ServerCog className="size-5" />,
      title: "Hệ thống",
      active: pathname === `/${params.storeId}/system`,
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
            <AccordionTrigger className="accordion-trigger">
              <HoverCard>
                <HoverCardTrigger>
                  <AlignJustify className="size-5" />{" "}
                </HoverCardTrigger>
                <HoverCardContent>Tổng quan</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  title={route.title}
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
            <AccordionTrigger className="accordion-trigger">
              {" "}
              <HoverCard>
                <HoverCardTrigger>
                  <LineChart className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Thống kê dữ liệu</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {datastatistics.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  title={route.title}
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
            <AccordionTrigger className="accordion-trigger">
              <HoverCard>
                <HoverCardTrigger>
                  {" "}
                  <Users className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Nhân viên</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {staff.map((route) => (
                <Link
                  key={route.href}
                  title={route.title}
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
        </Accordion>
      </nav>
      {/* Billboard */}
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="accordion-trigger">
              <HoverCard>
                <HoverCardTrigger>
                  {" "}
                  <Construction className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Ảnh quảng cáo</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {billboards.map((billboard) => (
                <Link
                  key={billboard.href}
                  href={billboard.href}
                  title={billboard.title}
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
            <AccordionTrigger className="accordion-trigger">
              <HoverCard>
                <HoverCardTrigger>
                  {" "}
                  <Layers3 className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Loại hàng</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {categorys.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  title={category.title}
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
            <AccordionTrigger className="accordion-trigger">
              <HoverCard>
                <HoverCardTrigger>
                  {" "}
                  <AlignEndHorizontal className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Thông số</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {parameters.map((parameter) => (
                <Link
                  key={parameter.href}
                  href={parameter.href}
                  title={parameter.title}
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
            <AccordionTrigger className="accordion-trigger">
              {" "}
              <HoverCard>
                <HoverCardTrigger>
                  {" "}
                  <Package2 className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Sản phẩm</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {products.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  title={product.title}
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
            <AccordionTrigger className="accordion-trigger">
              <HoverCard>
                <HoverCardTrigger>
                  {" "}
                  <Container className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Đơn hàng</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {orders.map((order) => (
                <Link
                  key={order.href}
                  href={order.href}
                  title={order.title}
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
            <AccordionTrigger className="accordion-trigger">
              <HoverCard>
                <HoverCardTrigger>
                  {" "}
                  <Contact className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Người dùng</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {users.map((user) => (
                <Link
                  key={user.href}
                  href={user.href}
                  title={user.title}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                    user.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {user.label}
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
            <AccordionTrigger className="accordion-trigger">
              <HoverCard>
                <HoverCardTrigger>
                  {" "}
                  <Banknote className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Thanh toán</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {checkouts.map((order) => (
                <Link
                  key={order.href}
                  href={order.href}
                  title={order.title}
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
            <AccordionTrigger className="accordion-trigger">
              <HoverCard>
                <HoverCardTrigger>
                  <Settings2 className="size-5" />
                </HoverCardTrigger>
                <HoverCardContent>Cài đặt</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {settings.map((setting) => (
                <Link
                  key={setting.href}
                  href={setting.href}
                  title={setting.title}
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

export default NavbarIcon;
