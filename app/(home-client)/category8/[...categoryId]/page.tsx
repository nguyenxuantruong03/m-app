import { getCategories8 } from "@/actions/client/categories/get-categories";
import { getCategoryNotFoundMessage } from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import Category8 from "./components/category8";
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
      <Category8 params={params} searchParams={searchParams} />
  );
};

export default CategoryPage;

export async function generateMetadata({
  params: { categoryId },
}: CategoryPageProps) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  const categoryNotFoundMessage = getCategoryNotFoundMessage(languageToUse);
  // Assuming getCategories1 returns an array of categories
  const categories = await getCategories8();
  // Find the category by its id
  const category = categories.find((cat) => cat.id === categoryId[0]);
  // If category is found, get its name, else use a default message
  const categoryName = category ? category.name : categoryNotFoundMessage;

  return {
    title: categoryName,
  };
}
