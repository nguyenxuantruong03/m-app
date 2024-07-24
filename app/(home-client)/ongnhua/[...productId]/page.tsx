import Container from "@/components/ui/container";
import { getProducts2 } from "@/actions/client/products/get-products";
import getProduct2 from "@/actions/client/product/get-product2";
import getProduct3 from "@/actions/client/product/get-product3";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const [product, suggestedProducts, suggestedProducts3] = await Promise.all([
    getProducts2(params.productId),
    getProduct2({}),
    getProduct3({})
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
          routeProductType="ongnhua"
          other={suggestedProducts3}
          routeOther="product3"
        />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:ProductPageProps ) {
  const post = await getProducts2(`${productId}`); //deduped!
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