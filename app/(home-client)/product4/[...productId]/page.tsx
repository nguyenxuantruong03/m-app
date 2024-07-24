import Container from "@/components/ui/container";
import getProduct4 from "@/actions/client/product/get-product4";
import { getProducts4 } from "@/actions/client/products/get-products";
import getProduct2 from "@/actions/client/product/get-product2";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const [product, suggestedProducts, suggestedProducts2] = await Promise.all([
    getProducts4(params.productId),
    getProduct4({}),
    getProduct2({})
  ]);
  
  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <DetailProduct
          data={product}
          images={product.images}
          otherSuggestions={suggestedProducts}
          routeOtherSuggestions="product4"
          other={suggestedProducts2}
          routeOther="product2"
        />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts4(`${productId}`); //deduped!
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