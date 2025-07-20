import CircleAvatar from "@/components/ui/circle-avatar";
import { Comment } from "@/types/type";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { locales } from "./comment";
import { useTranslations } from "next-intl";
import { Ellipsis, Pencil, Star, Trash2 } from "lucide-react";
import { commentcolor } from "../color/color";

interface CardCommentProps {
  comment: Comment;
  nameProduct: string;
  user: any;
  setShowOptions: (id: string | null) => void;
  showOptions: string | null;
  handleEllipsisClick: (id: string) => void;
  setCommentIdToDelete: (id: string | undefined) => void;
  setCommentNameToDelete: (name: string) => void;
  setOpenComment: (open: boolean) => void;
  loading?: boolean;
  setEditingCommentId: (id: string | null) => void;
  setRating: (rating: number | null) => void;
  setComment: (comment: string) => void;
  setCurrentValue: (rating: number | null) => void;
  setCommentError: (error: string) => void;
  setRatingError: (error: string) => void;
  setAlertGuestModal: (open: boolean) => void;
  savedComments: Comment[];
  textareaRef: React.RefObject<HTMLDivElement>;
  scrollPositionRef: React.MutableRefObject<number | null>;
  stars: number[];
  optionRef: React.RefObject<HTMLDivElement>;
  rating: any;
}

const CardComment: React.FC<CardCommentProps> = ({
  comment,
  nameProduct,
  user,
  setShowOptions,
  showOptions,
  handleEllipsisClick,
  setCommentIdToDelete,
  setCommentNameToDelete,
  setOpenComment,
  loading,
  setEditingCommentId,
  setRating,
  setComment,
  setCurrentValue,
  setCommentError,
  setRatingError,
  setAlertGuestModal,
  savedComments,
  textareaRef,
  scrollPositionRef,
  stars,
  optionRef,
  rating
}) => {
  const languageToUse = user?.language || "vi";
  const t = useTranslations();

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

  const truncateName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
      return name.slice(0, maxLength) + "...";
    }
    return name;
  };

  return (
    <>
      <div
        className={`flex items-center relative ${
          comment?.user?.stream?.isLive ? "ml-8" : ""
        }`}
      >
        <>
          <CircleAvatar
            srcAvatar={
              comment?.user?.image || comment?.user?.imageCredential[0]?.url
            }
            srcFrame={comment?.user?.frameAvatar}
            isCitizen={comment?.user?.isCitizen}
            role={comment?.user?.role}
            isLive={comment?.user?.stream?.isLive}
            nameuser={comment?.user?.nameuser}
            classAvatar="z-10"
          />
        </>
        <div className={`${comment?.totalchange ? "grid grid-rows-2" : ""}`}>
          <Link
            href={`${
              comment?.user?.stream?.isLive
                ? `/live/${comment?.user?.nameuser}`
                : `/user/${comment?.user?.nameuser}`
            }`}
          >
            <p
              className={`font-bold flex items-center text-gray-600 dark:text-slate-300 line-clamp-1 ${
                comment?.user?.stream?.isLive ? "ml-10" : "ml-3"
              }`}
            >
              <span className=" md:hidden">
                {truncateName(comment.user.name, 10)}
              </span>
              <span className="hidden md:block">{comment.user.name}</span>
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
                : `(${t("comment.editedTimes", {
                    totalChange: comment.totalchange,
                  })})`}
              )
            </span>
          ) : (
            ""
          )}
        </div>
        <p className=" absolute right-0 text-sm font-bold text-slate-900 dark:text-slate-200 text-opacity-60">
          {formatDistanceToNowStrict(
            new Date(comment.createdAt || new Date()),
            {
              locale: locales[languageToUse as keyof typeof locales],
              addSuffix: true,
            }
          )}
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
            {t("comment.comment")}: {comment.comment}
          </p>
          {/* Format the date and time */}
          <div className="flex space-x-2 items-center text-sm">
            <p className="text-slate-900"> {t("comment.rating")}: </p>
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
              onClick={() => handleEllipsisClick(comment.id || "")}
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
                      onClick={() => handleEditClick(comment.id)}
                      className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1 whitespace-nowrap"
                    >
                      <Pencil className="w-5 h-5" />
                      {t("action.edit")}
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setCommentIdToDelete(comment.id);
                        setCommentNameToDelete(comment.comment);
                        setOpenComment(true);
                      }}
                      className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-5 h-5" /> {t("action.delete")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardComment;
