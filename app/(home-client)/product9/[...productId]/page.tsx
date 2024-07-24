import Container from "@/components/ui/container";
import getProduct9 from "@/actions/client/product/get-product9";
import { getProducts9 } from "@/actions/client/products/get-products";
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
    getProducts9(params.productId),
    getProduct9({}),
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
          otherSuggestions={suggestedProducts}
          routeOtherSuggestions="product9"
          productlistsuggest2={true}
          other={suggestedProducts10}
          routeProductType="bongden"
        />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts9(`${productId}`); //deduped!
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