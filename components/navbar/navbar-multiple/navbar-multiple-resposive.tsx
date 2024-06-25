"use client";
import Link from "next/link";
import {
  route,
  datastatistic,
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
  datastatisticTitle,
  billboardTitle,
  categoryTitle,
  parameterTitle,
  productTitle,
  orderTitle,
  userTitle,
  checkoutTitle,
  settingTitle,
} from "../export-name-navbar";
import { useParams, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NavbarMultipleResponsive = () => {
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | null>(
    null
  );
  const params = useParams();
  const pathname = usePathname();
  const storeId = Array.isArray(params.storeId)
    ? params.storeId[0]
    : params.storeId;

  const handleAccordionToggle = (value: string | null) => {
    setActiveAccordionItem(activeAccordionItem === value ? null : value);
  };

  const routes = route(storeId, pathname);
  const datastatistics = datastatistic(storeId, pathname);
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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="text-gray-400 dark:text-slate-900"
            onClick={() => handleAccordionToggle("item-1")}
          >
            {routeTitle.map((route) => (
              <>{route.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  route.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {route.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {route.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Data Statistic */}
        <AccordionItem value="item-2">
          <AccordionTrigger
            className="text-gray-400 dark:text-slate-900"
            onClick={() => handleAccordionToggle("item-2")}
          >
            {datastatisticTitle.map((datastatistic) => (
              <>{datastatistic.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {datastatistics.map((datastatistic) => (
              <Link
                key={datastatistic.href}
                href={datastatistic.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  datastatistic.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {datastatistic.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {datastatistic.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Nhân viên */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-gray-400 dark:text-slate-900">
            {staffTitle.map((staff) => (
              <>{staff.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {staffs.map((staff) => (
              <Link
                key={staff.href}
                href={staff.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  staff.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {staff.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {staff.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Quảng cáo */}
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-gray-400 dark:text-slate-900">
            {billboardTitle.map((billboard) => (
              <>{billboard.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {billboards.map((billboard) => (
              <Link
                key={billboard.href}
                href={billboard.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  billboard.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {billboard.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {billboard.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Loại hàng */}
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-gray-400 dark:text-slate-900">
            {categoryTitle.map((categories) => (
              <>{categories.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {category.map((categories) => (
              <Link
                key={categories.href}
                href={categories.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  categories.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {categories.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {categories.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Thông số */}
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-gray-400 dark:text-slate-900">
            {parameterTitle.map((parameter) => (
              <>{parameter.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {parameters.map((parameter) => (
              <Link
                key={parameter.href}
                href={parameter.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  parameter.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {parameter.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {parameter.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Sản phẩm */}
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-gray-400 dark:text-slate-900">
            {productTitle.map((product) => (
              <>{product.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  product.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {product.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {product.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Đơn hàng */}
        <AccordionItem value="item-8">
          <AccordionTrigger className="text-gray-400 dark:text-slate-900">
            {orderTitle.map((order) => (
              <>{order.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {orders.map((order) => (
              <Link
                key={order.href}
                href={order.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  order.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {order.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {order.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Người dùng */}
        <AccordionItem value="item-9">
          <AccordionTrigger className="text-gray-400 dark:text-slate-900">
            {userTitle.map((user) => (
              <>{user.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {users.map((user) => (
              <Link
                key={user.href}
                href={user.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  user.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {user.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {user.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Thanh toán */}
        <AccordionItem value="item-10">
          <AccordionTrigger className="text-gray-400 dark:text-slate-900">
            {checkoutTitle.map((checkout) => (
              <>{checkout.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {checkouts.map((checkout) => (
              <Link
                key={checkout.href}
                href={checkout.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  checkout.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {checkout.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {checkout.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Cài đặt */}
        <AccordionItem value="item-11">
          <AccordionTrigger className="text-gray-400 dark:text-slate-900">
            {settingTitle.map((setting) => (
              <>{setting.mainicon}</>
            ))}
          </AccordionTrigger>
          <AccordionContent>
            {settings.map((setting) => (
              <Link
                key={setting.href}
                href={setting.href}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary grid grid-rows-1 mb-2",
                  setting.active
                    ? "text-gray-400 dark:text-slate-900"
                    : "text-red-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                    {setting.icon}
                  </span>
                  <div className="ml-4">
                    <p className="text-base font-medium text-slate-900">
                      {setting.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default NavbarMultipleResponsive;
