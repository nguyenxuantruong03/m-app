"use client";
import axios from "axios";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { commentcolor } from "@/components/(client)/color/color";
import { Star, Trash2, Pencil, Ellipsis } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPage from "./emoji";
import Container from "@/components/ui/container";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useParams } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import CircleAvatar from "@/components/ui/circle-avatar";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import Link from "next/link";
import { ResponseComment, Comment as CommentType } from "@/types/type";
import {
  getToastError,
  translateCancel,
  translateCollapse,
  translateComment,
  translateConfirmDeleteComment,
  translateConfirmDeleteFeedback,
  translateDayAgo,
  translateDelete,
  translateDeleteSuccess,
  translateDeleteUnsuccessful,
  translateDeleting,
  translateEdit,
  translateEditedTimes,
  translateEditFailure,
  translateEditing,
  translateEditSuccess,
  translateEnterFeedback,
  translateEnterFeedbackContent,
  translateEnterReviewContent,
  translateEvaluating,
  translateEvaluationFailure,
  translateEvaluationSuccess,
  translateFeedbackEmpty,
  translateFeedbackFailure,
  translateHourAgo,
  translateInputTooLong,
  translateJustNow,
  translateMinutesAgo,
  translateMonthAgo,
  translateNotRatedYet,
  translateOneDayAgo,
  translateOneHourAgo,
  translateOneMonthAgo,
  translateOneYearAgo,
  translatePleaseChooseStar,
  translateProcessingResponse,
  translateProduct,
  translateRate,
  translateRating,
  translateResponse,
  translateRetryAfter,
  translateRetryAfterMinutes,
  translateRetryFeedback,
  translateReviewAndComment,
  translateReviewAndCommentLowercase,
  translateReviewLowercase,
  translateSeeAll,
  translateStarsLowercase,
  translateSuccessResponse,
  translateUpdate,
  translateUpdateError,
  translateYearAgo,
} from "@/translate/translate-client";
import { PolicyViolationModal } from "../modal/policy-violation-modal";
import { offensiveWords } from "@/vn_offensive_words";

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
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [savedComments, setSavedComments] = useState<CommentType[]>([]);
  const [commentError, setCommentError] = useState<string>("");
  const [ratingError, setRatingError] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [commentsByRating, setCommentsByRating] = useState<{
    [key: number]: CommentType[];
  }>({});
  const [collapsedComments, setCollapsedComments] = useState<boolean>(false);
  const stars = Array(5).fill(0);
  const stars1 = Array(1).fill(0);

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
  const [policiViolationModal, setPoliciViolationModal] = useState(false)
  const optionRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number | null>(null);
  const textareaResponseRef = useRef<HTMLDivElement>(null);
  const scrollPositionResponseRef = useRef<number | null>(null);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  const user = useCurrentUser();

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

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const toastErrorMessage = getToastError(languageToUse);
  const feedbackEmptyMessage = translateFeedbackEmpty(languageToUse);
  const processingReponseMessage = translateProcessingResponse(languageToUse);
  const successResponseMessage = translateSuccessResponse(languageToUse);
  const feedBackFailureMessage = translateFeedbackFailure(languageToUse);
  const deletingMessage = translateDeleting(languageToUse);
  const deleteSuccessMessage = translateDeleteSuccess(languageToUse);
  const deleteUnsuccessfulMessage = translateDeleteUnsuccessful(languageToUse);
  const editingMessage = translateEditing(languageToUse);
  const editSuccessMessage = translateEditSuccess(languageToUse);
  const editFailureMessage = translateEditFailure(languageToUse);
  const updateErrorMessage = translateUpdateError(languageToUse);
  const pleaseChooseStarMessage = translatePleaseChooseStar(languageToUse);
  const enterFeedBackMessage = translateEnterFeedback(languageToUse);
  const productMessage = translateProduct(languageToUse);
  const evaluatingMessage = translateEvaluating(languageToUse);
  const evaluationSuccessMessage = translateEvaluationSuccess(languageToUse);
  const evaluationFailureMessage = translateEvaluationFailure(languageToUse);
  const oneYearAgoMessage = translateOneYearAgo(languageToUse);
  const yearAgoMessage = translateYearAgo(languageToUse);
  const oneMonthAgoMessage = translateOneMonthAgo(languageToUse);
  const monthAgoMessage = translateMonthAgo(languageToUse);
  const oneDayAgoMessage = translateOneDayAgo(languageToUse);
  const dayAgoMessage = translateDayAgo(languageToUse);
  const oneHourAgoMessage = translateOneHourAgo(languageToUse);
  const hourAgoMessage = translateHourAgo(languageToUse);
  const minuteAgoMessage = translateMinutesAgo(languageToUse);
  const justNowMessage = translateJustNow(languageToUse);
  const confirmDeleteCommentMessage = translateConfirmDeleteComment(
    languageToUse,
    commentNameToDelete
  );
  const confirmDeleteResponseMessage = translateConfirmDeleteFeedback(
    languageToUse,
    commentNameToDelete
  );
  const reviewAndCommentMessage = translateReviewAndComment(languageToUse);
  const reviewAndCommentMessageLowercaseMessage =
    translateReviewAndCommentLowercase(languageToUse);
  const reviewLowercaseMessage = translateReviewLowercase(languageToUse);
  const ratingMessage = translateRating(languageToUse);
  const enterReviewContentMessage = translateEnterReviewContent(languageToUse);
  const enterFeedbackContentMessage =
    translateEnterFeedbackContent(languageToUse);
  const updateMessage = translateUpdate(languageToUse);
  const cancelMessage = translateCancel(languageToUse);
  const rateMessage = translateRate(languageToUse);
  const commentMessage = translateComment(languageToUse);
  const editMessage = translateEdit(languageToUse);
  const deleteMessage = translateDelete(languageToUse);
  const responseMessage = translateResponse(languageToUse);
  const collapseMessage = translateCollapse(languageToUse);
  const seeAllMessage = translateSeeAll(languageToUse);
  const startLowercaseMessagae = translateStarsLowercase(languageToUse);
  const notRatedYetMessage = translateNotRatedYet(languageToUse);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const handleResponseSubmit = async (commentId: any) => {
    if (user?.role !== "GUEST" && user?.id) {
      try {
        //Check xúc phạm
        const containsOffensiveWord = offensiveWords.some((word) =>
          responseDescriptions.includes(word)
        );
        if (containsOffensiveWord) {
          setPoliciViolationModal(true); 
          return; 
        }

        //Logic này đùng để giới hạn thời gian responsecomment
        const now = new Date();
        const firstCreatedAt = savedComments
          .filter((comment) => {
            // Ensure responsecomment is defined and filter based on user ID
            const responsecomment = comment.responses || []; // Use an empty array if undefined
            return responsecomment.some(
              (response) => user?.id === response.user.id
            );
          })
          .flatMap((comment) => {
            // Get all createdAt from responsecomment
            const responsecomment = comment.responses || [];
            return responsecomment
              .filter(
                (response) =>
                  response.user.id === user?.id && response.createdAt
              ) // Check if createdAt is defined
              .map((response) => response.createdAt!); // Use non-null assertion since we've filtered undefined
          })
          // Sort by createdAt in descending order
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]; // Get the latest createdAt

        if (firstCreatedAt) {
          const createdAtDate = new Date(firstCreatedAt);
          // Cộng thêm 30 giây vào createdAt
          const futureTime = new Date(createdAtDate.getTime() + 30 * 1000);
          // Tính số thời gian còn lại giữa now và futureTime
          const diffMilliseconds = futureTime.getTime() - now.getTime();
          const diffSeconds = Math.floor(diffMilliseconds / 1000);

          // Kiểm tra nếu thời gian hiện tại chưa vượt quá futureTime
          if (now < futureTime) {
            if (diffSeconds > 0) {
              setErrorResponse(
                translateRetryFeedback(languageToUse, diffSeconds)
              );
              return;
            }
          }
        }

        if (
          responseDescriptions === null ||
          responseDescriptions === undefined ||
          !responseDescriptions.trim()
        ) {
          setErrorResponse(feedbackEmptyMessage);
          return;
        }

        if (responseDescriptions.length >= 121) {
          setErrorResponse(translateInputTooLong(languageToUse, 120));
          return;
        } else {
          setErrorResponse("");
        }

        setLoading(true);

        await toast.promise(
          axios
            .post(
              `/api/${param.storeId}/comments/${commentId}/responsecomment`,
              {
                description: responseDescriptions,
                product: data,
                comment: commentId,
              }
            )
            .then((responses) => {
              // Cập nhật savedComments sau khi thêm phản hồi
              setSavedComments((prevComments) => {
                const updatedComments = [...prevComments];
                const commentToUpdate = updatedComments.find(
                  (comment) => comment.id === commentId
                );
                if (commentToUpdate) {
                  // Kiểm tra nếu phản hồi đã tồn tại
                  const existingResponse = commentToUpdate.responses?.find(
                    (response) => response.id === responses.data.id
                  );
                  if (!existingResponse) {
                    commentToUpdate.responses = [
                      ...(commentToUpdate.responses || []),
                      {
                        ...responses.data,
                        id: responses.data.id,
                        description: responseDescriptions,
                        commentId: commentId,
                        user: responses.data.user,
                        createdAt: responses.data.createdAt,
                      },
                    ];
                  }
                }
                return updatedComments;
              });

              setShowResponseForm(null);
              setResponseDescriptions("");
              setEditingResponseId(null);
            }),
          {
            loading: processingReponseMessage,
            success: <span>{successResponseMessage}</span>,
            error: <span>{feedBackFailureMessage}</span>,
          }
        );
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setAlertGuestModal(true);
    }
  };

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
            loading: deletingMessage,
            success: <span>{deleteSuccessMessage}</span>,
            error: <span>{deleteUnsuccessfulMessage}</span>,
          }
        );
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setAlertGuestModal(true);
    }
  };

  const handleResponseEditClick = (
    commentId: string | undefined,
    responseId: string
  ) => {
    if (user?.role !== "GUEST" && user?.id) {
      setEditingResponseId(responseId);
      // Save the current scroll position
      scrollPositionResponseRef.current = window.scrollY;

      // Scroll to the textarea
      textareaResponseRef.current?.scrollIntoView({ behavior: "smooth" });
      if (commentId) {
        const responseToEdit = savedComments
          .find((comment) => comment.id === commentId)
          ?.responses?.find((response) => response.id === responseId);

        if (responseToEdit) {
          setResponseDescriptions(responseToEdit.description);
        }
        setShowResponseForm(commentId);
      }
    } else {
      setAlertGuestModal(true);
    }
  };

  const handleResponseCancelEdit = (commentId: string | undefined) => {
    // Save the current scroll position
    scrollPositionResponseRef.current = window.scrollY;
    // Scroll to the textarea
    textareaResponseRef.current?.scrollIntoView({ behavior: "smooth" });
    setEditingResponseId(null);
    setShowResponseForm(null);
    setResponseDescriptions(" ");
    setErrorResponse("");
  };

  const handleResponseUpdate = async (commentId: string | undefined) => {
    if (user?.role !== "GUEST" && user?.id) {
      //Check xúc phạm
      const containsOffensiveWord = offensiveWords.some((word) =>
        responseDescriptions.includes(word)
      );
      if (containsOffensiveWord) {
        setPoliciViolationModal(true); 
        return; 
      }

      if (
        responseDescriptions === null ||
        responseDescriptions === undefined ||
        !responseDescriptions.trim()
      ) {
        setErrorResponse(feedbackEmptyMessage);
        return;
      }

      if (responseDescriptions.length >= 121) {
        setErrorResponse(translateInputTooLong(languageToUse, 120));
        return;
      } else {
        setErrorResponse("");
      }

      setLoading(true);
      if (commentId) {
        try {
          await toast.promise(
            axios
              .patch(
                `/api/${param.storeId}/comments/${commentId}/responsecomment`,
                {
                  id: editingResponseId,
                  description: responseDescriptions,
                  changeReview: true,
                }
              )
              .then((response) => {
                const updatedCommentData: CommentType = response.data;

                // Reset the response description and update local state
                setResponseDescriptions("");
                setEditingResponseId(null);

                // Update the savedComments state to reflect the changes
                setSavedComments((prevComments) =>
                  prevComments.map((comment) => {
                    // Find the comment to update
                    if (comment.id === commentId) {
                      // Find the response to update
                      comment.responses = comment.responses?.map((response) => {
                        if (response.id === editingResponseId) {
                          // Update the response description
                          response.description = responseDescriptions;
                          response.changeReview = true;
                          response.totalchange = updatedCommentData.totalchange;
                        }
                        return response;
                      });
                    }
                    return comment;
                  })
                );

                if (scrollPositionResponseRef.current !== null) {
                  window.scrollTo({
                    top: scrollPositionResponseRef.current,
                    behavior: "smooth",
                  });
                }
                setShowResponseForm(null);
              }),
            {
              loading: editingMessage,
              success: <span>{editSuccessMessage}</span>,
              error: <span>{editFailureMessage}</span>,
            }
          );
        } catch (error) {
          toast.error(toastErrorMessage);
          setErrorResponse(updateErrorMessage);
        } finally {
          setLoading(false);
        }
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
              toast.error(toastErrorMessage);
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
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [param.storeId]);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleEditClick = (commentId: string | undefined) => {
    if (user?.role !== "GUEST" && user?.id) {
      setEditingCommentId(null);
      setRating(null);
      setComment("");
      setCurrentValue(null);
      setCommentError("");
      setRatingError("");
      // Save the current scroll position
      scrollPositionRef.current = window.scrollY;

      // Scroll to the textarea
      textareaRef.current?.scrollIntoView({ behavior: "smooth" });
      setEditingCommentId(commentId || null);
      const commentToEdit = savedComments.find(
        (comment) => comment.id === commentId
      );
      if (commentToEdit) {
        setRating(commentToEdit.rating);
        setComment(commentToEdit.comment);
        setCurrentValue(commentToEdit.rating);
      }
    } else {
      setAlertGuestModal(true);
    }
  };

  const handleCancelEdit = () => {
    // Save the current scroll position
    scrollPositionRef.current = window.scrollY;

    // Scroll to the textarea
    textareaRef.current?.scrollIntoView({ behavior: "smooth" });
    setEditingCommentId(null);
    setRating(null);
    setComment("");
    setCurrentValue(null);
    setCommentError("");
    setRatingError("");
  };

  const handleUpdate = async () => {
    if (user?.role !== "GUEST" && user?.id) {
      //Check xúc phạm
      const containsOffensiveWord = offensiveWords.some((word) =>
        comment.includes(word)
      );
      if (containsOffensiveWord) {
        setPoliciViolationModal(true); 
        return; 
      }

      // Validation logic
      const updatedComment = {
        id: editingCommentId,
        rating: rating as number,
        comment,
        changeReview: true,
      };
      if (updatedComment.comment.length >= 120) {
        setErrorResponse(translateInputTooLong(languageToUse, 120));
        return;
      }

      setLoading(true);

      try {
        await toast.promise(
          axios
            .patch(`/api/${param.storeId}/comments`, updatedComment)
            .then((response) => {
              const updatedCommentData: CommentType = response.data;

              // Update the comment in the state
              setSavedComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === updatedCommentData.id
                    ? { ...comment, ...updatedCommentData, changeReview: true }
                    : comment
                )
              );

              // Update the commentsByRating state to reflect the changes
              setCommentsByRating((prevCommentsByRating) => {
                const updatedCommentsByRating = { ...prevCommentsByRating };
                const commentToUpdate = updatedCommentsByRating[
                  updatedCommentData.rating
                ]?.find((comment) => comment.id === updatedCommentData.id);
                if (commentToUpdate) {
                  // Update the comment in commentsByRating if found
                  commentToUpdate.rating = updatedCommentData.rating;
                  commentToUpdate.comment = updatedCommentData.comment;
                  commentToUpdate.changeReview =
                    updatedCommentData.changeReview;
                  commentToUpdate.totalchange = updatedCommentData.totalchange;
                }
                return updatedCommentsByRating;
              });

              setEditingCommentId(null);
              setRating(null);
              setCurrentValue(null);
              setComment("");
              setCommentError("");
              setRatingError("");

              if (scrollPositionRef.current !== null) {
                window.scrollTo({
                  top: scrollPositionRef.current,
                  behavior: "smooth",
                });
              }
            }),
          {
            loading: "editingMessage",
            success: <span>{editSuccessMessage}</span>,
            error: <span>{editFailureMessage}</span>,
          }
        );
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setAlertGuestModal(true);
    }
  };

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
            loading: deletingMessage,
            success: <span>{deleteSuccessMessage}</span>,
            error: <span>{deleteUnsuccessfulMessage}</span>,
          }
        );
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setAlertGuestModal(true);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setCurrentValue(newRating);
    setRatingError("");
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    if (newComment.length >= 121) {
      setCommentError(translateInputTooLong(languageToUse, 120));
    } else {
      setComment(newComment);
      setCommentError("");
    }
  };

  const handleResponseCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    if (newComment.length >= 121) {
      setErrorResponse(translateInputTooLong(languageToUse, 120));
    } else {
      setResponseDescriptions(newComment);
      setErrorResponse("");
    }
  };

  const handleSubmit = async () => {
    if (user?.role !== "GUEST" && user?.id) {
      //Check xúc phạm
      const containsOffensiveWord = offensiveWords.some((word) =>
        comment.includes(word)
      );
      if (containsOffensiveWord) {
        setPoliciViolationModal(true); 
        return; 
      }

      //Logic này đùng để giới hạn thời gian comment
      const now = new Date();
      const firstCreatedAt = savedComments
        .filter((comment) => comment.user.id === user?.id && comment.createdAt) // Lọc bình luận của user hiện tại và kiểm tra createdAt không undefined
        .sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        )[0]?.createdAt; // Lấy phần tử đầu tiên (thời gian mới nhất)

      if (firstCreatedAt) {
        const createdAtDate = new Date(firstCreatedAt);

        // Cộng thêm 10 phút vào createdAt
        const futureTime = new Date(createdAtDate.getTime() + 10 * 60 * 1000);
        // Tính số thời gian còn lại giữa now và futureTime
        const diffMilliseconds = futureTime.getTime() - now.getTime(); // Sự chênh lệch tính bằng milliseconds
        const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60)); // Tính số phút còn lại
        const diffSeconds = Math.floor((diffMilliseconds % (1000 * 60)) / 1000); // Tính số giây còn lại

        // Kiểm tra nếu thời gian hiện tại chưa vượt quá futureTime
        if (now < futureTime) {
          if (diffMinutes > 0) {
            setCommentError(
              translateRetryAfterMinutes(languageToUse, diffMinutes)
            );
          } else {
            setCommentError(translateRetryAfter(languageToUse, diffSeconds));
          }
          return;
        }
      }

      if (rating === null) {
        setRatingError(pleaseChooseStarMessage);
        return;
      }

      if (comment.trim() === "") {
        setCommentError(enterFeedBackMessage);
        return;
      }

      if (comment.length >= 121) {
        setCommentError(translateInputTooLong(languageToUse, 120));
        return;
      } else {
        setCommentError("");
      }

      setLoading(true);

      try {
        await toast.promise(
          axios
            .post(`/api/${param.storeId}/comments/`, {
              rating: rating as number,
              comment,
              productId: data || productMessage,
            })
            .then((response) => {
              // Tạo bản sao của response.data và thêm thông tin user
              const savedComment: CommentType = {
                ...response.data,
                id: response.data.id,
                user: response.data.user,
                product: response.data.product,
              };
              // Cập nhật savedComments sau khi thêm phản hồi mới
              setSavedComments((prevComments) => [
                ...prevComments,
                savedComment,
              ]);

              const updatedCommentsByRating = {
                ...commentsByRating,
                [savedComment.rating]: [
                  ...(commentsByRating[savedComment.rating] || []),
                  savedComment,
                ],
              };
              setCommentsByRating(updatedCommentsByRating);

              setRating(null);
              setCurrentValue(null);
              setComment("");
              setCommentError("");
              setRatingError("");
            }),
          {
            loading: evaluatingMessage,
            success: evaluationSuccessMessage,
            error: evaluationFailureMessage,
          }
        );
      } catch (error) {
        toast.error(toastErrorMessage);
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

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
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

  const formatTimestamp = (timestamp: Date) => {
    const createdDate = new Date(timestamp);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const minuteDifference = Math.floor(timeDifference / (1000 * 60));
    const hourDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const monthDifference = Math.floor(dayDifference / 30);
    const yearDifference = Math.floor(dayDifference / 365);

    if (yearDifference >= 1) {
      return yearDifference === 1
        ? oneYearAgoMessage
        : `${yearDifference} ${yearAgoMessage}`;
    } else if (monthDifference >= 1) {
      return monthDifference === 1
        ? oneMonthAgoMessage
        : `${monthDifference} ${monthAgoMessage}`;
    } else if (dayDifference >= 2) {
      return `${dayDifference} ${dayAgoMessage}`;
    } else if (dayDifference === 1) {
      return oneDayAgoMessage;
    } else if (hourDifference >= 2) {
      return `${hourDifference} ${hourAgoMessage}`;
    } else if (hourDifference === 1) {
      return oneHourAgoMessage;
    } else if (minuteDifference >= 2) {
      return `${minuteDifference} ${minuteAgoMessage}`;
    } else {
      return justNowMessage;
    }
  };

  const truncateName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
      return name.slice(0, maxLength) + "...";
    }
    return name;
  };

  return (
    <Container>
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
        languageToUse={languageToUse}
      />

      <PolicyViolationModal 
      isOpen={policiViolationModal}
      onClose={() => setPoliciViolationModal(false)}
      languageToUse={languageToUse}
      value={comment || responseDescriptions}
      setResponseDescriptions={setResponseDescriptions}
      setComment={setComment}
      />

      <AlertModal
        message={confirmDeleteCommentMessage}
        isOpen={openComment}
        onClose={() => setOpenComment(false)}
        onConfirm={() => handleDeleteComment(commentIdToDelete)}
        loading={loading}
        languageToUse={languageToUse}
      />

      <AlertModal
        message={confirmDeleteResponseMessage}
        isOpen={openCommentResponse}
        onClose={() => setOpenCommentResponse(false)}
        onConfirm={() =>
          handleDeleteCommentresponse(
            commentResponseIdToDelete.commentId,
            commentResponseIdToDelete.id
          )
        }
        loading={loading}
        languageToUse={languageToUse}
      />

      <div className="p-4 shadow-lg dark:border-slate-800 dark:border my-6 rounded-md">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-200">
          {reviewAndCommentMessage} - {nameProduct}
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
              {totalReviews} {reviewAndCommentMessageLowercaseMessage}
            </h3>
          </div>

          <div>
            <div className="flex relative">
              {stars1.map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  color={commentcolor.orange}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  stroke="rgb(255, 186, 90)"
                  fill="rgb(255, 186, 90)"
                />
              ))}
              {starReviewCounts[4] ? (
                <div
                  style={{
                    width: `${(starReviewCounts[4] / totalReviews) * 100}%`,
                    backgroundImage: commentcolor.gradient,
                    height: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <h3 className={commentcolor.text}>{starReviewCounts[4]}</h3>
                </div>
              ) : (
                <h3 className="absolute right-0 text-slate-900 dark:text-slate-200">
                  {starReviewCounts[4]} {reviewLowercaseMessage}
                </h3>
              )}
            </div>

            <div className="flex mt-2 relative">
              {stars1.map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  color={commentcolor.orange}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  stroke="rgb(255, 186, 90)"
                  fill="rgb(255, 186, 90)"
                />
              ))}
              {starReviewCounts[3] ? (
                <div
                  style={{
                    width: `${(starReviewCounts[3] / totalReviews) * 100}%`,
                    backgroundImage: commentcolor.gradient,
                    height: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <h3 className={commentcolor.text}>{starReviewCounts[3]}</h3>
                </div>
              ) : (
                <h3 className="absolute right-0 text-slate-900 dark:text-slate-200">
                  {starReviewCounts[3]} {reviewLowercaseMessage}
                </h3>
              )}
            </div>

            <div className="flex mt-2 relative">
              {stars1.map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  color={commentcolor.orange}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  stroke="rgb(255, 186, 90)"
                  fill="rgb(255, 186, 90)"
                />
              ))}
              {starReviewCounts[2] ? (
                <div
                  style={{
                    width: `${(starReviewCounts[2] / totalReviews) * 100}%`,
                    backgroundImage: commentcolor.gradient,
                    height: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <h3 className={commentcolor.text}>{starReviewCounts[2]}</h3>
                </div>
              ) : (
                <h3 className="absolute right-0 text-slate-900 dark:text-slate-200">
                  {starReviewCounts[2]} {reviewLowercaseMessage}
                </h3>
              )}
            </div>

            <div className="flex mt-2 relative">
              {stars1.map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  color={commentcolor.orange}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  stroke="rgb(255, 186, 90)"
                  fill="rgb(255, 186, 90)"
                />
              ))}
              {starReviewCounts[1] ? (
                <div
                  style={{
                    width: `${(starReviewCounts[1] / totalReviews) * 100}%`,
                    backgroundImage: commentcolor.gradient,
                    height: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <h3 className={commentcolor.text}>{starReviewCounts[1]}</h3>
                </div>
              ) : (
                <h3 className="absolute right-0 text-slate-900 dark:text-slate-200">
                  {starReviewCounts[1]} {reviewLowercaseMessage}
                </h3>
              )}
            </div>

            <div className="flex mt-2 relative">
              {stars1.map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  color={commentcolor.orange}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  stroke="rgb(255, 186, 90)"
                  fill="rgb(255, 186, 90)"
                />
              ))}
              {starReviewCounts[0] > 0 ? (
                <div
                  style={{
                    width: `${(starReviewCounts[0] / totalReviews) * 100}%`,
                    backgroundImage: commentcolor.gradient,
                    height: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <h3 className={commentcolor.text}>
                    {starReviewCounts[0]} {reviewLowercaseMessage}
                  </h3>
                </div>
              ) : (
                <h3 className="absolute right-0 text-slate-900 dark:text-slate-200">
                  {starReviewCounts[0]} {reviewLowercaseMessage}
                </h3>
              )}
            </div>
          </div>
        </div>

        <div className="my-4" ref={textareaRef}>
          <span className="text-lg text-slate-900 dark:text-slate-200">
            {ratingMessage}:{" "}
            {rating !== null
              ? `${rating} ${startLowercaseMessagae}`
              : notRatedYetMessage}
          </span>
          <div className="flex space-x-2">
            {stars.map((_, index) => (
              <Star
                key={index}
                size={24}
                onClick={() => handleRatingChange(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue !== null || currentValue !== null) &&
                  (hoverValue !== null ? hoverValue : currentValue ?? 0) >=
                    index + 1
                    ? commentcolor.orange
                    : commentcolor.grey
                }
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                  stroke:
                    (hoverValue !== null || currentValue !== null) &&
                    (hoverValue !== null ? hoverValue : currentValue ?? 0) >=
                      index + 1
                      ? "rgb(255, 186, 90)"
                      : "rgb(169, 169, 169)",
                  fill:
                    (hoverValue !== null || currentValue !== null) &&
                    (hoverValue !== null ? hoverValue : currentValue ?? 0) >=
                      index + 1
                      ? "rgb(255, 186, 90)"
                      : "rgb(169, 169, 169)",
                }}
              />
            ))}
          </div>
          {ratingError && <p className="text-red-500 text-sm">{ratingError}</p>}
          {commentError && (
            <p className="text-red-500 text-sm">{commentError}</p>
          )}
        </div>

        <div className="mb-4">
          <textarea
            disabled={loading}
            value={comment}
            onChange={handleCommentChange}
            placeholder={enterReviewContentMessage}
            className={`w-full p-2 bg-white border rounded focus:outline-none focus:ring focus:border-blue-300 ${
              commentError ? "border-red-500" : ""
            }`}
          />
        </div>

        {editingCommentId ? (
          <div className="flex space-x-4">
            <button
              disabled={loading}
              onClick={handleUpdate}
              className={`text-white px-4 py-2 rounded `}
              style={{ backgroundImage: commentcolor.gradient }}
              onMouseOver={(event) => {
                event.currentTarget.style.backgroundImage =
                  commentcolor.gradienthover;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundImage =
                  commentcolor.gradient;
              }}
            >
              {updateMessage}
            </button>
            <button
              disabled={loading}
              onClick={handleCancelEdit}
              className={`text-white px-4 py-2 rounded `}
              style={{ backgroundImage: commentcolor.gradient }}
              onMouseOver={(event) => {
                event.currentTarget.style.backgroundImage =
                  commentcolor.gradienthover;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundImage =
                  commentcolor.gradient;
              }}
            >
              {cancelMessage}
            </button>
          </div>
        ) : (
          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`text-white px-4 py-2 rounded `}
            style={{ backgroundImage: commentcolor.gradient }}
            onMouseOver={(event) => {
              event.currentTarget.style.backgroundImage =
                commentcolor.gradienthover;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundImage = commentcolor.gradient;
            }}
          >
            {rateMessage}
          </button>
        )}

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
                          <div
                            className={`flex items-center relative ${
                              comment?.user?.stream?.isLive ? "ml-8" : ""
                            }`}
                          >
                            <>
                              <CircleAvatar
                                srcAvatar={
                                  comment?.user?.image ||
                                  comment?.user?.imageCredential[0]?.url
                                }
                                srcFrame={comment?.user?.frameAvatar}
                                isCitizen={comment?.user?.isCitizen}
                                role={comment?.user?.role}
                                isLive={comment?.user?.stream?.isLive}
                                nameuser={comment?.user?.nameuser}
                                classAvatar="z-10"
                              />
                            </>
                            <div
                              className={`${
                                comment?.totalchange ? "grid grid-rows-2" : ""
                              }`}
                            >
                              <Link
                                href={`${
                                  comment?.user?.stream?.isLive
                                    ? `/live/${comment?.user?.nameuser}`
                                    : `/user/${comment?.user?.nameuser}`
                                }`}
                              >
                                <p
                                  className={`font-bold flex items-center text-gray-600 dark:text-slate-300 line-clamp-1 ${
                                    comment?.user?.stream?.isLive
                                      ? "ml-10"
                                      : "ml-3"
                                  }`}
                                >
                                  <span className=" md:hidden">
                                    {truncateName(comment.user.name, 10)}
                                  </span>
                                  <span className="hidden md:block">
                                    {comment.user.name}
                                  </span>
                                  <p className="text-sm text-gray-400 items-center font-normal line-clamp-1 hidden lg:flex">
                                    -{nameProduct}
                                  </p>
                                </p>
                              </Link>
                              {comment.changeReview ? (
                                <span className="ml-3 text-sm text-gray-400 items-center font-normal line-clamp-1">
                                  (
                                  {(comment.totalchange ?? 0) === 0
                                    ? ""
                                    : `(${translateEditedTimes(
                                        languageToUse,
                                        comment.totalchange
                                      )})`}
                                  )
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            <p className=" absolute right-0 text-sm font-bold text-slate-900 dark:text-slate-200 text-opacity-60">
                              {formatTimestamp(comment.createdAt || new Date())}
                            </p>
                          </div>

                          <div
                            className={`group flex items-center justify-between bg-gray-100 mb-2 rounded-md p-3 text-sm ml-12 ${
                              comment?.user?.stream?.isLive ? "mt-8" : "mt-4"
                            }`}
                            onMouseLeave={() => setShowOptions(null)}
                          >
                            <div>
                              <p className="text-slate-900 whitespace-pre-wrap break-words max-w-[18rem] md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
                                {commentMessage}: {comment.comment}
                              </p>
                              {/* Format the date and time */}
                              <div className="flex space-x-2 items-center text-sm">
                                <p className="text-slate-900">
                                  {" "}
                                  {rateMessage}:{" "}
                                </p>
                                {stars.map((_, starIndex) => (
                                  <Star
                                    key={starIndex}
                                    size={16}
                                    color={
                                      starIndex + 1 <= parseInt(rating, 10)
                                        ? commentcolor.orange
                                        : commentcolor.grey
                                    }
                                    stroke={
                                      starIndex + 1 <= parseInt(rating, 10)
                                        ? "rgb(255, 186, 90)"
                                        : "rgb(169, 169, 169)"
                                    }
                                    fill={
                                      starIndex + 1 <= parseInt(rating, 10)
                                        ? "rgb(255, 186, 90)"
                                        : "rgb(169, 169, 169)"
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              {user && user.id === comment?.user?.id && (
                                <div
                                  onClick={() =>
                                    handleEllipsisClick(comment.id || "")
                                  }
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative"
                                >
                                  <Ellipsis className="h-5 w-5 text-slate-900 cursor-pointer" />
                                  {showOptions === comment.id && (
                                    <div
                                      ref={optionRef}
                                      className="absolute z-[9999] bg-white shadow-lg rounded-md max-w-xs p-2 right-0"
                                    >
                                      <div className="flex flex-col space-y-1">
                                        <button
                                          disabled={loading}
                                          onClick={() =>
                                            handleEditClick(comment.id)
                                          }
                                          className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1 whitespace-nowrap"
                                        >
                                          <Pencil className="w-5 h-5" />
                                          {editMessage}
                                        </button>
                                        <button
                                          disabled={loading}
                                          onClick={() => {
                                            setCommentIdToDelete(comment.id);
                                            setCommentNameToDelete(
                                              comment.comment
                                            );
                                            setOpenComment(true);
                                          }}
                                          className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1"
                                        >
                                          <Trash2 className="w-5 h-5" />{" "}
                                          {deleteMessage}
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {comment.responses &&
                            comment.responses.length > 0 && (
                              <>
                                {showResponseComments === comment.id && (
                                  <ul>
                                    {comment.responses
                                      .filter(
                                        (response) =>
                                          response.createdAt !== undefined
                                      ) // Lọc các phản hồi có createdAt hợp lệ
                                      .sort((a, b) => {
                                        // Chuyển đổi createdAt thành Date và so sánh
                                        const dateA = new Date(a.createdAt!); // Sử dụng ! để xác nhận rằng createdAt không phải là undefined
                                        const dateB = new Date(b.createdAt!);
                                        //Sắp xếp mới nhất sẽ nằm ở dưới.
                                        return (
                                          dateA.getTime() - dateB.getTime()
                                        ); // Trả về hiệu số thời gian để sắp xếp
                                      })
                                      .map((response, responseIndex) => (
                                        <li
                                          key={responseIndex}
                                          className="w-[90%] mx-auto"
                                        >
                                          {comment.user.id ===
                                          response?.user.id ? (
                                            <>
                                              {response.commentId ===
                                                comment.id && (
                                                <>
                                                  <div
                                                    ref={textareaResponseRef}
                                                    className={`flex items-center relative ${
                                                      response?.user?.stream
                                                        ?.isLive
                                                        ? "ml-8 my-4"
                                                        : ""
                                                    }`}
                                                  >
                                                    <>
                                                      <CircleAvatar
                                                        srcAvatar={
                                                          response?.user
                                                            ?.imageCredential[0]
                                                            ?.url ||
                                                          response?.user?.image
                                                        }
                                                        srcFrame={
                                                          response?.user
                                                            ?.frameAvatar
                                                        }
                                                        role={
                                                          response?.user?.role
                                                        }
                                                        isCitizen={
                                                          response?.user
                                                            ?.isCitizen
                                                        }
                                                        isLive={
                                                          response?.user?.stream
                                                            ?.isLive
                                                        }
                                                        nameuser={
                                                          response?.user
                                                            ?.nameuser
                                                        }
                                                        classAvatar="z-10"
                                                      />
                                                    </>
                                                    <div
                                                      className={`${
                                                        response?.totalchange
                                                          ? "grid grid-rows-2"
                                                          : ""
                                                      }`}
                                                    >
                                                      <Link
                                                        href={`${
                                                          response?.user?.stream
                                                            ?.isLive
                                                            ? `/live/${response?.user?.nameuser}`
                                                            : `/user/${response?.user?.nameuser}`
                                                        }`}
                                                      >
                                                        <div
                                                          className={`font-bold text-gray-600 whitespace-nowrap line-clamp-1 ${
                                                            response?.user
                                                              ?.stream?.isLive
                                                              ? "ml-10"
                                                              : "ml-3"
                                                          }`}
                                                        >
                                                          <p className="md:hidden">
                                                            {truncateName(
                                                              response?.user
                                                                ?.name,
                                                              10
                                                            )}
                                                          </p>
                                                          <p className="hidden md:block">
                                                            {
                                                              response?.user
                                                                ?.name
                                                            }
                                                          </p>
                                                        </div>
                                                      </Link>
                                                      {response.changeReview ? (
                                                        <span
                                                          className={`text-sm text-gray-400 items-center font-normal line-clamp-1 whitespace-nowrap ${
                                                            response?.user
                                                              ?.stream?.isLive
                                                              ? "ml-10"
                                                              : "ml-3"
                                                          }`}
                                                        >
                                                          {(response.totalchange ??
                                                            0) === 0
                                                            ? ""
                                                            : `(${translateEditedTimes(
                                                                languageToUse,
                                                                response.totalchange
                                                              )})`}
                                                        </span>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                    <div className="absolute right-0 text-sm font-bold text-slate-900 dark:text-slate-200 text-opacity-60">
                                                      {formatTimestamp(
                                                        response.createdAt ||
                                                          new Date()
                                                      )}
                                                    </div>
                                                  </div>
                                                  <div
                                                    className="group flex items-center justify-between bg-gray-100 mt-2 mb-2 rounded-md p-3 text-sm ml-12"
                                                    onMouseLeave={() =>
                                                      setShowOptions(null)
                                                    }
                                                  >
                                                    <>
                                                      <div className="whitespace-pre-wrap break-words max-w-[16rem] md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
                                                        <span className="text-blue-500 cursor-pointer">
                                                          @{comment.user.name}
                                                        </span>
                                                        :{" "}
                                                        <span>
                                                          {response.description}
                                                        </span>
                                                      </div>
                                                    </>

                                                    <>
                                                      {user &&
                                                        user?.id ===
                                                          response.user?.id && (
                                                          <div
                                                            onClick={() =>
                                                              handleEllipsisClick(
                                                                response.id ||
                                                                  ""
                                                              )
                                                            }
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative"
                                                          >
                                                            <Ellipsis className="h-5 w-5 text-slate-900 cursor-pointer" />
                                                            {showOptions ===
                                                              response.id && (
                                                              <div
                                                                ref={optionRef}
                                                                className="absolute z-[9999] bg-white shadow-lg rounded-md max-w-xs p-2 right-0"
                                                              >
                                                                <div className="flex flex-col space-y-1">
                                                                  <button
                                                                    disabled={
                                                                      loading
                                                                    }
                                                                    onClick={() =>
                                                                      handleResponseEditClick(
                                                                        comment.id,
                                                                        response.id ||
                                                                          ""
                                                                      )
                                                                    }
                                                                    className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1 whitespace-nowrap"
                                                                  >
                                                                    <Pencil className="w-5 h-5" />{" "}
                                                                    {
                                                                      editMessage
                                                                    }
                                                                  </button>
                                                                  <button
                                                                    disabled={
                                                                      loading
                                                                    }
                                                                    onClick={() => {
                                                                      setCommentResponseIdToDelete(
                                                                        {
                                                                          commentId:
                                                                            comment.id,
                                                                          id:
                                                                            response.id ||
                                                                            "",
                                                                        }
                                                                      );
                                                                      setCommentNameToDelete(
                                                                        response.description
                                                                      );
                                                                      setOpenCommentResponse(
                                                                        true
                                                                      );
                                                                    }}
                                                                    className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1"
                                                                  >
                                                                    <Trash2 className="w-5 h-5" />{" "}
                                                                    {
                                                                      deleteMessage
                                                                    }
                                                                  </button>
                                                                </div>
                                                              </div>
                                                            )}
                                                          </div>
                                                        )}
                                                    </>
                                                  </div>
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {response.commentId ===
                                                comment.id && (
                                                <li
                                                  key={responseIndex}
                                                  className="w-[90%] mx-auto"
                                                >
                                                  <div
                                                    ref={textareaResponseRef}
                                                    className={`flex justify-end items-center relative ${
                                                      response?.user?.stream
                                                        ?.isLive
                                                        ? "mr-6 mt-6 mb-8"
                                                        : ""
                                                    }`}
                                                  >
                                                    <div className="absolute left-0 text-sm font-bold text-gray-800 text-opacity-60">
                                                      {formatTimestamp(
                                                        response.createdAt ||
                                                          new Date()
                                                      )}
                                                    </div>
                                                    <div
                                                      className={`${
                                                        response?.totalchange
                                                          ? "grid grid-rows-2"
                                                          : ""
                                                      }`}
                                                    >
                                                      <Link
                                                        href={`${
                                                          response?.user?.stream
                                                            ?.isLive
                                                            ? `/live/${response?.user?.nameuser}`
                                                            : `/user/${response?.user?.nameuser}`
                                                        }`}
                                                      >
                                                        <div
                                                          className={`text-end font-bold text-gray-600 whitespace-nowrap line-clamp-1 ${
                                                            response?.user
                                                              ?.stream?.isLive
                                                              ? "mr-8"
                                                              : ""
                                                          }`}
                                                        >
                                                          <p className="md:hidden">
                                                            {truncateName(
                                                              response?.user
                                                                ?.name,
                                                              10
                                                            )}
                                                          </p>
                                                          <p className="hidden md:block">
                                                            {
                                                              response?.user
                                                                ?.name
                                                            }
                                                          </p>
                                                        </div>
                                                      </Link>
                                                      {response.changeReview ? (
                                                        <span
                                                          className={`text-sm text-gray-400 line-clamp-1 items-center font-normal whitespace-nowrap ${
                                                            response?.user
                                                              ?.stream?.isLive
                                                              ? "mr-10"
                                                              : ""
                                                          }`}
                                                        >
                                                          {(response.totalchange ??
                                                            0) === 0
                                                            ? ""
                                                            : `(${translateEditedTimes(
                                                                languageToUse,
                                                                response.totalchange
                                                              )})`}
                                                        </span>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                    <>
                                                      <CircleAvatar
                                                        srcAvatar={
                                                          response?.user
                                                            ?.imageCredential[0]
                                                            ?.url ||
                                                          response?.user.image
                                                        }
                                                        role={
                                                          response?.user?.role
                                                        }
                                                        isCitizen={
                                                          response?.user
                                                            ?.isCitizen
                                                        }
                                                        srcFrame={
                                                          response?.user
                                                            ?.frameAvatar
                                                        }
                                                        isLive={
                                                          response?.user?.stream
                                                            ?.isLive
                                                        }
                                                        nameuser={
                                                          response?.user
                                                            ?.nameuser
                                                        }
                                                        classAvatar="z-10"
                                                      />
                                                    </>
                                                  </div>
                                                  <div
                                                    className=" group flex items-center justify-between bg-gray-100 mt-2 mb-2 rounded-md p-3 text-sm"
                                                    onMouseLeave={() =>
                                                      setShowOptions(null)
                                                    }
                                                  >
                                                    <>
                                                      <div className="whitespace-pre-wrap break-words max-w-[16rem] md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
                                                        <span className="text-blue-500 cursor-pointer">
                                                          @{comment.user.name}
                                                        </span>
                                                        :{" "}
                                                        <span>
                                                          {response.description}
                                                        </span>
                                                      </div>
                                                    </>

                                                    <>
                                                      {user &&
                                                        user?.id ===
                                                          response.user?.id && (
                                                          <div
                                                            onClick={() =>
                                                              handleEllipsisClick(
                                                                response.id ||
                                                                  ""
                                                              )
                                                            }
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative"
                                                          >
                                                            <Ellipsis className="h-5 w-5 text-slate-900 cursor-pointer" />
                                                            {showOptions ===
                                                              response.id && (
                                                              <div
                                                                ref={optionRef}
                                                                className="absolute z-[9999] bg-white shadow-lg rounded-md max-w-xs p-2 right-0"
                                                              >
                                                                <div className="flex flex-col space-y-1">
                                                                  <button
                                                                    disabled={
                                                                      loading
                                                                    }
                                                                    onClick={() =>
                                                                      handleResponseEditClick(
                                                                        comment.id,
                                                                        response.id ||
                                                                          ""
                                                                      )
                                                                    }
                                                                    className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1 whitespace-nowrap"
                                                                  >
                                                                    <Pencil className="w-5 h-5" />{" "}
                                                                    {
                                                                      editMessage
                                                                    }
                                                                  </button>
                                                                  <button
                                                                    disabled={
                                                                      loading
                                                                    }
                                                                    onClick={() => {
                                                                      setCommentResponseIdToDelete(
                                                                        {
                                                                          commentId:
                                                                            comment.id,
                                                                          id:
                                                                            response.id ||
                                                                            "",
                                                                        }
                                                                      );
                                                                      setCommentNameToDelete(
                                                                        response.description
                                                                      );
                                                                      setOpenCommentResponse(
                                                                        true
                                                                      );
                                                                    }}
                                                                    className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1"
                                                                  >
                                                                    <Trash2 className="w-5 h-5" />{" "}
                                                                    {
                                                                      deleteMessage
                                                                    }
                                                                  </button>
                                                                </div>
                                                              </div>
                                                            )}
                                                          </div>
                                                        )}
                                                    </>
                                                  </div>
                                                </li>
                                              )}
                                            </>
                                          )}
                                        </li>
                                      ))}
                                  </ul>
                                )}
                              </>
                            )}

                          {showResponseForm === comment.id && (
                            <>
                              <div
                                className="mb-4"
                                key={`responseTextarea-${comment.id}`}
                              >
                                <textarea
                                  disabled={loading}
                                  value={responseDescriptions}
                                  onChange={handleResponseCommentChange}
                                  placeholder={enterFeedbackContentMessage}
                                  className={`w-full bg-white p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                                    errorResponse ? "border-red-500" : ""
                                  }`}
                                />
                                {errorResponse && (
                                  <p className="text-red-500 text-sm">
                                    {errorResponse}
                                  </p>
                                )}
                              </div>

                              {editingResponseId ? (
                                <div className="flex space-x-4">
                                  <button
                                    disabled={loading}
                                    onClick={() =>
                                      handleResponseUpdate(comment.id)
                                    }
                                    className={`text-white px-4 py-2 rounded`}
                                    style={{
                                      backgroundImage: commentcolor.gradient,
                                    }}
                                    onMouseOver={(event) => {
                                      event.currentTarget.style.backgroundImage =
                                        commentcolor.gradienthover;
                                    }}
                                    onMouseLeave={(event) => {
                                      event.currentTarget.style.backgroundImage =
                                        commentcolor.gradient;
                                    }}
                                  >
                                    {updateMessage}
                                  </button>
                                  <button
                                    disabled={loading}
                                    onClick={() =>
                                      handleResponseCancelEdit(comment.id)
                                    }
                                    className={`text-white px-4 py-2 rounded `}
                                    style={{
                                      backgroundImage: commentcolor.gradient,
                                    }}
                                    onMouseOver={(event) => {
                                      event.currentTarget.style.backgroundImage =
                                        commentcolor.gradienthover;
                                    }}
                                    onMouseLeave={(event) => {
                                      event.currentTarget.style.backgroundImage =
                                        commentcolor.gradient;
                                    }}
                                  >
                                    {cancelMessage}
                                  </button>
                                </div>
                              ) : (
                                <button
                                  disabled={loading}
                                  onClick={() =>
                                    handleResponseSubmit(comment.id)
                                  }
                                  className={`text-white px-4 py-2 rounded `}
                                  style={{
                                    backgroundImage: commentcolor.gradient,
                                  }}
                                  onMouseOver={(event) => {
                                    event.currentTarget.style.backgroundImage =
                                      commentcolor.gradienthover;
                                  }}
                                  onMouseLeave={(event) => {
                                    event.currentTarget.style.backgroundImage =
                                      commentcolor.gradient;
                                  }}
                                >
                                  {responseMessage}
                                </button>
                              )}
                            </>
                          )}
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
                            languageToUse={languageToUse}
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
          {collapsedComments ? collapseMessage : seeAllMessage}
        </button>
      </div>
    </Container>
  );
};

export default Comment;
