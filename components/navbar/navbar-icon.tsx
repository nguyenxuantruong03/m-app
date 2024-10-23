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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  route,
  staff,
  billboard,
  categories,
  parameter,
  product,
  order,
  user,
  checkout,
  setting,
  routeTitle,
  staffTitle,
  billboardTitle,
  categoryTitle,
  parameterTitle,
  productTitle,
  orderTitle,
  userTitle,
  checkoutTitle,
  settingTitle,
} from "./export-name-navbar";

const NavbarIcon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const storeId = Array.isArray(params.storeId)
    ? params.storeId[0]
    : params.storeId;

  const routes = route(storeId, pathname);
  const staffs = staff(storeId, pathname);
  const billboards = billboard(storeId, pathname);
  const category = categories(storeId, pathname);
  const parameters = parameter(storeId, pathname);
  const products = product(storeId, pathname);
  const orders = order(storeId, pathname);
  const users = user(storeId, pathname);
  const checkouts = checkout(storeId, pathname);
  const settings = setting(storeId, pathname);
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
                  {routeTitle.map((route) => route.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Tổng quan</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  title={route.label}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
                    route.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {route.icon}
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
                  {staffTitle.map((staff) => staff.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Nhân viên</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {staffs.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  title={route.label}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                    route.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {route.icon}
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
                  {billboardTitle.map((billboard) => billboard.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Ảnh quảng cáo</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {billboards.map((billboard) => (
                <Link
                  key={billboard.href}
                  href={billboard.href}
                  title={billboard.label}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                    billboard.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {billboard.icon}
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
                  {categoryTitle.map((category) => category.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Loại hàng</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {category.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  title={category.label}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                    category.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {category.icon}
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
                  {parameterTitle.map((parameter) => parameter.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Thông số</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {parameters.map((parameter) => (
                <Link
                  key={parameter.href}
                  href={parameter.href}
                  title={parameter.label}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                    parameter.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {parameter.icon}
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
                  {productTitle.map((product) => product.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Sản phẩm</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {products.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  title={product.label}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                    product.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {product.icon}
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
                  {orderTitle.map((order) => order.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Đơn hàng</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {orders.map((order) => (
                <Link
                  key={order.href}
                  href={order.href}
                  title={order.label}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
                    order.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {order.icon}
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
                  {userTitle.map((user) => user.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Người dùng</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {users.map((user) => (
                <Link
                  key={user.href}
                  href={user.href}
                  title={user.label}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                    user.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {user.icon}
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
                  {checkoutTitle.map((checkout) => checkout.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Thanh toán</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {checkouts.map((order) => (
                <Link
                  key={order.href}
                  href={order.href}
                  title={order.label}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                    order.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {order.icon}
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
                  {settingTitle.map((setting) => setting.icon)}
                </HoverCardTrigger>
                <HoverCardContent>Cài đặt</HoverCardContent>
              </HoverCard>
            </AccordionTrigger>
            <AccordionContent>
              {settings.map((setting) => (
                <Link
                  key={setting.href}
                  href={setting.href}
                  title={setting.label}
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary grid grid-rows-1",
                    setting.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {setting.icon}
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
