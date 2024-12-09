"use client";
import * as z from "zod";
import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Minus, Plus, Trash } from "lucide-react";
import { Category, Size, Color, ProductDetail } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Textarea } from "@/components/ui/textarea";
import Recommend from "@/components/ui/recommend";
import {
  getProductDetailForm,
  getProductDetailFormSchema,
  getProductDetailHandle,
} from "@/translate/translate-dashboard";

interface ProductDetailFormProps {
  initialData: ProductDetail | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  language: string;
}

export const ProductDetailForm: React.FC<ProductDetailFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
  language,
}) => {
  const params = useParams();
  const router = useRouter();

  //language
  const productDetailSchemaMessage = getProductDetailFormSchema(language);
  const productDetailHandleMessgae = getProductDetailHandle(language);
  const productDetailFormMessgae = getProductDetailForm(language);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name1Value, setName1Value] = useState(initialData?.name1 || "");
  const [name2Value, setName2Value] = useState(initialData?.name2 || "");
  const [name3Value, setName3Value] = useState(initialData?.name3 || "");
  const [name4Value, setName4Value] = useState(initialData?.name4 || "");
  const [name5Value, setName5Value] = useState(initialData?.name5 || "");
  const [description1Change, setDescription1Chnage] = useState(
    initialData?.descriptionspecifications || ""
  );
  const [value1Specifications, setValue1Specifications] = useState(
    initialData?.valuespecifications || ""
  );

  const [description2Change, setDescription2Chnage] = useState(
    initialData?.description2specifications || ""
  );
  const [value2Specifications, setValue2Specifications] = useState(
    initialData?.value2specifications || ""
  );

  const [description3Change, setDescription3Chnage] = useState(
    initialData?.description3specifications || ""
  );
  const [value3Specifications, setValue3Specifications] = useState(
    initialData?.value3specifications || ""
  );

  const [description4Change, setDescription4Chnage] = useState(
    initialData?.description4specifications || ""
  );
  const [value4Specifications, setValue4Specifications] = useState(
    initialData?.value4specifications || ""
  );

  const [description5Change, setDescription5Chnage] = useState(
    initialData?.description5specifications || ""
  );
  const [value5Specifications, setValue5Specifications] = useState(
    initialData?.value5specifications || ""
  );

  const [description6Change, setDescription6Chnage] = useState(
    initialData?.description6specifications || ""
  );
  const [value6Specifications, setValue6Specifications] = useState(
    initialData?.value6specifications || ""
  );

  const [description7Change, setDescription7Chnage] = useState(
    initialData?.description7specifications || ""
  );
  const [value7Specifications, setValue7Specifications] = useState(
    initialData?.value7specifications || ""
  );

  const [description8Change, setDescription8Chnage] = useState(
    initialData?.description8specifications || ""
  );
  const [value8Specifications, setValue8Specifications] = useState(
    initialData?.value8specifications || ""
  );

  const [description9Change, setDescription9Chnage] = useState(
    initialData?.description9specifications || ""
  );
  const [value9Specifications, setValue9Specifications] = useState(
    initialData?.value9specifications || ""
  );

  const [description10Change, setDescription10Chnage] = useState(
    initialData?.description10specifications || ""
  );
  const [value10Specifications, setValue10Specifications] = useState(
    initialData?.value10specifications || ""
  );

  const [description11Change, setDescription11Chnage] = useState(
    initialData?.description11specifications || ""
  );
  const [value11Specifications, setValue11Specifications] = useState(
    initialData?.value11specifications || ""
  );

  const [description12Change, setDescription12Chnage] = useState(
    initialData?.description12specifications || ""
  );
  const [value12Specifications, setValue12Specifications] = useState(
    initialData?.value12specifications || ""
  );

  const [description13Change, setDescription13Chnage] = useState(
    initialData?.description13specifications || ""
  );
  const [value13Specifications, setValue13Specifications] = useState(
    initialData?.value13specifications || ""
  );

  const handleDescription1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription1Chnage(event.target.value);
  };

  const handleValue1SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue1Specifications(event.target.value);
  };

  const bothFields1Filled =
    description1Change !== "" && value1Specifications !== "";

  const handleDescription2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription2Chnage(event.target.value);
  };
  const handleValue2SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue2Specifications(event.target.value);
  };

  const bothFields2Filled =
    description2Change !== "" && value2Specifications !== "";

  const handleDescription3Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription3Chnage(event.target.value);
  };
  const handleValue3SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue3Specifications(event.target.value);
  };

  const bothFields3Filled =
    description3Change !== "" && value3Specifications !== "";
  const handleDescription4Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription4Chnage(event.target.value);
  };
  const handleValue4SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue4Specifications(event.target.value);
  };

  const bothFields4Filled =
    description4Change !== "" && value4Specifications !== "";
  const handleDescription5Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription5Chnage(event.target.value);
  };
  const handleValue5SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue5Specifications(event.target.value);
  };

  const bothFields5Filled =
    description5Change !== "" && value5Specifications !== "";
  const handleDescription6Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription6Chnage(event.target.value);
  };
  const handleValue6SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue6Specifications(event.target.value);
  };

  const bothFields6Filled =
    description6Change !== "" && value6Specifications !== "";
  const handleDescription7Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription7Chnage(event.target.value);
  };
  const handleValue7SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue7Specifications(event.target.value);
  };

  const bothFields7Filled =
    description7Change !== "" && value7Specifications !== "";
  const handleDescription8Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription8Chnage(event.target.value);
  };
  const handleValue8SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue8Specifications(event.target.value);
  };

  const bothFields8Filled =
    description8Change !== "" && value8Specifications !== "";
  const handleDescription9Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription9Chnage(event.target.value);
  };
  const handleValue9SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue9Specifications(event.target.value);
  };

  const bothFields9Filled =
    description9Change !== "" && value9Specifications !== "";
  const handleDescription10Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription10Chnage(event.target.value);
  };
  const handleValue10SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue10Specifications(event.target.value);
  };

  const bothFields10Filled =
    description10Change !== "" && value10Specifications !== "";
  const handleDescription11Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription11Chnage(event.target.value);
  };
  const handleValue11SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue11Specifications(event.target.value);
  };

  const bothFields11Filled =
    description11Change !== "" && value11Specifications !== "";
  const handleDescription12Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription12Chnage(event.target.value);
  };
  const handleValue12SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue12Specifications(event.target.value);
  };

  const bothFields12Filled =
    description12Change !== "" && value12Specifications !== "";
  const handleDescription13Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription13Chnage(event.target.value);
  };
  const handleValue13SpecificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue13Specifications(event.target.value);
  };

  const bothFields13Filled =
    description13Change !== "" && value13Specifications !== "";

  //Logic dùng để +1 hoặc -1 description và value khi click vào plus hoặc minus
  const [visiblePairs, setVisiblePairs] = useState(0);
  // Định nghĩa một biến state để xác định hướng của sự thay đổi
  const [increase, setIncrease] = useState(true);

  const togglePairs = () => {
    setVisiblePairs((prevVisiblePairs) => {
      if (prevVisiblePairs === 12) {
        setIncrease(false); // Khi đạt giá trị 12, chuyển hướng đi sang giảm dần
      } else if (prevVisiblePairs === 0) {
        setIncrease(true); // Khi đạt giá trị 0, chuyển hướng đi sang tăng dần
      }

      // Dựa vào hướng đi, thực hiện tăng hoặc giảm giá trị
      if (increase) {
        return prevVisiblePairs + 1;
      } else {
        return prevVisiblePairs - 1;
      }
    });
  };

  const handleName1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName1Value(event.target.value);
  };

  const handleName2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName2Value(event.target.value);
  };

  const handleName3Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName3Value(event.target.value);
  };

  const handleName4Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName4Value(event.target.value);
  };

  const handleName5Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName5Value(event.target.value);
  };

  const formSchema = z.object({
    title: z
      .string()
      .min(2, { message: productDetailSchemaMessage.minTwoCharacters }),
    promotionheading: z
      .string()
      .min(2, { message: productDetailSchemaMessage.minTwoCharacters }),
    promotiondescription: z
      .string()
      .min(2, { message: productDetailSchemaMessage.minTwoCharacters }),
    warranty1: z.optional(z.coerce.number().min(0)),
    warranty2: z.optional(z.coerce.number().min(0)),
    warranty3: z.optional(z.coerce.number().min(0)),
    warranty4: z.optional(z.coerce.number().min(0)),
    // Specification
    descriptionspecifications: z
      .string()
      .min(2, { message: productDetailSchemaMessage.minTwoCharacters }),
    valuespecifications: z
      .string()
      .min(2, { message: productDetailSchemaMessage.minTwoCharacters }),
    description2specifications: z.optional(z.string().min(0)),
    value2specifications: z.optional(z.string().min(0)),
    description3specifications: z.optional(z.string().min(0)),
    value3specifications: z.optional(z.string().min(0)),
    description4specifications: z.optional(z.string().min(0)),
    value4specifications: z.optional(z.string().min(0)),
    description5specifications: z.optional(z.string().min(0)),
    value5specifications: z.optional(z.string().min(0)),
    description6specifications: z.optional(z.string().min(0)),
    value6specifications: z.optional(z.string().min(0)),
    description7specifications: z.optional(z.string().min(0)),
    value7specifications: z.optional(z.string().min(0)),
    description8specifications: z.optional(z.string().min(0)),
    value8specifications: z.optional(z.string().min(0)),
    description9specifications: z.optional(z.string().min(0)),
    value9specifications: z.optional(z.string().min(0)),
    description10specifications: z.optional(z.string().min(0)),
    value10specifications: z.optional(z.string().min(0)),
    description11specifications: z.optional(z.string().min(0)),
    value11specifications: z.optional(z.string().min(0)),
    description12specifications: z.optional(z.string().min(0)),
    value12specifications: z.optional(z.string().min(0)),
    description13specifications: z.optional(z.string().min(0)),
    value13specifications: z.optional(z.string().min(0)),
    description14specifications: z.optional(z.string().min(0)),
    value14specifications: z.optional(z.string().min(0)),
    // salientfeatures:
    descriptionsalientfeatures: z
      .string()
      .min(2, { message: productDetailSchemaMessage.minTwoCharacters }),
    description2salientfeatures: z
      .string()
      .min(0),
    description3salientfeatures: z
      .string()
      .min(0),
    description4salientfeatures: z
      .string()
      .min(0),
    contentsalientfeatures: z
      .string()
      .min(2, { message: productDetailSchemaMessage.minTwoCharacters }),
    size1Id: z
      .string()
      .min(1, { message: productDetailSchemaMessage.chooseValidSize }),
    color1Id: z
      .string()
      .min(0, { message: productDetailSchemaMessage.chooseValidColor }),
    size2Id: z.optional(z.string().min(0)),
    color2Id: z.optional(z.string().min(0)),
    size3Id: z.optional(z.string().min(0)),
    color3Id: z.optional(z.string().min(0)),
    size4Id: z.optional(z.string().min(0)),
    color4Id: z.optional(z.string().min(0)),
    size5Id: z.optional(z.string().min(0)),
    color5Id: z.optional(z.string().min(0)),
    price1: z.coerce
      .number()
      .min(500, { message: productDetailSchemaMessage.minAmount }),
    price2: z.optional(z.coerce.number().min(0)),
    price3: z.optional(z.coerce.number().min(0)),
    price4: z.optional(z.coerce.number().min(0)),
    price5: z.optional(z.coerce.number().min(0)),
    name1: z
      .string()
      .min(2, { message: productDetailSchemaMessage.minTwoCharacters }),
    name2: z.optional(z.string().min(0)),
    name3: z.optional(z.string().min(0)),
    name4: z.optional(z.string().min(0)),
    name5: z.optional(z.string().min(0)),
    percentpromotion1: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailSchemaMessage.percentageRange })
    ),
    percentpromotion2: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailSchemaMessage.percentageRange })
    ),
    percentpromotion3: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailSchemaMessage.percentageRange })
    ),
    percentpromotion4: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailSchemaMessage.percentageRange })
    ),
    percentpromotion5: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailSchemaMessage.percentageRange })
    ),
    quantity1: z.coerce
      .number()
      .int()
      .min(1, { message: productDetailSchemaMessage.quantityRange })
      .max(9999, { message: productDetailSchemaMessage.quantityRange }),
    quantity2: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(9999, { message: productDetailSchemaMessage.quantityRange })
    ),
    quantity3: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(9999, { message: productDetailSchemaMessage.quantityRange })
    ),
    quantity4: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(9999, { message: productDetailSchemaMessage.quantityRange })
    ),
    quantity5: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(9999, { message: productDetailSchemaMessage.quantityRange })
    ),
    categoryId: z
      .string()
      .min(1, { message: productDetailSchemaMessage.chooseValidCategory }),
  });

  type ProductDetailFormValues = z.infer<typeof formSchema>;

  const title = initialData
    ? productDetailHandleMessgae.editProductDetail
    : productDetailHandleMessgae.createProductDetail;
  const description = initialData
    ? productDetailHandleMessgae.editAProductDetail
    : productDetailHandleMessgae.addNewProductDetail;
  const action = initialData
    ? productDetailHandleMessgae.saveChanges
    : productDetailHandleMessgae.create;

  const form = useForm<ProductDetailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          warranty1: parseFloat(String(initialData?.warranty1)) || 0,
          warranty2: parseFloat(String(initialData?.warranty2)) || 0,
          warranty3: parseFloat(String(initialData?.warranty3)) || 0,
          warranty4: parseFloat(String(initialData?.warranty4)) || 0,
          price1: parseFloat(String(initialData?.price1)),
          percentpromotion1: parseFloat(String(initialData?.percentpromotion1)),
          price2: parseFloat(String(initialData?.price2)) || null || undefined,
          percentpromotion2:
            parseFloat(String(initialData?.percentpromotion2)) ||
            null ||
            undefined,
          price3: parseFloat(String(initialData?.price3)) || null || undefined,
          percentpromotion3:
            parseFloat(String(initialData?.percentpromotion3)) ||
            null ||
            undefined,
          price4: parseFloat(String(initialData?.price4)) || null || undefined,
          percentpromotion4:
            parseFloat(String(initialData?.percentpromotion4)) ||
            null ||
            undefined,
          price5: parseFloat(String(initialData?.price5)) || null || undefined,
          percentpromotion5:
            parseFloat(String(initialData?.percentpromotion5)) ||
            null ||
            undefined,
          size1Id: initialData.size1Id,
          color1Id: initialData.color1Id,
          size2Id: initialData.size2Id || null || undefined,
          color2Id: initialData.color2Id || null || undefined,
          size3Id: initialData.size3Id || null || undefined,
          color3Id: initialData.color3Id || null || undefined,
          size4Id: initialData.size4Id || null || undefined,
          color4Id: initialData.color4Id || null || undefined,
          size5Id: initialData.size5Id || null || undefined,
          color5Id: initialData.color5Id || null || undefined,
          name1: initialData.name1,
          name2: initialData.name2 || null || undefined,
          name3: initialData.name3 || null || undefined,
          name4: initialData.name4 || null || undefined,
          name5: initialData.name5 || null || undefined,
          quantity1: initialData.quantity1,
          quantity2: initialData.quantity2 || null || undefined,
          quantity3: initialData.quantity3 || null || undefined,
          quantity4: initialData.quantity4 || null || undefined,
          quantity5: initialData.quantity5 || null || undefined,
          descriptionspecifications: initialData.descriptionspecifications,
          valuespecifications: initialData.valuespecifications,
          description2specifications:
            initialData.description2specifications || null || undefined,
          value2specifications:
            initialData.value2specifications || null || undefined,
          description3specifications:
            initialData.description3specifications || null || undefined,
          value3specifications:
            initialData.value3specifications || null || undefined,
          description4specifications:
            initialData.description4specifications || null || undefined,
          value4specifications:
            initialData.value4specifications || null || undefined,
          description5specifications:
            initialData.description5specifications || null || undefined,
          value5specifications:
            initialData.value5specifications || null || undefined,
          description6specifications:
            initialData.description6specifications || null || undefined,
          value6specifications:
            initialData.value6specifications || null || undefined,
          description7specifications:
            initialData.description7specifications || null || undefined,
          value7specifications:
            initialData.value7specifications || null || undefined,
          description8specifications:
            initialData.description8specifications || null || undefined,
          value8specifications:
            initialData.value8specifications || null || undefined,
          description9specifications:
            initialData.description9specifications || null || undefined,
          value9specifications:
            initialData.value9specifications || null || undefined,
          description10specifications:
            initialData.description10specifications || null || undefined,
          value10specifications:
            initialData.value10specifications || null || undefined,
          description11specifications:
            initialData.description11specifications || null || undefined,
          value11specifications:
            initialData.value11specifications || null || undefined,
          description12specifications:
            initialData.description12specifications || null || undefined,
          value12specifications:
            initialData.value12specifications || null || undefined,
          description13specifications:
            initialData.description13specifications || null || undefined,
          value13specifications:
            initialData.value13specifications || null || undefined,
          description14specifications:
            initialData.description14specifications || null || undefined,
          value14specifications:
            initialData.value14specifications || null || undefined,
          descriptionsalientfeatures: initialData.descriptionsalientfeatures,
          description2salientfeatures: initialData.description2salientfeatures,
          description3salientfeatures: initialData.description3salientfeatures,
          description4salientfeatures: initialData.description4salientfeatures,
          contentsalientfeatures: initialData.contentsalientfeatures,
        }
      : {
          title: "",
          warranty1: 0 || null || undefined,
          warranty2: 0 || null || undefined,
          warranty3: 0 || null || undefined,
          warranty4: 0 || null || undefined,
          size1Id: "",
          color1Id: "",
          size2Id: "",
          color2Id: "",
          size3Id: "",
          color3Id: "",
          size4Id: "",
          color4Id: "",
          size5Id: "",
          color5Id: "",
          price1: 0,
          percentpromotion1: 0,
          price2: 0 || null || undefined,
          percentpromotion2: 0 || null || undefined,
          price3: 0 || null || undefined,
          percentpromotion3: 0 || null || undefined,
          price4: 0 || null || undefined,
          percentpromotion4: 0 || null || undefined,
          price5: 0 || null || undefined,
          percentpromotion5: 0 || null || undefined,
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          quantity1: 0 || null || undefined,
          quantity2: 0 || null || undefined,
          quantity3: 0 || null || undefined,
          quantity4: 0 || null || undefined,
          quantity5: 0 || null || undefined,
          categoryId: "",
          descriptionspecifications: "",
          valuespecifications: "",
          description2specifications: "",
          value2specifications: "",
          description3specifications: "",
          value3specifications: "",
          description4specifications: "",
          value4specifications: "",
          description5specifications: "",
          value5specifications: "",
          description6specifications: "",
          value6specifications: "",
          description7specifications: "",
          value7specifications: "",
          description8specifications: "",
          value8specifications: "",
          description9specifications: "",
          value9specifications: "",
          description10specifications: "",
          value10specifications: "",
          description11specifications: "",
          value11specifications: "",
          description12specifications: "",
          value12specifications: "",
          description13specifications: "",
          value13specifications: "",
          description14specifications: "",
          value14specifications: "",
          descriptionsalientfeatures: "",
          description2salientfeatures: "",
          description3salientfeatures: "",
          description4salientfeatures: "",
          contentsalientfeatures: "",
        },
  });

  const onSubmit = async (data: ProductDetailFormValues) => {
    try {
      setLoading(true);
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/productdetail/${params.productdetailId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/productdetail`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                {productDetailHandleMessgae.productDetail}
                <span className="font-bold">{response.data?.title}</span>{" "}
                {productDetailHandleMessgae.updated}.
              </p>
            );
          } else {
            return (
              <p>
                {productDetailHandleMessgae.productDetail}{" "}
                <span className="font-bold">{data.title}</span>{" "}
                {productDetailHandleMessgae.created}.
              </p>
            );
          }
        }),
        {
          loading: productDetailHandleMessgae.updatingProductDetail,
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/productdetail`);
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return productDetailHandleMessgae.somethingWentWrong;
            }
          },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/productdetail/${params.productdetailId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/productdetail`);
      toast.success(productDetailHandleMessgae.productDeleted);
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(productDetailHandleMessgae.somethingWentWrong);
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("title-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        languageToUse={language}
      />
      {/* update and create */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-6 gap-6 overflow-y-auto">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {productDetailFormMessgae.title}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={productDetailFormMessgae.enterTitle} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="title-input"
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterTitlePlaceholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {productDetailFormMessgae.productName1}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={productDetailFormMessgae.enterProductName1}
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterProductName1Placeholder
                      }
                      {...field}
                      onChange={(event) => {
                        handleName1Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-orange-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name1Value && (
              <>
                <FormField
                  control={form.control}
                  name="price1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex space-x-3 items-center">
                        {productDetailFormMessgae.productPrice1}{" "}
                        <span className="text-red-600 pl-1">(*)</span>
                        <Recommend
                          message={productDetailFormMessgae.enterProductPrice1}
                        />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterProductPrice1Placeholder
                          }
                          {...field}
                          className="border-2 border-orange-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="percentpromotion1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex space-x-3 items-center">
                        {productDetailFormMessgae.discountProduct1}{" "}
                        <span className="text-red-600 pl-1">(*)</span>
                        <Recommend
                          message={productDetailFormMessgae.discountDescription}
                        />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterDiscountProduct1
                          }
                          {...field}
                          className="border-2 border-orange-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex space-x-3 items-center">
                        {productDetailFormMessgae.stockProduct1}{" "}
                        <span className="text-red-600 pl-1">(*)</span>
                        <Recommend
                          message={productDetailFormMessgae.stockDescription}
                        />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterStockProduct1
                          }
                          {...field}
                          className="border-2 border-orange-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="name2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormMessgae.productName2}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterProductName2Placeholder
                      }
                      {...field}
                      onChange={(event) => {
                        handleName2Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-green-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name2Value && (
              <>
                <FormField
                  control={form.control}
                  name="price2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productPrice2}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterProductPrice2Placeholder
                          }
                          {...field}
                          className="border-2 border-green-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="percentpromotion2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.discountProduct2}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterDiscountProduct2
                          }
                          {...field}
                          className="border-2 border-green-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.stockProduct2}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterStockProduct2
                          }
                          {...field}
                          className="border-2 border-green-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="name3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormMessgae.productName3}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterProductName3Placeholder
                      }
                      {...field}
                      onChange={(event) => {
                        handleName3Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-sky-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name3Value && (
              <>
                <FormField
                  control={form.control}
                  name="price3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productPrice3}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterProductPrice3Placeholder
                          }
                          {...field}
                          className="border-2 border-sky-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="percentpromotion3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.discountProduct3}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterDiscountProduct3
                          }
                          {...field}
                          className="border-2 border-sky-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.stockProduct3}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterStockProduct3
                          }
                          {...field}
                          className="border-2 border-sky-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="name4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormMessgae.productName4}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterProductName4Placeholder
                      }
                      {...field}
                      onChange={(event) => {
                        handleName4Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-violet-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name4Value && (
              <>
                <FormField
                  control={form.control}
                  name="price4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productPrice4}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterProductPrice4Placeholder
                          }
                          {...field}
                          className="border-2 border-violet-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="percentpromotion4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.discountProduct4}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterDiscountProduct4
                          }
                          {...field}
                          className="border-2 border-violet-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.stockProduct4}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterStockProduct4
                          }
                          {...field}
                          className="border-2 border-violet-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="name5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormMessgae.productName5}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterProductName5Placeholder
                      }
                      {...field}
                      onChange={(event) => {
                        handleName5Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-pink-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name5Value && (
              <>
                <FormField
                  control={form.control}
                  name="price5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productPrice5}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterProductPrice5Placeholder
                          }
                          {...field}
                          className="border-2 border-pink-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="percentpromotion5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.discountProduct5}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterDiscountProduct5
                          }
                          {...field}
                          className="border-2 border-pink-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.stockProduct5}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterStockProduct5
                          }
                          {...field}
                          className="border-2 border-pink-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              name="promotionheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {productDetailFormMessgae.wholesaleDiscount}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={productDetailFormMessgae.wholesaleDescription}
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterWholesaleDiscount
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="promotiondescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {productDetailFormMessgae.contractorDiscount}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={productDetailFormMessgae.contractorDescription}
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterContractorDiscount
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warranty1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <span className="mr-3">
                      {productDetailFormMessgae.warrantyPrice1}{" "}
                    </span>
                    <Recommend
                      message={productDetailFormMessgae.warrantyDescription}
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormMessgae.enterWarrantyPrice1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warranty2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormMessgae.warrantyPrice2}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormMessgae.enterWarrantyPrice2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warranty3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormMessgae.warrantyPrice3}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormMessgae.enterWarrantyPrice3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warranty4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormMessgae.warrantyPrice4}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormMessgae.enterWarrantyPrice4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="descriptionspecifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {productDetailFormMessgae.specifications}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={productDetailFormMessgae.enterSpecifications}
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterSpecificationsPlaceholder
                      }
                      {...field}
                      onChange={(event) => {
                        handleDescription1Change(event);
                        field.onChange(event);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="valuespecifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {productDetailFormMessgae.specificationsContent}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={
                        productDetailFormMessgae.enterSpecificationsContent
                      }
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterSpecificationsContentPlaceholder
                      }
                      {...field}
                      onChange={(event) => {
                        handleValue1SpecificationsChange(event);
                        field.onChange(event);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(bothFields1Filled || visiblePairs >= 1) && (
              <>
                <FormField
                  name="description2specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription2Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value2specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue2SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {(bothFields2Filled || visiblePairs >= 2) && (
              <>
                <FormField
                  name="description3specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription3Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value3specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue3SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {(bothFields3Filled || visiblePairs >= 3) && (
              <>
                <FormField
                  name="description4specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription4Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value4specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue4SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {(bothFields4Filled || visiblePairs >= 4) && (
              <>
                <FormField
                  name="description5specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription5Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value5specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue5SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {(bothFields5Filled || visiblePairs >= 5) && (
              <>
                <FormField
                  name="description6specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription6Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value6specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue6SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {(bothFields6Filled || visiblePairs >= 6) && (
              <>
                <FormField
                  name="description7specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription7Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value7specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue7SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {(bothFields7Filled || visiblePairs >= 7) && (
              <>
                <FormField
                  name="description8specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription8Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value8specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue8SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {(bothFields8Filled || visiblePairs >= 8) && (
              <>
                <FormField
                  name="description9specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription9Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value9specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue9SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {(bothFields9Filled || visiblePairs >= 9) && (
              <>
                <FormField
                  name="description10specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription10Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value10specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue10SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {(bothFields10Filled || visiblePairs >= 10) && (
              <>
                <FormField
                  name="description11specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription11Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value11specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue11SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {(bothFields11Filled || visiblePairs >= 11) && (
              <>
                <FormField
                  name="description12specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription12Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value12specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue12SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {(bothFields12Filled || visiblePairs >= 12) && (
              <>
                <FormField
                  name="description13specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleDescription13Change(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value13specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                          onChange={(event) => {
                            handleValue13SpecificationsChange(event);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {(bothFields13Filled || visiblePairs >= 13) && (
              <>
                <FormField
                  name="description14specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specifications}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsPlaceholder
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="value14specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.specificationsContent}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={
                            productDetailFormMessgae.enterSpecificationsContentPlaceholder
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <span
              onClick={!loading ? togglePairs : () => {}}
              className={`dark:bg-white dark:hover:bg-slate-100 bg-black hover:bg-slate-900 flex justify-center space-y-2 items-center rounded-md  h-1/2 my-3 xl:my-auto ${
                loading ? "cursor-no-drop opacity-50" : "cursor-pointer"
              }`}
            >
              {visiblePairs === 0 || increase ? (
                <Plus className="dark:text-black text-white" />
              ) : (
                <Minus className="dark:text-black text-white" />
              )}
            </span>

            <FormField
              name="descriptionsalientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {productDetailFormMessgae.featureDescription}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={
                        productDetailFormMessgae.featureDescriptionContent
                      }
                    />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterFeatureDescription
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description2salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormMessgae.featureDescription}{" "}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterFeatureDescription
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description3salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormMessgae.featureDescription}{" "}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterFeatureDescription
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description4salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormMessgae.featureDescription}{" "}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={
                        productDetailFormMessgae.enterFeatureDescription
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="contentsalientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {productDetailFormMessgae.featureContent}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={
                        productDetailFormMessgae.featureContentDescription
                      }
                    />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={productDetailFormMessgae.enterFeatureContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name1Value && (
              <>
                <FormField
                  control={form.control}
                  name="color1Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productColor1}
                        <span className="text-red-600 pl-1">(*)</span>
                      </FormLabel>
                      <Input
                        list="colors1"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedColor = colors.find(
                            (color) => color.name === enteredValue
                          );
                          if (selectedColor) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedColor.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectColor}
                        className="border-2 border-orange-400 "
                      />
                      <datalist id="colors1">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size1Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productSize1}
                        <span className="text-red-600 pl-1">(*)</span>
                      </FormLabel>
                      <Input
                        list="sizes1"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedSize = sizes.find(
                            (size) => size.name === enteredValue
                          );
                          if (selectedSize) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedSize.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectSize}
                        className="border-2 border-orange-400 "
                      />
                      <datalist id="sizes1">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            {name2Value && (
              <>
                <FormField
                  control={form.control}
                  name="color2Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productColor2}
                      </FormLabel>
                      <Input
                        list="colors2"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedColor = colors.find(
                            (color) => color.name === enteredValue
                          );
                          if (selectedColor) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedColor.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectColor}
                        className="border-2 border-green-400 "
                      />
                      <datalist id="colors2">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size2Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productSize2}
                      </FormLabel>
                      <Input
                        list="sizes2"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedSize = sizes.find(
                            (size) => size.name === enteredValue
                          );
                          if (selectedSize) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedSize.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectSize}
                        className="border-2 border-green-400 "
                      />
                      <datalist id="sizes2">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            {name3Value && (
              <>
                <FormField
                  control={form.control}
                  name="color3Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productColor3}
                      </FormLabel>
                      <Input
                        list="colors3"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedColor = colors.find(
                            (color) => color.name === enteredValue
                          );
                          if (selectedColor) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedColor.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectColor}
                        className="border-2 border-sky-400 "
                      />
                      <datalist id="colors3">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size3Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productSize3}
                      </FormLabel>
                      <Input
                        list="sizes3"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedSize = sizes.find(
                            (size) => size.name === enteredValue
                          );
                          if (selectedSize) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedSize.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectSize}
                        className="border-2 border-sky-400 "
                      />
                      <datalist id="sizes3">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            {name4Value && (
              <>
                <FormField
                  control={form.control}
                  name="color4Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productColor4}
                      </FormLabel>
                      <Input
                        list="colors4"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedColor = colors.find(
                            (color) => color.name === enteredValue
                          );
                          if (selectedColor) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedColor.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectColor}
                        className="border-2 border-violet-400 "
                      />
                      <datalist id="colors4">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size4Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productSize4}
                      </FormLabel>
                      <Input
                        list="sizes4"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedSize = sizes.find(
                            (size) => size.name === enteredValue
                          );
                          if (selectedSize) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedSize.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectSize}
                        className="border-2 border-violet-400 "
                      />
                      <datalist id="sizes4">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            {name5Value && (
              <>
                <FormField
                  control={form.control}
                  name="color5Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productColor5}
                      </FormLabel>
                      <Input
                        list="colors5"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedColor = colors.find(
                            (color) => color.name === enteredValue
                          );
                          if (selectedColor) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedColor.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectColor}
                        className="border-2 border-pink-400 "
                      />
                      <datalist id="colors5">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size5Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {productDetailFormMessgae.productSize5}
                      </FormLabel>
                      <Input
                        list="sizes5"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const selectedSize = sizes.find(
                            (size) => size.name === enteredValue
                          );
                          if (selectedSize) {
                            // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                            field.onChange(selectedSize.id);
                          } else {
                            // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                            field.onChange(enteredValue);
                          }
                        }}
                        value={
                          field.value
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder={productDetailFormMessgae.selectSize}
                        className="border-2 border-pink-400 "
                      />
                      <datalist id="sizes5">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormMessgae.category}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <Input
                    list="categories"
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      const selectedCategory = categories.find(
                        (categorie) => categorie.name === enteredValue
                      );
                      if (selectedCategory) {
                        // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                        field.onChange(selectedCategory.id);
                      } else {
                        // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                        field.onChange(enteredValue);
                      }
                    }}
                    value={
                      field.value
                        ? categories.find(
                            (categorie) => categorie.id === field.value
                          )?.name
                        : ""
                    }
                    disabled={loading}
                    placeholder={productDetailFormMessgae.selectCategory}
                  />
                  <datalist id="categories">
                    {categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.name} />
                    ))}
                  </datalist>
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
