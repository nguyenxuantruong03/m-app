import Container from "@/components/ui/container";
import getProduct11 from "@/actions/client/product/get-product11";
import { getProducts11 } from "@/actions/client/products/get-products";
import getProduct7 from "@/actions/client/product/get-product7";
import DetailProduct from "@/components/(client)/info-product/detail-product";

export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const product = await getProducts11(params.productId);
  const suggestedProducts = await getProduct11({ isFeatured: true });
  const suggestedProduct11 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT11"
  );
  const suggestedProduct7 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT7"
  );
  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <DetailProduct
          data={product}
          images={product.images}
          otherSuggestions={suggestedProduct11}
          routeOtherSuggestions="product11"
          productlistsuggest2={true}
          other={suggestedProduct7}
          routeOther="ocam"
        />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts11(`${productId}`); //deduped!
//deduped loại bỏ trùng lặp trong quá trình xây dựng 
  if (!post) {
    return {
      title: "Product Not Found",
    }
  }
  return {
    title: post.heading,
  };
}