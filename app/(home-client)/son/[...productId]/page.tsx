import Container from "@/components/ui/container";
import getProduct8 from "@/actions/client/product/get-product8";
import {
  getProducts8,
} from "@/actions/client/products/get-products";
import getProduct5 from "@/actions/client/product/get-product5";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const [product, suggestedProducts, suggestedProducts5] = await Promise.all([
    getProducts8(params.productId),
    getProduct8({}),
    getProduct5({})
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
        routeOtherSuggestions="son" 
        other={suggestedProducts5} 
        routeOther="product5"
        />
      </Container>
    </div>
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