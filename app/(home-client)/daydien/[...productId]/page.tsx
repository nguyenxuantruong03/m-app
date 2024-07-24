import Container from "@/components/ui/container";
import getProduct3 from "@/actions/client/product/get-product3";
import { getProducts3 } from "@/actions/client/products/get-products";
import getProduct10 from "@/actions/client/product/get-product10";
import DetailProduct from "@/components/(client)/info-product/detail-product";

export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const [product, suggestedProducts, suggestedProducts10] = await Promise.all([
    getProducts3(params.productId),
    getProduct3({}),
    getProduct10({})
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
          routeProductType="daydien"
          other={suggestedProducts10}
          routeOther="product10"
        />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts3(`${productId}`); //deduped!
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