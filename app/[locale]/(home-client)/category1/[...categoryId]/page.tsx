import Category1 from "./components/category1";
import { currentUser } from "@/lib/auth";
import { getCategories1 } from "@/actions/client/categories/get-categories";
import { getTranslations } from "next-intl/server";
export const revalidate = 7200;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  params,
  searchParams,
}) => {
  return (
      <Category1 params={params} searchParams={searchParams} />
  );
};

export default CategoryPage;

export async function generateMetadata({
  params: { categoryId },
}: CategoryPageProps) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "category"})
  // Assuming getCategories1 returns an array of categories
  const categories = await getCategories1();
  // Find the category by its id
  const category = categories.find((cat) => cat.id === categoryId[0]);
  // If category is found, get its name, else use a default message
  const categoryName = category ? category.name : t("categoryNotFound");

  return {
    title: categoryName,
  };
}
