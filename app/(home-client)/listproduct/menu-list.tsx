"use client";
import "./listproduct.css";
import { useState, useEffect } from "react";
import { notFound, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getAllCategory } from "@/actions/client/categories/get-all-category";
import { Category } from "@/types/type";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  translateElectricWire,
  translatePipe,
  translateGlue,
  translateLightBulb,
  translatePaint,
  translatePin,
  translateSocket,
  translateFan,
  translateCuttingStone,
  translateLock,
  translateBathroom,
  translateCommonUse,
} from "@/translate/translate-client";

const Menu = () => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categories1, setCategories1] = useState<Category[]>([]);
  const [categories2, setCategories2] = useState<Category[]>([]);
  const [categories3, setCategories3] = useState<Category[]>([]);
  const [categories4, setCategories4] = useState<Category[]>([]);
  const [categories5, setCategories5] = useState<Category[]>([]);
  const [categories6, setCategories6] = useState<Category[]>([]);
  const [categories7, setCategories7] = useState<Category[]>([]);
  const [categories8, setCategories8] = useState<Category[]>([]);
  const [categories9, setCategories9] = useState<Category[]>([]);
  const [categories10, setCategories10] = useState<Category[]>([]);
  const [categories11, setCategories11] = useState<Category[]>([]);
  const [selectedTab, setSelectedTab] = useState("home");
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const pinMessage = translatePin(languageToUse);
  const fanMessage = translateFan(languageToUse);
  const pipeMessage = translatePipe(languageToUse);
  const electricWireMessage = translateElectricWire(languageToUse);
  const cuttingStoneMessage = translateCuttingStone(languageToUse);
  const lockMessage = translateLock(languageToUse);
  const glueMessage = translateGlue(languageToUse);
  const socketMessage = translateSocket(languageToUse);
  const paintMessage = translatePaint(languageToUse);
  const bathRoomMessage = translateBathroom(languageToUse);
  const lighBulbMessage = translateLightBulb(languageToUse);
  const commonMessage = translateCommonUse(languageToUse);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth > 640) {
        notFound();
      } else {
        setIsSmallScreen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const categories0 = categories.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));
  const categories01 = categories1.map((categories) => ({
    href: `/category1/${categories.id}`,
    label: categories.name,
    active: pathname === `/category1/${categories.id}`,
  }));
  const categories02 = categories2.map((categories) => ({
    href: `/category2/${categories.id}`,
    label: categories.name,
    active: pathname === `/category2/${categories.id}`,
  }));
  const categories03 = categories3.map((categories) => ({
    href: `/category3/${categories.id}`,
    label: categories.name,
    active: pathname === `/category3/${categories.id}`,
  }));
  const categories04 = categories4.map((categories) => ({
    href: `/category4/${categories.id}`,
    label: categories.name,
    active: pathname === `/category4/${categories.id}`,
  }));
  const categories05 = categories5.map((categories) => ({
    href: `/category5/${categories.id}`,
    label: categories.name,
    active: pathname === `/category5/${categories.id}`,
  }));
  const categories06 = categories6.map((categories) => ({
    href: `/category6/${categories.id}`,
    label: categories.name,
    active: pathname === `/category6/${categories.id}`,
  }));
  const categories07 = categories7.map((categories) => ({
    href: `/category7/${categories.id}`,
    label: categories.name,
    active: pathname === `/category7/${categories.id}`,
  }));
  const categories08 = categories8.map((categories) => ({
    href: `/category8/${categories.id}`,
    label: categories.name,
    active: pathname === `/category8/${categories.id}`,
  }));
  const categories09 = categories9.map((categories) => ({
    href: `/category9/${categories.id}`,
    label: categories.name,
    active: pathname === `/category9/${categories.id}`,
  }));
  const categories010 = categories10.map((categories) => ({
    href: `/category10/${categories.id}`,
    label: categories.name,
    active: pathname === `/category10/${categories.id}`,
  }));
  const categories011 = categories11.map((categories) => ({
    href: `/category11/${categories.id}`,
    label: categories.name,
    active: pathname === `/category11/${categories.id}`,
  }));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Gọi API để lấy danh sách categories
        const category = await getAllCategory(languageToUse);

        // Tạo một object để lưu các categories theo categoryType
        const categorized = category.reduce(
          (acc: Record<string, any[]>, item: any) => {
            if (!acc[item.categoryType]) {
              acc[item.categoryType] = [];
            }
            acc[item.categoryType].push(item);
            return acc;
          },
          {}
        );

        // Set các state tương ứng
        setCategories(categorized["CATEGORY"] || []);
        setCategories1(categorized["CATEGORY1"] || []);
        setCategories2(categorized["CATEGORY2"] || []);
        setCategories3(categorized["CATEGORY3"] || []);
        setCategories4(categorized["CATEGORY4"] || []);
        setCategories5(categorized["CATEGORY5"] || []);
        setCategories6(categorized["CATEGORY6"] || []);
        setCategories7(categorized["CATEGORY7"] || []);
        setCategories8(categorized["CATEGORY8"] || []);
        setCategories9(categorized["CATEGORY9"] || []);
        setCategories10(categorized["CATEGORY10"] || []);
        setCategories11(categorized["CATEGORY11"] || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (!isSmallScreen) {
    return null; // Optionally render nothing if the screen is large
  }

  return (
    <>
      <div className="maintab md:hidden">
        <div className="containerr">
          <div className="content flex">
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "home"}
              id="home"
              onChange={() => handleTabChange("home")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "blog"}
              id="blog"
              onChange={() => handleTabChange("blog")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "help"}
              id="help"
              onChange={() => handleTabChange("help")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "code"}
              id="code"
              onChange={() => handleTabChange("code")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "about"}
              id="about"
              onChange={() => handleTabChange("about")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "category"}
              id="category"
              onChange={() => handleTabChange("category")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "category1"}
              id="category1"
              onChange={() => handleTabChange("category1")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "category2"}
              id="category2"
              onChange={() => handleTabChange("category2")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "category3"}
              id="category3"
              onChange={() => handleTabChange("category3")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "category4"}
              id="category4"
              onChange={() => handleTabChange("category4")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "category5"}
              id="category5"
              onChange={() => handleTabChange("category5")}
            />
            <input
              type="radio"
              name="slider"
              checked={selectedTab === "category6"}
              id="category6"
              onChange={() => handleTabChange("category6")}
            />
            <div className="list">
              <label htmlFor="home" className="home">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {pinMessage}
                </span>
              </label>
              <label htmlFor="blog" className="blog">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {fanMessage}
                </span>
              </label>
              <label htmlFor="help" className="help">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {pipeMessage}
                </span>
              </label>
              <label htmlFor="code" className="code">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {electricWireMessage}
                </span>
              </label>
              <label htmlFor="about" className="about">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {cuttingStoneMessage}
                </span>
              </label>
              <label htmlFor="category" className="category">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {lockMessage}
                </span>
              </label>
              <label htmlFor="category1" className="category1">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {glueMessage}
                </span>
              </label>
              <label htmlFor="category2" className="category2">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {socketMessage}
                </span>
              </label>
              <label htmlFor="category3" className="category3">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {paintMessage}
                </span>
              </label>
              <label htmlFor="category4" className="category4">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {bathRoomMessage}
                </span>
              </label>
              <label htmlFor="category5" className="category5">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {lighBulbMessage}
                </span>
              </label>
              <label htmlFor="category6" className="category6">
                <span className="text-base text-slate-900 dark:text-slate-200">
                  {commonMessage}
                </span>
              </label>
              <div className="slider"></div>
            </div>

            <div className="text-content">
              <div
                className={`home text ${
                  selectedTab === "home" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories0.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`blog text ${
                  selectedTab === "blog" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories01.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`help text ${
                  selectedTab === "help" ? "active" : ""
                }`}
              >
                <div className="grid grid-cols-1 space-y-3 py-2 bg-black rounded-md">
                  {categories02.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`code text ${
                  selectedTab === "code" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories03.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`about text ${
                  selectedTab === "about" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories04.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`category text ${
                  selectedTab === "category" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories05.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`category1 text ${
                  selectedTab === "category1" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories06.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`category2 text ${
                  selectedTab === "category2" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories07.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`category3 text ${
                  selectedTab === "category3" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories08.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`category4 text ${
                  selectedTab === "category4" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories09.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`category5 text ${
                  selectedTab === "category5" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories010.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={`category6 text ${
                  selectedTab === "category6" ? "active" : ""
                }`}
              >
                <div className="grid grid-rows-1 space-y-3 py-2 bg-black rounded-md">
                  {categories011.map((categories) => (
                    <Link
                      key={categories.href}
                      href={categories.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-red-300 p-1",
                        categories.active
                          ? "text-red-300 font-medium"
                          : "text-white font-medium"
                      )}
                    >
                      {categories.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
