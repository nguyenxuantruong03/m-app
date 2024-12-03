"use client";

import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { Order, ProductType } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getColorPrice,
  getSizePrice,
} from "../export-product-compare/size-color/match-color-size";
import {
  getOutOfStockMessage,
  getToastError,
  translateColorLowerCase,
  translateEnterContent,
  translateEvaluationSuccess,
  translateProductNotExist,
  translateProductReview,
  translateReviewed,
  translateSizes,
  translateSubmit,
  translateThankYouForReview,
} from "@/translate/translate-client";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | undefined;
  message?: string;
  title?: string;
  languageToUse: string;
}

export interface Comment {
  rating: number;
  comment: string;
  productId: string;
  product: any;
  id?: string;
  createdAt?: Date;
  user?: any;
  changeReview?: boolean;
  totalchange?: number | undefined;
}

interface CommentValues {
  [productId: string]: {
    comment: string;
    rating: number;
  };
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  message,
  title,
  order,
  languageToUse,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [commentValues, setCommentValues] = useState<CommentValues>({});
  const [data, setData] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //languages
  const toastErrorMessage = getToastError(languageToUse);
  const evaluationSuccessMessage = translateEvaluationSuccess(languageToUse);
  const productReviewMessage = translateProductReview(languageToUse);
  const thanksYouForReviewMessage = translateThankYouForReview(languageToUse);
  const productNotExitMessage = translateProductNotExist(languageToUse);
  const sizeMessage = translateSizes(languageToUse);
  const colorLowerCaseMessage = translateColorLowerCase(languageToUse);
  const outOfStockMessage = getOutOfStockMessage(languageToUse);
  const submitMessage = translateSubmit(languageToUse);
  const reviewedMessage = translateReviewed(languageToUse);
  const enterContentMessage = translateEnterContent(languageToUse);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (
    productId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentValues((prevValues) => ({
      ...prevValues,
      [productId]: {
        ...prevValues[productId],
        comment: event.target.value,
      },
    }));
  };

  const handleRatingChange = (productId: string, rating: number) => {
    setCommentValues((prevValues) => ({
      ...prevValues,
      [productId]: {
        ...prevValues[productId],
        rating,
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/comments`
        );
        setData(response.data);
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (productId: string) => {
    try {
      setLoading(true);
      const commentData = commentValues[productId];
      if (commentData) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
          productId,
          comment: commentData.comment,
          rating: commentData.rating,
        });

        // Fetch updated comments
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/comments`
        );
        setData(response.data); // Update state with new comments

        toast.success(evaluationSuccessMessage);
      }
    } catch (error) {
      toast.error(toastErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  //------------------------------Dựa vào cái này để ẩn đánh giá đi --------------------------------------
  // Determine which products have been reviewed already
  const reviewedProductIds = new Set(data.map((comment) => comment.productId));
  // const allReviewed = order.every((order) =>
  //   order.orderItem.every((item) => reviewedProductIds.has(item.id))
  // );
  if (!order) {
    return null;
  }
  return (
    <Modal
      title={title || productReviewMessage}
      description={message || thanksYouForReviewMessage}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        {order?.orderItem.map((item) => {
          const isReviewed = reviewedProductIds.has(item.id);

          const getRouteBasedOnProductType = (productType: any) => {
            switch (productType.toLowerCase()) {
              case "product":
                return "product0";
              case "product1":
                return "product1";
              case "product2":
                return "product2";
              case "product3":
                return "product3";
              case "product4":
                return "product4";
              case "product5":
                return "product5";
              case "product6":
                return "product6";
              case "product7":
                return "product7";
              case "product8":
                return "product8";
              case "product9":
                return "product9";
              case "product10":
                return "product10";
              case "product11":
                return "product11";
              default:
                return ""; // Handle the default case as needed
            }
          };

          const handleClick = (
            productType: ProductType,
            productName: string
          ) => {
            const route = getRouteBasedOnProductType(productType);
            if (route) {
              const href = `/${route}/${productName}`;
              router.push(href);
            } else {
              toast.error(toastErrorMessage);
            }
          };

          const getQuantityMatchColorandSize = () => {
            if (item.product && item.size && item.color) {
              const { price: priceSize } = getSizePrice(
                item.product,
                item.size
              );
              const { price: priceColor } = getColorPrice(
                item.product,
                item.color
              );
              const highestPrice = Math.max(priceSize, priceColor);

              switch (highestPrice) {
                case item.product.productdetail.price5 *
                  ((100 - item.product.productdetail.percentpromotion5) / 100):
                  return item.product.productdetail.quantity5;
                case item.product.productdetail.price4 *
                  ((100 - item.product.productdetail.percentpromotion4) / 100):
                  return item.product.productdetail.quantity4;
                case item.product.productdetail.price3 *
                  ((100 - item.product.productdetail.percentpromotion3) / 100):
                  return item.product.productdetail.quantity3;
                case item.product.productdetail.price2 *
                  ((100 - item.product.productdetail.percentpromotion2) / 100):
                  return item.product.productdetail.quantity2;
                default:
                  return item.product.productdetail.quantity1;
              }
            }
          };

          const quantity = getQuantityMatchColorandSize();

          if (!item.product) {
            return (
              <div key={item.id} className="text-red-500">
                {productNotExitMessage}
              </div>
            );
          }
          return (
            <>
              <div key={item.id} className="mb-4">
                {/* Display the product information */}
                <div
                  key={item.product?.id}
                  className="flex items-center justify-between my-4 cursor-pointer bg-gray-200 bg-opacity-50 p-3 rounded-md"
                  onClick={() => {
                    if (item.product?.productType && item.product?.name) {
                      handleClick(item.product.productType, item.product?.name);
                    }
                  }}
                >
                  <Image
                    width="50"
                    height="50"
                    src={item.product?.images[0].url || ""}
                    alt="404"
                  />
                  <span className="grid grid-rows-2">
                    {item.product?.heading}{" "}
                    <span className="flex items-center">
                      {sizeMessage}: {item.size} + {colorLowerCaseMessage}:
                      {
                        <div
                          className="h-4 w-4 rounded-full ml-2"
                          style={{ backgroundColor: item.color }}
                        />
                      }
                    </span>
                  </span>
                  <span className="text-sm">
                    {quantity === 0 ? (
                      <span className="text-gray-500">{outOfStockMessage}</span>
                    ) : (
                      <span>x{item.quantity}</span>
                    )}
                  </span>
                </div>

                {/* Conditional rendering based on whether the product is reviewed or not */}
                {!isReviewed ? (
                  <>
                    <div className="flex items-center space-x-1 mt-5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() =>
                            handleRatingChange(item.product!.id, star)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {star <=
                          (commentValues[item.product!.id]?.rating || 0) ? (
                            <Star
                              stroke="rgb(255, 186, 90)"
                              fill="rgb(255, 186, 90)"
                            />
                          ) : (
                            <Star
                              stroke="rgb(169, 169, 169)"
                              fill="rgb(169, 169, 169)"
                            />
                          )}
                        </span>
                      ))}
                    </div>
                    <Input
                      placeholder={enterContentMessage}
                      maxLength={120} // Set maximum length
                      value={commentValues[item.product!.id]?.comment || ""}
                      onChange={(e) => handleChange(item.product!.id, e)}
                    />
                    <p className="text-right text-sm text-gray-500">
                      {commentValues[item.product!.id]?.comment.length || 0}
                      /120
                    </p>{" "}
                    {/* Character count display */}
                    <div className="flex justify-end items-center space-x-3">
                      <Button
                        disabled={loading}
                        onClick={() => handleSubmit(item.product!.id)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        {submitMessage}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500">{reviewedMessage}</div>
                )}
              </div>
            </>
          );
        })}
      </div>
    </Modal>
  );
};
