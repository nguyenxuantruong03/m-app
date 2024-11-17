import getProduct from "@/actions/client/product/get-product";
import Container from "@/components/ui/container";
import { getProducts } from "@/actions/client/products/get-products";
import getProduct7 from "@/actions/client/product/get-product7";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const product = await getProducts(params.productId);
  const suggestedProducts = await getProduct({isFeatured: true});
  const suggestedProduct = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT"
  );
  const suggestedProduct7 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT7"
  );


  if (!product) {
    return null;
  }

  return (
      <Container>
        <DetailProduct
          data={product}
          images={product.images}
          otherSuggestions={suggestedProduct}
          routeOtherSuggestions="product0"
          other={suggestedProduct7}
          routeOther="product7"
        />
      </Container>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts(`${productId}`); //deduped!
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
