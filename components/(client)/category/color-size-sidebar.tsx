"use client";
import getProductDetail from "@/actions/client/get-productdetail";
import Filter from "@/components/(client)/filter-category/filter";
import MobileFilter from "@/components/(client)/filter-category/mobile-filter";
import ColorSizeSkeleton from "@/components/(client)/skeleton/color-size-sidebar-category";
import { Size, Color, ProductDetail } from "@/types/type";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ColorSizeSideBarProps {
  categoryId: string | string[]; // Một chuỗi hoặc một mảng chuỗi;
}

type ProductDetailWithSizesColors = ProductDetail & {
  [key: string]: any; // Allows dynamic access
};

const ColorSizeSideBar = ({ categoryId }: ColorSizeSideBarProps) => {
  const t = useTranslations()
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<Size[]>([]);
  const [color, setColor] = useState<Color[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productDetails: ProductDetail[] = await getProductDetail({
          categoryId: categoryId,
        });

        const sizesArray: Size[] = [];
        const colorsArray: Color[] = [];

        // Set to track unique sizes and colors based on their ID
        //Chuyển size 1 - 5 vào Color[] và Size[]
        const sizeSet = new Set();
        const colorSet = new Set();

        // Loop through each product and extract sizes/colors
        productDetails.forEach((productDetail: ProductDetailWithSizesColors) => {
          for (let i = 1; i <= 5; i++) {
            const sizeKey = `size${i}Id` as keyof ProductDetailWithSizesColors;
            const colorKey = `color${i}Id` as keyof ProductDetailWithSizesColors;

            // Handle sizes - check if the size ID is already added
            if (productDetail[sizeKey] && !sizeSet.has(productDetail[sizeKey])) {
              sizesArray.push({
                id: productDetail[sizeKey]!,
                name: productDetail[`size${i}`]?.name || "",
                value: productDetail[`size${i}`]?.value || "",
              });
              sizeSet.add(productDetail[sizeKey]);
            }

            // Handle colors - check if the color ID is already added
            if (productDetail[colorKey] && !colorSet.has(productDetail[colorKey])) {
              colorsArray.push({
                id: productDetail[colorKey]!,
                name: productDetail[`color${i}`]?.name || "",
                value: productDetail[`color${i}`]?.value || "",
              });
              colorSet.add(productDetail[colorKey]);
            }
          }
        });

        setSize(sizesArray);
        setColor(colorsArray);

      } catch (error) {
        toast.error(t("product.notFoundSizeAndColor"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  return (
    <>
    {
      loading ? <ColorSizeSkeleton nameSize={t("product.size")} nameColor={t("product.color")}/> : (
        <>
      <MobileFilter size={size} name={t("action.filter")} color={color} />
      {/* Desktop and laptop */}
      <div className="hidden lg:block">
        <div className="sticky top-20">
              <Filter valueKey="sizeId" name={t("product.size")} data={size} />
              <Filter valueKey="colorId" name={t("product.color")} data={color} />
        </div>
      </div>
        </>
      )
    }
    </>
  );
};

export default ColorSizeSideBar;
