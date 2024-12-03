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
} from "./export-name-navbar";
import { translateMainNav } from "@/translate/translate-client";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  languageToUse: string;
}

const MainNav = ({ className, languageToUse, ...props }: MainNavProps) => {
  const pathname = usePathname();
  const params = useParams();
  const storeId = Array.isArray(params.storeId)
    ? params.storeId[0]
    : params.storeId;

  const routes = route(storeId, pathname, languageToUse);
  const staffs = staff(storeId, pathname, languageToUse);
  const billboards = billboard(storeId, pathname, languageToUse);
  const category = categories(storeId, pathname, languageToUse);
  const parameters = parameter(storeId, pathname, languageToUse);
  const products = product(storeId, pathname, languageToUse);
  const orders = order(storeId, pathname, languageToUse);
  const users = user(storeId, pathname, languageToUse);
  const checkouts = checkout(storeId, pathname, languageToUse);
  const settings = setting(storeId, pathname, languageToUse);

  //language
  const mainNavMessage = translateMainNav(languageToUse);
  return (
    <>
      {/* Overview */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{mainNavMessage.name1}</AccordionTrigger>
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
        {/* Staff Attendance */}
        <AccordionItem value="item-3">
          <AccordionTrigger>{mainNavMessage.name2}</AccordionTrigger>
          <AccordionContent>
            {staffs.map((route) => (
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
          <AccordionTrigger>{mainNavMessage.name3}</AccordionTrigger>
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
          <AccordionTrigger>{mainNavMessage.name4}</AccordionTrigger>
          <AccordionContent>
            {category.map((category) => (
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
          <AccordionTrigger>{mainNavMessage.name5}</AccordionTrigger>
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
          <AccordionTrigger>{mainNavMessage.name6}</AccordionTrigger>
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
          <AccordionTrigger>{mainNavMessage.name7}</AccordionTrigger>
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
          <AccordionTrigger>{mainNavMessage.name8}</AccordionTrigger>
          <AccordionContent>
            {users.map((order) => (
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
          <AccordionTrigger>{mainNavMessage.name9}</AccordionTrigger>
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
          <AccordionTrigger>{mainNavMessage.name10}</AccordionTrigger>
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
