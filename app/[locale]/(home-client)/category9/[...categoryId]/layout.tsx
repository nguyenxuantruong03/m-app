"use client";
import getBillboard from "@/actions/client/billboard/get-billboard";
import ColorSizeSideBar from "@/components/(client)/category/color-size-sidebar";
import BillboardCategorySkeleton from "@/components/(client)/skeleton/billboard-category-skeleton";
import BillboardCategory from "@/components/(client)/slider-item/billboard/billboard-category";
import Container from "@/components/ui/container";
import { Billboard } from "@/types/type";
import { useEffect, useState } from "react";


export default function CategoryLayout({
  children,
  params
}: {
  params: {
    categoryId: string | string[];
  };
  children: React.ReactNode;
}) {
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [billboardData] = await Promise.all([
          getBillboard(`${process.env.NEXT_PUBLIC_CATEGORIES9}`),
        ]);
        setBillboard(billboardData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <div className="mt-28 flex items-center justify-center px-2.5">
        {loading ? (
          <BillboardCategorySkeleton />
        ) : (
          <BillboardCategory data={billboard} />
        )}
      </div>
      <div className="px-4 sm:px-6 lg:px-8 mb-5 mt-10">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
        <ColorSizeSideBar categoryId={params.categoryId}/>
          {children}
        </div>
      </div>
    </Container>
  );
}
