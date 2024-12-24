"use client";
import React, { useEffect, useState } from "react";
import MenuTree from "./menutree";
import { Category } from "@/types/type";
import { getAllCategory } from "@/actions/client/categories/get-all-category";

interface MenuProps {
  showCategories?: boolean;
  loadingBillboard?: boolean;
  languageToUse: string;
}

const Menu: React.FC<MenuProps> =  ({ showCategories = false,languageToUse, loadingBillboard }) => {
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
  const [loadingCategory,setLoadingCategory] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategory(true)
        // Gọi API để lấy danh sách categories
        const category = await getAllCategory();
  
        // Tạo một object để lưu các categories theo categoryType
        const categorized = category.reduce((acc: Record<string, any[]>, item: any) => {
          if (!acc[item.categoryType]) {
            acc[item.categoryType] = [];
          }
          acc[item.categoryType].push(item);
          return acc;
        }, {});
  
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
      } finally{
        setLoadingCategory(false)
      }
    };
  
    fetchCategories();
  }, []);
  
  const innerDivClassName = showCategories ? "mx-auto max-w-7xl h-[430px] my-2 mt-[120px] bg-white rounded-md flex space-x-5" : "";

  return (
    <>
        <div className={innerDivClassName}>
          <MenuTree
            loadingBillboard={loadingBillboard}
            loadingCategory={loadingCategory}
            data={categories}
            categories1={categories1}
            categories2={categories2}
            categories3={categories3}
            categories4={categories4}
            categories5={categories5}
            categories6={categories6}
            categories7={categories7}
            categories8={categories8}
            categories9={categories9}
            categories10={categories10}
            categories11={categories11}
            languageToUse={languageToUse}
          />
        </div>
    </>
  );
};

export default Menu;
