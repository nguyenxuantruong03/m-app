"use client";
import React, { useEffect, useState } from "react";
import MenuTree from "./menutree";
import { getAllCategories } from "@/actions/client/categories/get-categories";
import { Category } from "@/types/type";

interface MenuProps {
  showCategories?: boolean;
}

const Menu: React.FC<MenuProps> = ({ showCategories = false }) => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {
          categories,
          categories1,
          categories2,
          categories3,
          categories4,
          categories5,
          categories6,
          categories7,
          categories8,
          categories9,
          categories10,
          categories11,
        } = await getAllCategories();

        setCategories(categories);
        setCategories1(categories1);
        setCategories2(categories2);
        setCategories3(categories3);
        setCategories4(categories4);
        setCategories5(categories5);
        setCategories6(categories6);
        setCategories7(categories7);
        setCategories8(categories8);
        setCategories9(categories9);
        setCategories10(categories10);
        setCategories11(categories11);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const innerDivClassName = showCategories ? "mx-auto max-w-7xl h-[409px] my-2 mt-[120px] bg-white rounded-md flex space-x-5" : "";

  return (
    <>
        <div className={innerDivClassName}>
          <MenuTree
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
          />
        </div>
    </>
  );
};

export default Menu;
