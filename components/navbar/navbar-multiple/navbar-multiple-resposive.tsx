"use client";
import Link from "next/link";
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
            className="text-gray-400"
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
                  "p-2 grid grid-rows-1 mb-2"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={cn(
                      "flex-shrink-0 h-6 w-6",
                      route.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
                    {route.icon}
                  </span>
                  <div className="ml-4">
                    <p
                      className={cn(
                        "text-base font-medium",
                        route.active ? "text-sky-500" : "text-gray-500"
                      )}
                    >
                      {route.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        {/* Nhân viên */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-gray-400">
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
                "p-2 grid grid-rows-1 mb-2"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    staff.active ? "text-sky-500" : "text-gray-500"
                  )}
                >
                  {staff.icon}
                </span>
                <div className="ml-4">
                  <p
                    className={cn(
                      "text-base font-medium",
                      staff.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
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
          <AccordionTrigger className="text-gray-400">
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
                "p-2 grid grid-rows-1 mb-2"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    billboard.active ? "text-sky-500" : "text-gray-500"
                  )}
                >
                  {billboard.icon}
                </span>
                <div className="ml-4">
                  <p
                    className={cn(
                      "text-base font-medium",
                      billboard.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
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
          <AccordionTrigger className="text-gray-400">
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
                "p-2 grid grid-rows-1 mb-2"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    categories.active ? "text-sky-500" : "text-gray-500"
                  )}
                >
                  {categories.icon}
                </span>
                <div className="ml-4">
                  <p
                    className={cn(
                      "text-base font-medium",
                      categories.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
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
          <AccordionTrigger className="text-gray-400">
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
                "p-2 grid grid-rows-1 mb-2"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    parameter.active ? "text-sky-500" : "text-gray-500"
                  )}
                >
                  {parameter.icon}
                </span>
                <div className="ml-4">
                  <p
                    className={cn(
                      "text-base font-medium",
                      parameter.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
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
          <AccordionTrigger className="text-gray-400">
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
                "p-2 grid grid-rows-1 mb-2"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    product.active ? "text-sky-500" : "text-gray-500"
                  )}
                >
                  {product.icon}
                </span>
                <div className="ml-4">
                  <p
                    className={cn(
                      "text-base font-medium",
                      product.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
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
          <AccordionTrigger className="text-gray-400">
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
                "p-2 grid grid-rows-1 mb-2"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    order.active ? "text-sky-500" : "text-gray-500"
                  )}
                >
                  {order.icon}
                </span>
                <div className="ml-4">
                  <p
                    className={cn(
                      "text-base font-medium",
                      order.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
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
          <AccordionTrigger className="text-gray-400">
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
                "p-2 grid grid-rows-1 mb-2"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    user.active ? "text-sky-500" : "text-gray-500"
                  )}
                >
                  {user.icon}
                </span>
                <div className="ml-4">
                  <p
                    className={cn(
                      "text-base font-medium",
                      user.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
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
          <AccordionTrigger className="text-gray-400">
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
                "p-2 grid grid-rows-1 mb-2"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    checkout.active ? "text-sky-500" : "text-gray-500"
                  )}
                >
                  {checkout.icon}
                </span>
                <div className="ml-4">
                  <p
                    className={cn(
                      "text-base font-medium",
                      checkout.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
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
          <AccordionTrigger className="text-gray-400">
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
                "p-2 grid grid-rows-1 mb-2"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    setting.active ? "text-sky-500" : "text-gray-500"
                  )}
                >
                  {setting.icon}
                </span>
                <div className="ml-4">
                  <p
                    className={cn(
                      "text-base font-medium",
                      setting.active ? "text-sky-500" : "text-gray-500"
                    )}
                  >
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
