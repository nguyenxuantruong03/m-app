import Container from "@/components/ui/container";
import { getProducts10 } from "@/actions/client/products/get-products";
import getProduct10 from "@/actions/client/product/get-product10";
import getProduct11 from "@/actions/client/product/get-product11";
import DetailProduct from "@/components/(client)/info-product/detail-product";

export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const [product, suggestedProducts, suggestedProducts11] = await Promise.all([
    getProducts10(params.productId),
    getProduct10({}),
    getProduct11({})
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
          routeProductType="bongden"
          other={suggestedProducts11}
          routeOther="product11"
        />
      </Container>
    </div>
  );
};

export default ProductPage;


export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts10(`${productId}`); //deduped!
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