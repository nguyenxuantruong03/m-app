"use client";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { CircleUser, UserRoundPlus, Bell, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "../../auth/user-button";
import NavbarMultipleResponsive from "./navbar-multiple-resposive";
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
} from "./export-navbarmultiple";

const NavbarMultiple = () => {
  const userId = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [flyer, setFlyer] = useState(false);
  const [flyerTwo, setFlyerTwo] = useState(false);
  const [flyer3, setFlyer3] = useState(false);
  const [flyer4, setFlyer4] = useState(false);
  const [flyer5, setFlyer5] = useState(false);
  const [flyer6, setFlyer6] = useState(false);
  const [flyer7, setFlyer7] = useState(false);
  const [flyer8, setFlyer8] = useState(false);
  const [flyer9, setFlyer9] = useState(false);
  const [flyer10, setFlyer10] = useState(false);
  const [flyer11, setFlyer11] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const storeId = Array.isArray(params.storeId)
    ? params.storeId[0]
    : params.storeId;

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
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className="fixed dark:bg-slate-200 bg-slate-900 w-full top-0 z-[999]">
        <div className="max-w-8xl mx-auto px-2 2xl:px-5 lg:px-2 sm:px-6">
          <div className="flex justify-between items-center py-6 md:space-x-3">
            <div className="flex justify-start">
              <Link href="/">
                <span className="sr-only">Workflow</span>
                <Image
                  className="h-8 w-auto sm:h-12"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                  width="50"
                  height="50"
                />
              </Link>
            </div>

            <nav className="hidden xl:flex space-x-1 lg:space-x-1 2xl:space-x-4 z-[999]">
              <div className="relative">
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(!flyer),
                    setFlyerTwo(false),
                    setFlyer3(false),
                    setFlyer4(false),
                    setFlyer5(false),
                    setFlyer6(false),
                    setFlyer7(false),
                    setFlyer8(false),
                    setFlyer9(false),
                    setFlyer10(false),
                    setFlyer11(false)
                  )}
                >
                  {routeTitle.map((route) => (
                    <>{route.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  onMouseLeave={() => setFlyer(false)}
                  className={
                    flyer
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/4"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {routes.map((route) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={route.href}
                            href={route.href}
                            title={route.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {route.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {route.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {route.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Related Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(!flyerTwo),
                    setFlyer3(false),
                    setFlyer4(false),
                    setFlyer5(false),
                    setFlyer6(false),
                    setFlyer7(false),
                    setFlyer8(false),
                    setFlyer9(false),
                    setFlyer10(false),
                    setFlyer11(false)
                  )}
                >
                  {datastatisticTitle.map((datastatistic) => (
                    <>{datastatistic.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyerTwo === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyerTwo(false)}
                  className={
                    flyerTwo
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/2 "
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {datastatistics.map((datastatistic) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={datastatistic.href}
                            href={datastatistic.href}
                            title={datastatistic.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {datastatistic.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {datastatistic.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {datastatistic.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(false),
                    setFlyer3(!flyer3),
                    setFlyer4(false),
                    setFlyer5(false),
                    setFlyer6(false),
                    setFlyer7(false),
                    setFlyer8(false),
                    setFlyer9(false),
                    setFlyer10(false),
                    setFlyer11(false)
                  )}
                >
                  {staffTitle.map((staff) => (
                    <>{staff.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer3 === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer3(false)}
                  className={
                    flyer3
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/2"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="lg:h-[600px] 2xl:h-[800px] overflow-y-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {staffs.map((staff) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={staff.href}
                            href={staff.href}
                            title={staff.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {staff.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {staff.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {staff.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(false),
                    setFlyer3(false),
                    setFlyer4(!flyer4),
                    setFlyer5(false),
                    setFlyer6(false),
                    setFlyer7(false),
                    setFlyer8(false),
                    setFlyer9(false),
                    setFlyer10(false),
                    setFlyer11(false)
                  )}
                >
                  {billboardTitle.map((billboard) => (
                    <>{billboard.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer4 === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer4(false)}
                  className={
                    flyer4
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/2"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {billboards.map((billboard) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={billboard.href}
                            href={billboard.href}
                            title={billboard.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {billboard.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {billboard.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {billboard.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(false),
                    setFlyer3(false),
                    setFlyer4(false),
                    setFlyer5(!flyer5),
                    setFlyer6(false),
                    setFlyer7(false),
                    setFlyer8(false),
                    setFlyer9(false),
                    setFlyer10(false),
                    setFlyer11(false)
                  )}
                >
                  {categoryTitle.map((categories) => (
                    <>{categories.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer5 === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer5(false)}
                  className={
                    flyer5
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/2"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="lg:h-[600px] 2xl:h-[800px] overflow-y-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {category.map((categories) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={categories.href}
                            href={categories.href}
                            title={categories.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {categories.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {categories.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {categories.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(false),
                    setFlyer3(false),
                    setFlyer4(false),
                    setFlyer5(false),
                    setFlyer6(!flyer6),
                    setFlyer7(false),
                    setFlyer8(false),
                    setFlyer9(false),
                    setFlyer10(false),
                    setFlyer11(false)
                  )}
                >
                  {parameterTitle.map((parameter) => (
                    <>{parameter.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer6 === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer6(false)}
                  className={
                    flyer6
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/2"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {parameters.map((parameter) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={parameter.href}
                            href={parameter.href}
                            title={parameter.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {parameter.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {parameter.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {parameter.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(false),
                    setFlyer3(false),
                    setFlyer4(false),
                    setFlyer5(false),
                    setFlyer6(false),
                    setFlyer7(!flyer7),
                    setFlyer8(false),
                    setFlyer9(false),
                    setFlyer10(false),
                    setFlyer11(false)
                  )}
                >
                  {productTitle.map((product) => (
                    <>{product.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer7 === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer7(false)}
                  className={
                    flyer7
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/2"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="lg:h-[600px] 2xl:h-[800px] overflow-y-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {products.map((product) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={product.href}
                            href={product.href}
                            title={product.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {product.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {product.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(false),
                    setFlyer3(false),
                    setFlyer4(false),
                    setFlyer5(false),
                    setFlyer6(false),
                    setFlyer7(false),
                    setFlyer8(!flyer8),
                    setFlyer9(false),
                    setFlyer10(false),
                    setFlyer11(false)
                  )}
                >
                  {orderTitle.map((order) => (
                    <>{order.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer8 === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer8(false)}
                  className={
                    flyer8
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/2"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {orders.map((order) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={order.href}
                            href={order.href}
                            title={order.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {order.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {order.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {order.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(false),
                    setFlyer3(false),
                    setFlyer4(false),
                    setFlyer5(false),
                    setFlyer6(false),
                    setFlyer7(false),
                    setFlyer8(false),
                    setFlyer9(!flyer9),
                    setFlyer10(false),
                    setFlyer11(false)
                  )}
                >
                  {userTitle.map((user) => (
                    <>{user.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer9 === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer9(false)}
                  className={
                    flyer9
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/2"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {users.map((user) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={user.href}
                            href={user.href}
                            title={user.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {user.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {user.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {user.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(false),
                    setFlyer3(false),
                    setFlyer4(false),
                    setFlyer5(false),
                    setFlyer6(false),
                    setFlyer7(false),
                    setFlyer8(false),
                    setFlyer9(false),
                    setFlyer10(!flyer10),
                    setFlyer11(false)
                  )}
                >
                  {checkoutTitle.map((checkout) => (
                    <>{checkout.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer10 === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer10(false)}
                  className={
                    flyer10
                      ? " block animate-fade-down animate-duration-[300ms] animate-ease-linear absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:-left-1/2"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {checkouts.map((checkout) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={checkout.href}
                            href={checkout.href}
                            title={checkout.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {checkout.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {checkout.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {checkout.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Item active: "text-slate-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="group z-[999] dark:bg-slate-200 bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium dark:hover:text-slate-900 hover:text-white focus:outline-none "
                  onClick={() => (
                    setFlyer(false),
                    setFlyerTwo(false),
                    setFlyer3(false),
                    setFlyer4(false),
                    setFlyer5(false),
                    setFlyer6(false),
                    setFlyer7(false),
                    setFlyer8(false),
                    setFlyer9(false),
                    setFlyer10(false),
                    setFlyer11(!flyer11)
                  )}
                >
                  {settingTitle.map((setting) => (
                    <>{setting.mainicon}</>
                  ))}
                  <svg
                    className={
                      flyer11 === true
                        ? "transform rotate-180 ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                        : "ml-2 lg:ml-0 2xl:ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer11(false)}
                  className={
                    flyer11
                      ? " block transition ease-out duration-200 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                      : " hidden translate-y-1 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {settings.map((setting) => (
                      <>
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            key={setting.href}
                            href={setting.href}
                            title={setting.label}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                              {setting.icon}
                            </span>
                            <div className="ml-4">
                              <p className="text-base font-medium text-slate-900">
                                {setting.label}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {setting.content}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                      <div>
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                          Recent Posts
                        </h3>
                        <ul className="mt-4 space-y-4">
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Boost your conversion rate
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              How to use search engine optimization to drive
                              traffic to your site
                            </Link>
                          </li>
                          <li className="text-base truncate">
                            <Link
                              href="#"
                              className="font-medium text-slate-900 hover:text-gray-700"
                            >
                              Improve your customer experience
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-5 text-sm">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {" "}
                          View all posts <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex items-center justify-between">
              {userId?.id && userId?.email ? (
                <div className="flex px-8 xl:px-12">
                  <div className="flex items-center space-x-8">
                    <div className="p-2 rounded-full hover:bg-gray-300 hover:bg-opacity-50 cursor-pointer">
                      <Bell className="size-5 text-amber-400" />
                    </div>
                    <UserButton />
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center justify-end md:flex-1">
                  <Link
                    href="/auth/login"
                    className="whitespace-nowrap 2xl:px-4 2xl:py-2 lg:py-2 lg:px-2 border-slate-300 shadow-sm rounded-md border-2 2xl:text-base lg:text-sm font-medium text-gray-500 dark:hover:text-slate-900 hover:text-white"
                  >
                    <span className="flex items-center 2xl:text-base lg:text-sm">
                      <CircleUser className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
                      Login
                    </span>
                  </Link>
                  <Link
                    href="/auth/register"
                    className="ml-3 whitespace-nowrap inline-flex items-center justify-center 2xl:px-4 2xl:py-2 lg:py-2 lg:px-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <span className="flex items-center 2xl:text-base lg:text-sm">
                      <UserRoundPlus className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
                      Register
                    </span>
                  </Link>
                </div>
              )}
              <div className="mr-2 -my-2 xl:hidden z-[99]">
                <button
                  type="button"
                  className="z-[999] dark:bg-slate-200 bg-slate-900 rounded-md p-2 inline-flex items-center justify-center dark:text-gray-400 text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
              ? "opacity-100 h-[750px] overflow-y-auto scale-100 animate-fade-down animate-duration-[300ms] animate-ease-linear absolute top-0 inset-x-0 p-2 transform origin-top-right xl:hidden "
              : "hidden scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right xl:hidden"
          }
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-white bg-slate-900 divide-y-2 divide-gray-50 z-[999]">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                    width="50"
                    height="50"
                  />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: outline/x */}
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
                  className="flex items-center text-base font-medium text-slate-900 hover:text-gray-700"
                >
                  Enterprise
                <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-900 hover:text-gray-700"
                >
                  Blog
                <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-900 hover:text-gray-700"
                >
                  Help Center
                <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-900 hover:text-gray-700"
                >
                  Guides
                <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-900 hover:text-gray-700"
                >
                  Security
                <ArrowUpRight className="h-5 w-5 ml-1" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-base font-medium text-slate-900 hover:text-gray-700"
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
