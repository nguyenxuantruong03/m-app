"use client";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  CircleUser,
  UserRoundPlus,
  Bell,
  ArrowUpRight,
  BadgeDollarSign,
} from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "../../auth/user-button";
import NavbarMultipleResponsive from "./navbar-multiple-resposive";
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

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
  title: string; // Assuming title is also a custom prop you want to pass
  icon?: any; // icon can be any valid React node (component, element, etc.)
  active?: string;
};

const NavbarMultiple = () => {
  const userId = useCurrentUser();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
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
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className="fixed bg-slate-200 dark:bg-slate-900 w-full top-0 z-[9999]">
        <div className={`mx-auto ${userId ? "p-2" : "p-2 xl:p-4"}`}>
          <div className="flex justify-between items-center">
            <div className="flex justify-start">
            <Link href="/">
              <div className="hidden xl:block">
              <Image
                  alt=""
                  src="/images/logo-custom.png"
                  width="155"
                  height="30"
                  className="rounded-sm hover:opacity-75 transition"
                />
              </div>
              <div className="block xl:hidden">
                <Image
                  alt=""
                  src="/images/logo-mini.png"
                  width="45"
                  height="30"
                  className="rounded-sm bg-[#c3c3c3] dark:bg-slate-700 py-1.5 px-2.5 hover:opacity-75 transition"
                />
              </div>
            </Link>
            </div>

            <nav className="hidden xl:flex space-x-1 z-[999]">
              {/* Overview */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {routeTitle.map((route) => (
                        <>{route.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <BadgeDollarSign className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components that you can
                                copy and paste into your apps. Accessible.
                                Customizable. Open Source.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        {routes.map((route) => (
                          <>
                            <ListItem
                              active={cn(
                                "text-md font-medium transition-colors hover:text-primary",
                                route.active
                                  ? "text-sky-500"
                                  : "text-muted-foreground"
                              )}
                              key={route.href}
                              href={route.href}
                              title={route.label}
                              icon={route.icon}
                            >
                              <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  route.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {route.content}
                              </span>
                            </ListItem>
                          </>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* staff */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {staffTitle.map((staff) => (
                        <>{staff.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {staffs.map((staff) => (
                          <ListItem
                            key={staff.href}
                            active={cn(
                              "text-md font-medium transition-colors hover:text-primary",
                              staff.active
                                ? "text-sky-500"
                                : "text-muted-foreground"
                            )}
                            title={staff.label}
                            href={staff.href}
                            icon={staff.icon}
                          >
                            <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  staff.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {staff.content}
                              </span>
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* billboard */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {billboardTitle.map((billboard) => (
                        <>{billboard.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <BadgeDollarSign className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components that you can
                                copy and paste into your apps. Accessible.
                                Customizable. Open Source.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        {billboards.map((billboard) => (
                          <>
                            <ListItem
                              active={cn(
                                "text-md font-medium transition-colors hover:text-primary",
                                billboard.active
                                  ? "text-sky-500"
                                  : "text-muted-foreground"
                              )}
                              key={billboard.href}
                              href={billboard.href}
                              title={billboard.label}
                              icon={billboard.icon}
                            >
                              <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  billboard.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {billboard.content}
                              </span>
                            </ListItem>
                          </>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* Category */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {categoryTitle.map((categories) => (
                        <>{categories.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {category.map((categories) => (
                          <ListItem
                            key={categories.href}
                            active={cn(
                              "text-md font-medium transition-colors hover:text-primary",
                              categories.active
                                ? "text-sky-500"
                                : "text-muted-foreground"
                            )}
                            title={categories.label}
                            href={categories.href}
                            icon={categories.icon}
                          >
                            <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  categories.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {categories.content}
                              </span>
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* Parameter */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {parameterTitle.map((parameter) => (
                        <>{parameter.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <BadgeDollarSign className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components that you can
                                copy and paste into your apps. Accessible.
                                Customizable. Open Source.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        {parameters.map((parameter) => (
                          <>
                            <ListItem
                              active={cn(
                                "text-md font-medium transition-colors hover:text-primary",
                                parameter.active
                                  ? "text-sky-500"
                                  : "text-muted-foreground"
                              )}
                              key={parameter.href}
                              href={parameter.href}
                              title={parameter.label}
                              icon={parameter.icon}
                            >
                              <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  parameter.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {parameter.content}
                              </span>
                            </ListItem>
                          </>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* Product */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {productTitle.map((product) => (
                        <>{product.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {products.map((product) => (
                          <ListItem
                            key={product.href}
                            active={cn(
                              "text-md font-medium transition-colors hover:text-primary",
                              product.active
                                ? "text-sky-500"
                                : "text-muted-foreground"
                            )}
                            title={product.label}
                            href={product.href}
                            icon={product.icon}
                          >
                            <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  product.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {product.content}
                              </span>
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* Order */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {orderTitle.map((order) => (
                        <>{order.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <BadgeDollarSign className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components that you can
                                copy and paste into your apps. Accessible.
                                Customizable. Open Source.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        {orders.map((order) => (
                          <>
                            <ListItem
                              active={cn(
                                "text-md font-medium transition-colors hover:text-primary",
                                order.active
                                  ? "text-sky-500"
                                  : "text-muted-foreground"
                              )}
                              key={order.href}
                              href={order.href}
                              title={order.label}
                              icon={order.icon}
                            >
                              <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  order.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {order.content}
                              </span>
                            </ListItem>
                          </>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* User */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {userTitle.map((user) => (
                        <>{user.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <BadgeDollarSign className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components that you can
                                copy and paste into your apps. Accessible.
                                Customizable. Open Source.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        {users.map((user) => (
                          <>
                            <ListItem
                              active={cn(
                                "text-md font-medium transition-colors hover:text-primary",
                                user.active
                                  ? "text-sky-500"
                                  : "text-muted-foreground"
                              )}
                              key={user.href}
                              href={user.href}
                              title={user.label}
                              icon={user.icon}
                            >
                              <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  user.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {user.content}
                              </span>
                            </ListItem>
                          </>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* Payment */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {checkoutTitle.map((checkout) => (
                        <>{checkout.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <BadgeDollarSign className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components that you can
                                copy and paste into your apps. Accessible.
                                Customizable. Open Source.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        {checkouts.map((checkout) => (
                          <>
                            <ListItem
                              active={cn(
                                "text-md font-medium transition-colors hover:text-primary",
                                checkout.active
                                  ? "text-sky-500"
                                  : "text-muted-foreground"
                              )}
                              key={checkout.href}
                              href={checkout.href}
                              title={checkout.label}
                              icon={checkout.icon}
                            >
                              <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  checkout.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {checkout.content}
                              </span>
                            </ListItem>
                          </>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* Setting */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300">
                      {settingTitle.map((setting) => (
                        <>{setting.mainicon}</>
                      ))}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="flex flex-col gap-3 p-6 w-[250px]">
                        {settings.map((setting) => (
                          <>
                            <ListItem
                              active={cn(
                                "text-md font-medium transition-colors hover:text-primary",
                                setting.active
                                  ? "text-sky-500"
                                  : "text-muted-foreground"
                              )}
                              key={setting.href}
                              href={setting.href}
                              title={setting.label}
                              icon={setting.icon}
                            >
                              <span
                                className={cn(
                                  "text-md font-medium transition-colors hover:text-primary",
                                  setting.active
                                    ? "text-sky-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                {setting.content}
                              </span>
                            </ListItem>
                          </>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            <div className="flex items-center justify-between">
              {userId?.id && userId?.email ? (
                <div className="flex px-8 xl:px-12">
                  <div className="flex items-center space-x-8">
                    {/* <div className="p-2 rounded-full hover:bg-gray-300 hover:bg-opacity-50 cursor-pointer">
                      <Bell className="size-5 text-amber-400" />
                    </div> */}
                    <UserButton />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-end md:flex-1">
                  <Link
                    href="/auth/login"
                    className="whitespace-nowrap px-1 py-2 lg:py-2 lg:px-2 2xl:px-4 2xl:py-2  border-slate-300 shadow-sm rounded-md border-2 2xl:text-base lg:text-sm font-medium text-gray-500 dark:hover:text-slate-500 hover:text-white"
                  >
                    <span className="flex items-center 2xl:text-base lg:text-sm">
                      <CircleUser className="h-4 w-4 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
                      Login
                    </span>
                  </Link>
                  <Link
                    href="/auth/register"
                    className="ml-1 whitespace-nowrap inline-flex items-center justify-center px-1 py-2 lg:py-2 lg:px-2 2xl:px-4 2xl:py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <span className="flex items-center 2xl:text-base lg:text-sm">
                      <UserRoundPlus className="h-4 w-4 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
                      Register
                    </span>
                  </Link>
                </div>
              )}
              <div className="ml-2 xl:ml-0 mr-2 -my-2 xl:hidden z-[9999]">
                <button
                  type="button"
                  className="dark:bg-slate-900 bg-slate-200 rounded-md p-2 inline-flex items-center justify-center text-gray-400  hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setOpen(!open)}
                >
                  <span className="sr-only">Open menu</span>
                  {/* Heroicon name: outline/menu */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: ""
      To: ""
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  */}

        <div
          className={
            open
              ? "opacity-100 z-[99999] h-[500px] overflow-y-auto scale-100 animate-fade-down animate-duration-[300ms] animate-ease-linear absolute top-0 inset-x-0 p-2 transform origin-top-right xl:hidden "
              : "hidden scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right xl:hidden"
          }
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-200 dark:bg-slate-900 divide-y-2 divide-gray-50 z-[999]">
            <div className="pt-5 pb-6 px-5">
              <div className="flex xl:hidden items-center justify-between">
                <Image
                    alt=""
                    src="/images/logo-mini.png"
                    width="45"
                    height="30"
                    className="rounded-sm bg-[#c3c3c3] dark:bg-slate-700 py-1.5 px-2.5"
                  />
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-[#c3c3c3] dark:bg-slate-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                {/* Navbar của responsive */}
                <nav className="grid gap-y-8">
                  <NavbarMultipleResponsive />
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-700 dark:text-slate-300 hover:text-gray-700"
                >
                  Enterprise
                  <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-700 dark:text-slate-300 hover:text-gray-700"
                >
                  Blog
                  <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-700 dark:text-slate-300 hover:text-gray-700"
                >
                  Help Center
                  <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-700 dark:text-slate-300 hover:text-gray-700"
                >
                  Guides
                  <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-700 dark:text-slate-300 hover:text-gray-700"
                >
                  Security
                  <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-700 dark:text-slate-300 hover:text-gray-700"
                >
                  Events
                  <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMultiple;

export const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, icon, children, active, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div
              className={`text-base font-medium flex items-center ${active}`}
            >
              <span className="mr-2">{icon}</span> {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
