"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { commentcolor } from "@/components/(client)/color/color";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPage from "./emoji";
import Container from "@/components/ui/container";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useParams } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import { ResponseComment, Comment as CommentType } from "@/types/type";
import { PolicyViolationModal } from "../modal/policy-violation-modal";
import vi from "date-fns/locale/vi";
import en from "date-fns/locale/en-US";
import { useTranslations } from "next-intl";
import CommentResponse from "./response/response";
import FormComment from "./form_comment";
import CardComment from "./card_comment";

export const locales = {
  vi,
  en,
};

interface CommentProps {
  data: string;
  nameProduct: string;
  commentData?: CommentType[];
  responsecommentData?: ResponseComment[];
}
const Comment: React.FC<CommentProps> = ({
  data,
  nameProduct,
  commentData,
  responsecommentData,
}) => {
  const t = useTranslations();
  const user = useCurrentUser();
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [savedComments, setSavedComments] = useState<CommentType[]>([]);
  const [commentError, setCommentError] = useState<string>("");
  const [ratingError, setRatingError] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [commentsByRating, setCommentsByRating] = useState<{
    [key: number]: CommentType[];
  }>({});
  const [collapsedComments, setCollapsedComments] = useState<boolean>(false);
  const stars = Array(5).fill(0);

  // Use an object to store response descriptions for each comment
  const [responseDescriptions, setResponseDescriptions] = useState("");
  const [showResponseForm, setShowResponseForm] = useState<string | null>(null);
  const [errorResponse, setErrorResponse] = useState<string>("");
  const [showResponseComments, setShowResponseComments] = useState<
    string | null
  >(null);
  const [editingResponseId, setEditingResponseId] = useState<string | null>(
    null
  );
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [openComment, setOpenComment] = useState(false);
  const [openCommentResponse, setOpenCommentResponse] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState<
    string | undefined
  >("");
  const [commentResponseIdToDelete, setCommentResponseIdToDelete] = useState<{
    commentId: string | undefined;
    id: string;
  }>({ commentId: undefined, id: "" });
  const [commentNameToDelete, setCommentNameToDelete] = useState<
    string | undefined
  >("");
  const [alertGuestModal, setAlertGuestModal] = useState(false);
  const [policiViolationModal, setPoliciViolationModal] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const optionRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number | null>(null);

  const handleEllipsisClick = (commentId: string | null) => {
    setShowOptions(showOptions === commentId ? null : commentId);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionRef.current &&
      !optionRef.current.contains(event.target as Node)
    ) {
      setShowOptions(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteCommentresponse = async (
    commentId: string | undefined,
    id: string
  ) => {
    if (user?.role !== "GUEST" && user?.id) {
      setLoading(true);
      try {
        await toast.promise(
          axios
            .delete(
              `/api/${param.storeId}/comments/${commentId}/responsecomment`,
              {
                data: { id: id },
              }
            )
            .then(() => {
              // Update the local state to remove the deleted comment
              setSavedComments((prevComments) =>
                prevComments.map((comment) => {
                  // Find the comment to update
                  if (comment.id === commentId) {
                    // Remove the response with the specified id
                    comment.responses = comment.responses?.filter(
                      (response) => response.id !== id
                    );
                  }
                  return comment;
                })
              );
              setOpenCommentResponse(false);
              setEditingResponseId(null);
              setResponseDescriptions("");
              setShowResponseForm(null);
            }),
          {
            loading: t("loading.loadingDelete"),
            success: <span>{t("comment.deleteSuccess")}</span>,
            error: <span>{t("comment.deleteUnsuccessful")}</span>,
          }
        );
      } catch (error) {
        toast.error(t("toastError.somethingWentWrong"));
      } finally {
        setLoading(false);
      }
    } else {
      setAlertGuestModal(true);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!commentData) {
          return null;
        }

        if (!responsecommentData) {
          return null;
        }
        setLoading(true);
        const fetchedComments: CommentType[] = commentData;

        const updatedComments = await Promise.all(
          fetchedComments.map(async (comment) => {
            try {
              setLoading(true);
              const responseComments: ResponseComment[] = responsecommentData;
              return { ...comment, responses: responseComments };
            } catch (error) {
              toast.error(t("toastError.somethingWentWrong"));
              return comment; // Return the original comment if there's an error
            } finally {
              setLoading(false);
            }
          })
        );
        setSavedComments(updatedComments);

        const commentsByRating: { [key: number]: CommentType[] } =
          updatedComments.reduce((acc, comment) => {
            if (acc[comment.rating]) {
              acc[comment.rating].push(comment);
            } else {
              acc[comment.rating] = [comment];
            }
            return acc;
          }, {} as { [key: number]: CommentType[] });

        setCommentsByRating(commentsByRating);
      } catch (error) {
        toast.error(t("toastError.somethingWentWrong"));
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [param.storeId]);

  const handleDeleteComment = async (commentId: string | undefined) => {
    if (user?.role !== "GUEST" && user?.id) {
      setLoading(true);

      try {
        await toast.promise(
          axios
            .delete(`/api/${param.storeId}/comments/`, {
              data: { id: commentId },
            })
            .then(() => {
              // Remove the deleted comment from the state
              setSavedComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== commentId)
              );

              // Update commentsByRating if needed
              setCommentsByRating((prevCommentsByRating) => {
                const newCommentsByRating = { ...prevCommentsByRating };
                Object.keys(newCommentsByRating).forEach((rating) => {
                  newCommentsByRating[rating as any] = newCommentsByRating[
                    rating as any
                  ].filter((comment) => comment.id !== commentId);
                });
                return newCommentsByRating;
              });

              setOpenComment(false);
            }),
          {
            loading: t("loading.loadingDelete"),
            success: <span>{t("comment.deleteSuccess")}</span>,
            error: <span>{t("comment.deleteUnsuccessful")}</span>,
          }
        );
      } catch (error) {
        toast.error(t("toastError.somethingWentWrong"));
      } finally {
        setLoading(false);
      }
    } else {
      setAlertGuestModal(true);
    }
  };

  // Theo dõi sự thay đổi của savedComments và log dữ liệu
  useEffect(() => {}, [savedComments]);

  const calculateTotalReviews = () => {
    return savedComments.filter((comment) => comment.productId === data).length;
  };

  // Use the calculateTotalReviews function to get the total reviews for the current productId
  const totalReviews = calculateTotalReviews();

  const starReviewCounts: number[] = [0, 0, 0, 0, 0];

  savedComments
    .filter((comment) => comment.productId === data)
    .forEach((savedComment) => {
      if (savedComment.rating >= 1 && savedComment.rating <= 5) {
        starReviewCounts[savedComment.rating - 1]++;
      }
    });

  const calculateAverageRating = (productName: string) => {
    const productComments = savedComments.filter(
      (comment) => comment.productId === productName
    );

    const totalStarsGiven = productComments.reduce(
      (total, savedComment) => total + savedComment.rating,
      0
    );

    const totalReviews = productComments.length;

    if (totalReviews === 0) {
      return 0;
    }
    const averageRating = totalStarsGiven / totalReviews;
    return Math.min(averageRating, 5);
  };

  const renderStars = (integerPart: number, fractionalPart: number) => {
    const starElements = [];

    // Render full stars for the integer part
    for (let i = 0; i < integerPart; i++) {
      starElements.push(
        <Star
          key={i}
          size={24}
          color={commentcolor.orange}
          style={{
            marginRight: 10,
          }}
          stroke="rgb(255, 186, 90)"
          fill="rgb(255, 186, 90)"
        />
      );
    }

    // Render a partially filled star for the fractional part
    if (fractionalPart > 0) {
      starElements.push(
        <Star
          key={integerPart}
          size={24}
          color={commentcolor.orange}
          style={{
            marginRight: 10,
            clipPath: `polygon(0 0, ${fractionalPart * 100}% 0, ${
              fractionalPart * 100
            }% 100%, 0% 100%)`,
          }}
          stroke="rgb(255, 186, 90)"
          fill="rgb(255, 186, 90)"
        />
      );
    }

    // Render grey stars for the remaining empty stars
    const remainingStars = 5 - starElements.length;
    for (let i = 0; i < remainingStars; i++) {
      starElements.push(
        <Star
          key={integerPart + i + 1}
          size={24}
          color={commentcolor.grey}
          style={{
            marginRight: 10,
          }}
          stroke="rgb(169, 169, 169)"
          fill="rgb(169, 169, 169)"
        />
      );
    }
    return starElements;
  };

  return (
    <Container>
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
      />

      <PolicyViolationModal
        isOpen={policiViolationModal}
        onClose={() => setPoliciViolationModal(false)}
        value={comment || responseDescriptions}
        setResponseDescriptions={setResponseDescriptions}
        setComment={setComment}
      />

      <AlertModal
        message={t("comment.confirmDeleteComment", {
          commentNameToDelete: commentNameToDelete,
        })}
        isOpen={openComment}
        onClose={() => setOpenComment(false)}
        onConfirm={() => handleDeleteComment(commentIdToDelete)}
        loading={loading}
      />

      <AlertModal
        message={t("comment.confirmDeleteResponse", {
          commentNameToDelete: commentNameToDelete,
        })}
        isOpen={openCommentResponse}
        onClose={() => setOpenCommentResponse(false)}
        onConfirm={() =>
          handleDeleteCommentresponse(
            commentResponseIdToDelete.commentId,
            commentResponseIdToDelete.id
          )
        }
        loading={loading}
      />

      <div className="p-4 shadow-lg dark:border-slate-800 dark:border my-6 rounded-md">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-200">
          {t("comment.reviewAndComment")} - {nameProduct}
        </h2>
        <div className="grid md:grid-cols-2 shadow-inner p-2">
          <div className="m-auto">
            <h3 className="font-bold text-3xl text-slate-900 dark:text-slate-200">
              {calculateAverageRating(data).toFixed(1)}/5
            </h3>
            <h3 className="flex text-slate-900 dark:text-slate-200">
              {renderStars(
                Math.floor(calculateAverageRating(data)),
                calculateAverageRating(data) % 1
              )}
            </h3>
            <h3 className="text-slate-900 dark:text-slate-200">
              {totalReviews} {t("comment.reviewAndCommentLowercase")}
            </h3>
          </div>

          <div>
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div
                key={star}
                className={`flex w-full ${star < 5 ? "mt-2" : ""}`}
              >
                <span className="text-slate-900 dark:text-slate-200">
                  {star}
                </span>
                <Star
                  size={24}
                  color={commentcolor.orange}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  stroke="rgb(255, 186, 90)"
                  fill="rgb(255, 186, 90)"
                />
                <div
                  style={{
                    width: `${
                      (starReviewCounts[star - 1] / totalReviews) * 100
                    }%`,
                    backgroundImage: commentcolor.gradient,
                    minHeight: "16px",
                    borderRadius: "20px",
                  }}
                />
                <h3 className="ml-auto text-slate-900 dark:text-slate-200">
                  {starReviewCounts[star - 1]} {t("comment.reviewLowercase")}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <FormComment
          user={user}
          textareaRef={textareaRef}
          stars={stars}
          rating={rating}
          currentValue={currentValue}
          commentError={commentError}
          ratingError={ratingError}
          comment={comment}
          loading={loading}
          editingCommentId={editingCommentId}
          scrollPositionRef={scrollPositionRef}
          setEditingCommentId={setEditingCommentId}
          setRating={setRating}
          setComment={setComment}
          setCurrentValue={setCurrentValue}
          setCommentError={setCommentError}
          setRatingError={setRatingError}
          setPoliciViolationModal={setPoliciViolationModal}
          setErrorResponse={setErrorResponse}
          setLoading={setLoading}
          setSavedComments={setSavedComments}
          setCommentsByRating={setCommentsByRating}
          setAlertGuestModal={setAlertGuestModal}
          savedComments={savedComments}
          data={data}
          commentsByRating={commentsByRating}
        />

        {Object.entries(commentsByRating)
          .sort(([ratingA], [ratingB]) => parseInt(ratingB) - parseInt(ratingA))
          .map(([rating, comments]) => (
            <div key={rating}>
              {(collapsedComments ||
                rating === "5" ||
                rating === "4" ||
                rating === "3") && (
                <div className="mt-10">
                  <ul>
                    {comments
                      .filter((comment) => comment.productId === data)
                      .sort((a, b) => b.rating - a.rating)
                      .map((comment, index) => (
                        <li key={comment.id} className="mb-8">
                          {/* Card comment */}
                          <CardComment
                            comment={comment}
                            nameProduct={nameProduct}
                            user={user}
                            setShowOptions={setShowOptions}
                            showOptions={showOptions}
                            handleEllipsisClick={handleEllipsisClick}
                            setCommentIdToDelete={setCommentIdToDelete}
                            setCommentNameToDelete={setCommentNameToDelete}
                            setOpenComment={setOpenComment}
                            loading={loading}
                            setEditingCommentId={setEditingCommentId}
                            setRating={setRating}
                            setComment={setComment}
                            setCurrentValue={setCurrentValue}
                            setCommentError={setCommentError}
                            setRatingError={setRatingError}
                            setAlertGuestModal={setAlertGuestModal}
                            savedComments={savedComments}
                            textareaRef={textareaRef}
                            scrollPositionRef={scrollPositionRef}
                            stars={stars}
                            optionRef={optionRef}
                            rating={rating}
                          />

                          {/* Response Comment */}
                          <CommentResponse
                            comment={comment}
                            setLoading={setLoading}
                            handleEllipsisClick={handleEllipsisClick}
                            showOptions={showOptions}
                            optionRef={optionRef}
                            editingResponseId={editingResponseId}
                            setShowOptions={setShowOptions}
                            responseDescriptions={responseDescriptions}
                            showResponseComments={showResponseComments}
                            setShowResponseForm={setShowResponseForm}
                            setEditingResponseId={setEditingResponseId}
                            setResponseDescriptions={setResponseDescriptions}
                            setErrorResponse={setErrorResponse}
                            user={user}
                            setAlertGuestModal={setAlertGuestModal}
                            setOpenCommentResponse={setOpenCommentResponse}
                            setCommentResponseIdToDelete={
                              setCommentResponseIdToDelete
                            }
                            setCommentNameToDelete={setCommentNameToDelete}
                            savedComments={savedComments}
                            setSavedComments={setSavedComments}
                            setPoliciViolationModal={setPoliciViolationModal}
                            data={data}
                            loading={loading}
                            showResponseForm={showResponseForm}
                            errorResponse={errorResponse}
                          />

                          {/* Emoji */}
                          <EmojiPage
                            commentId={comment?.id || ""}
                            setShowResponseForm={setShowResponseForm}
                            setShowResponseComments={setShowResponseComments}
                            showResponseComments={showResponseComments}
                            setEditingResponseId={setEditingResponseId}
                            setResponseDescriptions={setResponseDescriptions}
                            setErrorResponse={setErrorResponse}
                            product={comment?.product?.name}
                            productId={comment?.productId}
                            userId={user?.id || ""}
                            role={user?.role}
                            setAlertGuestModal={setAlertGuestModal}
                            responseComment={
                              comment.responses?.filter(
                                (response) => response.commentId === comment.id
                              ).length || 0
                            }
                            responsesLength={
                              comment.responses?.filter(
                                (response) => response.commentId === comment.id
                              ).length || 0
                            }
                            loading={loading}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        <button
          disabled={loading}
          onClick={() => {
            setCollapsedComments(!collapsedComments);
          }}
          className={`rounded px-2 md:px-28 md:py-2 py-1 mb-2 ml-[140px] md:ml-[220px] lg:ml-[512px]  ${
            collapsedComments ? " text-white" : "text-white"
          }`}
          style={{
            backgroundImage: collapsedComments
              ? commentcolor.gradienthover
              : commentcolor.gradient,
          }}
        >
          {collapsedComments ? t("action.collapse") : t("relatedTag.see_all")}
        </button>
      </div>
    </Container>
  );
};

export default Comment;