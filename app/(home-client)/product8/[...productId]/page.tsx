import Container from "@/components/ui/container";
import getProduct8 from "@/actions/client/product/get-product8";
import { getProducts8 } from "@/actions/client/products/get-products";
import getProduct3 from "@/actions/client/product/get-product3";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const product = await getProducts8(params.productId);
  const suggestedProducts = await getProduct8({ isFeatured: true });
  const suggestedProduct8 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT8"
  );
  const suggestedProduct3 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT3"
  );
  if (!product) {
    return null;
  }

  return (
      <Container>
        <DetailProduct
          data={product}
          images={product.images}
          otherSuggestions={suggestedProduct8}
          routeOtherSuggestions="product8"
          productlistsuggest2={true}
          other={suggestedProduct3}
          routeOther="product3"
        />
      </Container>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts8(`${productId}`); //deduped!
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