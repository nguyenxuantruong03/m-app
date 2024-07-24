import Container from "@/components/ui/container";
import {
  getProducts1,
} from "@/actions/client/products/get-products";
import getProduct1 from "@/actions/client/product/get-product1";
import getProduct4 from "@/actions/client/product/get-product4";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const [product, suggestedProducts, suggestedProducts4] = await Promise.all([
    getProducts1(params.productId),
    getProduct1({}),
    getProduct4({})
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
          productlistsuggest={true} 
          otherSuggestions={suggestedProducts} 
          routeProductType="quat" 
          other={suggestedProducts4} 
          routeOther="product4"
          />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts1(`${productId}`); //deduped!
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