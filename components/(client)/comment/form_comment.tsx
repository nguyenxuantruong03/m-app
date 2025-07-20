import { Comment } from "@/types/type";
import { offensiveWords } from "@/vn_offensive_words";
import axios from "axios";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ChangeEvent, RefObject, useState } from "react";
import toast from "react-hot-toast";
import { commentcolor } from "../color/color";

interface CommentProps {
  user: any;
  textareaRef: RefObject<HTMLDivElement>
  stars: number[];
  rating: number | null;
  currentValue: number | null;
  commentError: string;
  ratingError: string;
  comment: string;
  loading: boolean;
  editingCommentId: string | null;
  scrollPositionRef: React.MutableRefObject<number | null>;
  setEditingCommentId: React.Dispatch<React.SetStateAction<string | null>>;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setCurrentValue: React.Dispatch<React.SetStateAction<number | null>>;
  setCommentError: React.Dispatch<React.SetStateAction<string>>;
  setRatingError: React.Dispatch<React.SetStateAction<string>>;
  setPoliciViolationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorResponse: (message: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSavedComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setCommentsByRating: React.Dispatch<React.SetStateAction<{
    [key: number]: Comment[];
  }>>;
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
  savedComments: Comment[];
  data: string | null; 
  commentsByRating: { [key: number]: Comment[] };
}
const FormComment: React.FC<CommentProps> = ({
  user,
  textareaRef,
  stars,
  rating,
  currentValue,
  commentError,
  ratingError,
  comment,
  loading,
  editingCommentId,
  scrollPositionRef,
  setEditingCommentId,
  setRating,
  setComment,
  setCurrentValue,
  setCommentError,
  setRatingError,
  setPoliciViolationModal,
  setErrorResponse,
  setLoading,
  setSavedComments,
  setCommentsByRating,
  setAlertGuestModal,
  savedComments,
  data,
  commentsByRating
}) => {
    const t = useTranslations();
    const param = useParams();
  const [hoverValue, setHoverValue] = useState<number | null>(null);

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
        setErrorResponse(t("comment.inputTooLong", { maxLength: 120 }));
        return;
      }

      setLoading(true);

      try {
        await toast.promise(
          axios
            .patch(`/api/${param.storeId}/comments`, updatedComment)
            .then((response) => {
              const updatedCommentData: Comment = response.data;

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
            loading: t("loading.loadingEdit"),
            success: <span>{t("comment.editSuccess")}</span>,
            error: <span>{t("comment.editFailure")}</span>,
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

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setCurrentValue(newRating);
    setRatingError("");
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    if (newComment.length >= 121) {
      setCommentError(t("comment.inputTooLong", { maxLength: 120 }));
    } else {
      setComment(newComment);
      setCommentError("");
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
              t("comment.retryAfterMinutes", { diffMinutes: diffMinutes })
            );
          } else {
            setCommentError(
              t("comment.retryAfterSecond", { diffSeconds: diffSeconds })
            );
          }
          return;
        }
      }

      if (rating === null) {
        setRatingError(t("comment.pleaseChooseStar"));
        return;
      }

      if (comment.trim() === "") {
        setCommentError(t("comment.enterFeedBack"));
        return;
      }

      if (comment.length >= 121) {
        setCommentError(t("comment.inputTooLong", { maxLength: 120 }));
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
              productId: data || t("product.product"),
            })
            .then((response) => {
              // Tạo bản sao của response.data và thêm thông tin user
              const savedComment: Comment = {
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
            loading: t("loading.loadingComment"),
            success: t("comment.evaluationSuccess"),
            error: t("comment.evaluationFailure"),
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

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };
  return (
    <>
      <div className="my-4" ref={textareaRef}>
        <span className="text-lg text-slate-900 dark:text-slate-200">
          {t("comment.rating")}:{" "}
          {rating !== null
            ? `${rating} ${t("comment.startLowercase")}`
            : t("comment.notRatedYet")}
        </span>
        <div className="flex">
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
        {commentError && <p className="text-red-500 text-sm">{commentError}</p>}
      </div>

      <div className="mb-4">
        <textarea
          disabled={loading}
          value={comment}
          onChange={handleCommentChange}
          placeholder={t("comment.enterReviewContent")}
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
              event.currentTarget.style.backgroundImage = commentcolor.gradient;
            }}
          >
            {t("action.update")}
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
              event.currentTarget.style.backgroundImage = commentcolor.gradient;
            }}
          >
            {t("action.cancel")}
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
          {t("comment.rating")}
        </button>
      )}
    </>
  );
};

export default FormComment;
