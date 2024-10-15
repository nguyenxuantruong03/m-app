"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useTransition,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import your Select component
import { Button } from "@/components/ui/button";
import { PostSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { post } from "@/actions/client/post";
import { Category, Product } from "@/types/type";
import ImageUpload from "@/components/ui/image-upload";
import toast from "react-hot-toast";
import { Loader, Earth, Lock, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategory } from "@/actions/client/categories/get-all-category";
import { getAllProductNotQuery } from "@/actions/client/products/get-products";
interface FormPostExploreProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  reviews: any;
  id?: string;
  userId?: string;
}

const MAX_CHAR_COUNT = 200;

const FormPostExplore = ({ setOpen, reviews, id, userId }: FormPostExploreProps) => {
  const router = useRouter();
  const { update } = useSession();

  console.log("review",reviews.find((review: { id: string }) => review.id === id))

  const [categories, setCategories] = useState<any>([]);
  const [products, setProducts] = useState<any>({}); // Update to store products as an object
  const [filteredProducts, setFilteredProducts] = useState<any>([]); // Initialize as an empty array
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRatingIndex, setSelectedRatingIndex] = useState<number | null>(
    reviews.find((review: { id: string }) => review.id === id)?.rating || 1
  );
  const [isPublic, setIsPublic] = useState(
    reviews.find((review: { id: string }) => review.id === id)?.isPublic ||
      "public"
  );
  const [remainingChars, setRemainingChars] = useState(MAX_CHAR_COUNT);

  const [isPending, startTransition] = useTransition();
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  useEffect(() => {
    const inputElement = document.getElementById("content-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  // useEffect cho categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategory(true);

        // Lấy categories
        const allCategories = await getAllCategory();
        setCategories(allCategories);
      } catch {
        toast.error("Dữ liệu hệ thống không tìm thấy!");
      } finally {
        setLoadingCategory(false);
      }
    };

    // Sử dụng setTimeout để trì hoãn 1.5 giây
    const timer = setTimeout(() => {
      fetchCategories();
    }, 1500);

    // Clear timeout khi component unmount
    return () => clearTimeout(timer);
  }, []);

  // useEffect cho products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProduct(true);

        // Lấy products
        const allProducts = await getAllProductNotQuery();
        setProducts(allProducts);
      } catch {
        toast.error("Dữ liệu hệ thống không tìm thấy!");
      } finally {
        setLoadingProduct(false);
      }
    };

    // Sử dụng setTimeout để trì hoãn 1.5 giây
    const timer = setTimeout(() => {
      fetchProducts();
    }, 1500);

    // Clear timeout khi component unmount
    return () => clearTimeout(timer);
  }, []);

  // Update filtered products whenever the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const flattenedProducts = Object.values(products).flat(); // Flatten the object into an array
      const filtered = flattenedProducts.filter(
        (product: any) => product.productdetail.category.id === selectedCategory
      );
      setFilteredProducts(filtered); // Set the filtered products
    } else {
      setFilteredProducts(Object.values(products).flat()); // Reset to all products if no category selected
    }
  }, [selectedCategory, products]);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues:
      reviews && Array.isArray(reviews) && id
        ? {
            content:
              reviews.find((review: { id: string }) => review.id === id)
                ?.content || "",
            categoryName:
              reviews.find((review: { id: string }) => review.id === id)
                ?.categoryName || "",
            productId:
              reviews.find((review: { id: string }) => review.id === id)
                ?.productId || "",
            rating:
              reviews.find((review: { id: string }) => review.id === id)
                ?.rating || 1,
            imageReview:
              reviews
                .find((review: { id: string }) => review.id === id)
                ?.imageReview?.map((image: { url: string }) => image) || [],
            isPublic:
              reviews.find((review: { id: string }) => review.id === id)
                ?.isPublic || "public",
          }
        : {
            content: "",
            imageReview: [],
            categoryName: "",
            productId: "",
            rating: 1,
            isPublic: "public",
          },
  });

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = event.target;

    // Remove leading spaces (no indentation allowed at the beginning)
    value = value.trimStart();

    const newLength = value.length;

    // Set remaining characters to be at least 0
    setRemainingChars(Math.max(MAX_CHAR_COUNT - newLength, 0));

    // Limit the input to 200 characters
    form.setValue("content", value.slice(0, MAX_CHAR_COUNT));
  };

  const onSubmit = (values: z.infer<typeof PostSchema>) => {
    const createdAt = reviews.filter(
      (review: { userId: string }) => review.userId === userId
    )[0]?.createdAt;

    if (!id) {
    if (createdAt) {
      const now = new Date();
      const diff = now.getTime() - new Date(createdAt).getTime(); // Chuyển đổi createdAt thành đối tượng Date
      const diffHours = diff / (1000 * 60 * 60); // Tính sự khác biệt về giờ
      const diffMinutes = Math.ceil((diff % (1000 * 60 * 60)) / (1000 * 60)); // Tính số phút còn lại
    
      // Nếu dưới 24 giờ
      if (diffHours < 24) {
        if (diffHours < 1) {
          // Nếu còn dưới 1 giờ
          return toast.error(`Mỗi ngày chỉ được đăng 1 bài. Hãy quay lại sau ${diffMinutes} phút nữa!`); // Hiển thị số phút còn lại
        } else {
          const hoursRemaining = Math.ceil(24 - diffHours); // Tính số giờ còn lại và làm tròn lên
          return toast.error(`Mỗi ngày chỉ được đăng 1 bài. Hãy quay lại sau ${hoursRemaining} giờ nữa!`); // Hiển thị số giờ còn lại
        }
      }
    }
  }
    
    if (!values.content) {
      return toast.error("Vui lòng nhập nội dung sản phẩm!");
    }

    if (values.content.length < 2) {
      return toast.error("Vui lòng nhập nội dung chi tiết hơn!");
    }

    if (!values.isPublic) {
      return toast.error("Vui lòng chọn chế độ bài viết!");
    }

    if (!values.rating) {
      return toast.error("Vui lòng chọn chất lượng sản phẩm!");
    }

    if (!values.categoryName || values.categoryName === "empty") {
      return toast.error("Vui lòng chọn danh mục sản phẩm!");
    }

    if (!values.productId || values.productId === "empty") {
      return toast.error("Vui lòng chọn sản phẩm phù hợp!");
    }

    // Automatically remove only trailing spaces from content
    values.content = values.content.trimEnd();

    startTransition(() => {
      post(values, id)
        .then((data) => {
          if (data.error) {
            toast.error(`${data.error}`);
          }
          if (data.success) {
            update();
            router.refresh();
            toast.success(`${data.success}`);
            setOpen?.(false);
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="content-input"
                      {...field}
                      placeholder="Bạn đang nghĩ gì?"
                      disabled={isPending}
                      autoComplete="off"
                      onChange={handleContentChange} // Attach the change handler
                      className="border-none focus:outline-none focus:ring-0 focus:shadow-none bg-slate-900 text-white resize-none" // Add resize-none if you want to disable resizing
                      rows={4}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-end text-sm text-gray-500">
              Còn {remainingChars} ký tự nữa
            </p>
          </div>
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-500">Chế độ</FormLabel>
                <FormControl>
                  <div className="flex space-x-4">
                    <div
                      onClick={() => {
                        setIsPublic("public"); // Set state to true for Công khai
                        field.onChange("public"); // Update form field
                      }}
                      className={`cursor-pointer px-4 py-2 rounded-md text-white flex items-center ${
                        isPublic === "public" ? "border border-green-600 " : ""
                      }`}
                    >
                      <Earth className="mr-1 h-5 w-5" /> Công khai
                    </div>
                    <div
                      onClick={() => {
                        setIsPublic("individual"); // Set state to false for Cá nhân
                        field.onChange("individual"); // Update form field
                      }}
                      className={`cursor-pointer px-4 py-2 rounded-md text-white flex items-center ${
                        isPublic === "individual" ? "border border-green-600" : ""
                      }`}
                    >
                      <Lock className="w-5 h-5 mr-1" /> Cá nhân
                    </div>
                    <div
                      onClick={() => {
                        setIsPublic("follow"); // Set state to false for Cá nhân
                        field.onChange("follow"); // Update form field
                      }}
                      className={`cursor-pointer px-4 py-2 rounded-md text-white flex items-center ${
                        isPublic === "follow" ? "border border-green-600" : ""
                      }`}
                    >
                      <User className="w-5 h-5 mr-1" /> Theo dõi
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-500">Trạng thái</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-4">
                    {" "}
                    {/* Adjusted grid layout */}
                    {[
                      "🤩Rất hài lòng",
                      "🥰Khá hài lòng",
                      "🤨Không hài lòng",
                      "😔Tệ",
                    ].map((rating, index) => (
                      <p
                        key={index}
                        onClick={() => {
                          setSelectedRatingIndex(index + 1); // Set index (1-based)
                          field.onChange(index + 1); // Update the form value with the index (1-based)
                        }}
                        className={`cursor-pointer text-white p-2 rounded-md ${
                          selectedRatingIndex === index + 1
                            ? "border border-green-600"
                            : ""
                        }`}
                      >
                        {rating}
                      </p>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageReview"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-500">
                  Hình ảnh mô tả sản phẩm
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={isPending}
                    onChange={(url) => {
                      if (field.value.length < 4) {
                        field.onChange([...field.value, { url }]);
                      } else {
                        toast.error("Chỉ chọn 4 ảnh sản phẩm chi tiết nhất.");
                      }
                    }}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                    maxFiles={4}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 space-x-1">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">Category</FormLabel>
                  <Select
                    onValueChange={(id) => {
                      const selectedCategory = categories.find(
                        (categorie: Category) => categorie.id === id
                      );
                      if (selectedCategory) {
                        field.onChange(selectedCategory.name); // Set categoryName là name
                        setSelectedCategory(id); // Set ID của danh mục đã chọn để lọc

                        // Kiểm tra nếu sản phẩm hiện tại không còn phù hợp với danh mục mới
                        const currentProductId = form.getValues("productId"); // Lấy giá trị sản phẩm hiện tại
                        const isProductValid = filteredProducts.some(
                          (product: Product) =>
                            product.productdetail.category.id === id &&
                            product.heading === currentProductId
                        );

                        if (!isProductValid) {
                          form.setValue("productId", ""); // Đặt lại sản phẩm nếu không còn phù hợp
                        }
                      }
                    }}
                    value={
                      categories.find(
                        (categorie: any) => categorie.name === field.value
                      )?.id || ""
                    } // Lấy ID dựa trên name
                    disabled={isPending || loadingCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length === 0 ? (
                        <SelectItem disabled value="empty">
                          Trống
                        </SelectItem>
                      ) : (
                        categories.map((categorie: Category) => (
                          <SelectItem key={categorie.id} value={categorie.id}>
                            {categorie.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Product Select */}
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">Product</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value || ""}
                    disabled={isPending || loadingProduct}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredProducts.length === 0 ? (
                        <SelectItem disabled value="empty">
                          Trống
                        </SelectItem>
                      ) : (
                        filteredProducts.map((product: Product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.heading}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          {(loadingCategory || loadingProduct) && (
            <>
              <Loader className="h-10 w-10 text-muted-foreground animate-spin" />
              <p className="text-gray-300 mt-2">Loading...</p>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2 justify-end">
          <Button
            variant="secondary"
            onClick={() => setOpen?.(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            className="text-white"
            variant="primary"
            type="submit"
            disabled={isPending || loadingCategory || loadingProduct}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormPostExplore;
