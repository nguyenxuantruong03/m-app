import { ChangeEvent } from "react";
import { commentcolor } from "../../color/color";
import { Comment, User } from "@/types/type";
import { offensiveWords } from "@/vn_offensive_words";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface ShowResponseForm {
  user: any;
  showResponseForm: string | null | undefined;
  comment: Comment;
  loading: boolean | undefined;
  errorResponse: string | undefined;
  responseDescriptions: string;
  editingResponseId: string | null;
  setShowResponseForm: (value: string | null) => void;
  setResponseDescriptions: (value: string) => void;
  setEditingResponseId: (value: string | null) => void;
  setLoading: (value: boolean) => void;
  setErrorResponse: (value: string) => void;
  setSavedComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  savedComments: Comment[];
  setAlertGuestModal: (value: boolean) => void;
  setPoliciViolationModal: (value: boolean) => void;
  scrollPositionResponseRef: React.MutableRefObject<number | null>;
  textareaResponseRef: React.RefObject<HTMLDivElement>;
  data: string;
}

const ShowResponseForm: React.FC<ShowResponseForm> = ({
  user,
  showResponseForm,
  comment,
  loading,
  errorResponse,
  responseDescriptions,
  editingResponseId,
  setShowResponseForm,
  setResponseDescriptions,
  setEditingResponseId,
  setLoading,
  setErrorResponse,
  setSavedComments,
  savedComments,
  setAlertGuestModal,
  setPoliciViolationModal,
  scrollPositionResponseRef,
  textareaResponseRef,
  data,
}) => {
  const t = useTranslations();
  const param = useParams();

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
                t("comment.retryFeedback", { diffSeconds: diffSeconds })
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
          setErrorResponse(t("comment.feedbackEmpty"));
          return;
        }

        if (responseDescriptions.length >= 121) {
          setErrorResponse(t("comment.inputTooLong", { maxLength: 120 }));
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
            loading: t("loading.loadingResponse"),
            success: <span>{t("comment.successResponse")}</span>,
            error: <span>{t("comment.feedBackFailure")}</span>,
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
        setErrorResponse(t("comment.feedbackEmpty"));
        return;
      }

      if (responseDescriptions.length >= 121) {
        setErrorResponse(t("comment.inputTooLong", { maxLength: 120 }));
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
                const updatedCommentData: Comment = response.data;

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
              loading: t("loading.loadingEdit"),
              success: <span>{t("comment.editSuccess")}</span>,
              error: <span>{t("comment.editFailure")}</span>,
            }
          );
        } catch (error) {
          toast.error(t("toastError.somethingWentWrong"));
          setErrorResponse(t("comment.updateError"));
        } finally {
          setLoading(false);
        }
      }
    } else {
      setAlertGuestModal(true);
    }
  };

  const handleResponseCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    if (newComment.length >= 121) {
      setErrorResponse(t("comment.inputTooLong", { maxLength: 120 }));
    } else {
      setResponseDescriptions(newComment);
      setErrorResponse("");
    }
  };
  return (
    <div>
      {showResponseForm === comment.id && (
        <>
          <div className="mb-4" key={`responseTextarea-${comment.id}`}>
            <textarea
              disabled={loading}
              value={responseDescriptions}
              onChange={handleResponseCommentChange}
              placeholder={t("comment.enterFeedbackContent")}
              className={`w-full bg-white p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                errorResponse ? "border-red-500" : ""
              }`}
            />
            {errorResponse && (
              <p className="text-red-500 text-sm">{errorResponse}</p>
            )}
          </div>

          {editingResponseId ? (
            <div className="flex space-x-4">
              <button
                disabled={loading}
                onClick={() => handleResponseUpdate(comment.id)}
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
                {t("action.update")}
              </button>
              <button
                disabled={loading}
                onClick={() => handleResponseCancelEdit(comment.id)}
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
                {t("action.cancel")}
              </button>
            </div>
          ) : (
            <button
              disabled={loading}
              onClick={() => handleResponseSubmit(comment.id)}
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
              {t("comment.response")}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ShowResponseForm;
