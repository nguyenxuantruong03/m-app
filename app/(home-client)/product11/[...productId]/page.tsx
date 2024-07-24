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
  const [product, suggestedProducts, suggestedProducts7] = await Promise.all([
    getProducts11(params.productId),
    getProduct11({}),
    getProduct7({})
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
          routeOtherSuggestions="product9"
          productlistsuggest2={true}
          other={suggestedProducts7}
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