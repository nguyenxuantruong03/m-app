import CircleAvatar from "@/components/ui/circle-avatar";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { locales } from "../comment";
import Link from "next/link";
import { Comment, User } from "@/types/type";
import { useTranslations } from "next-intl";

interface ShowResponse {
  user: any;
  setEditingResponseId: React.Dispatch<React.SetStateAction<string | null>>;
  scrollPositionResponseRef: React.MutableRefObject<number | null>;
  textareaResponseRef: React.RefObject<HTMLDivElement>;
  savedComments: Comment[];
  setResponseDescriptions: React.Dispatch<React.SetStateAction<string>>;
  setShowResponseForm: React.Dispatch<React.SetStateAction<string | null>>
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
  showResponseComments: string | null;
  comment: Comment;
  setShowOptions: React.Dispatch<React.SetStateAction<string | null>>;
  handleEllipsisClick: (commentId: string | null) => void;
  showOptions: string | null;
  optionRef: React.RefObject<HTMLDivElement>;
  loading: boolean | undefined;
  setCommentNameToDelete: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setCommentResponseIdToDelete: React.Dispatch<
    React.SetStateAction<{ commentId: string | undefined; id: string }>
  >;
  setOpenCommentResponse: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowResponse: React.FC<ShowResponse> = ({
  user,
  setEditingResponseId,
  scrollPositionResponseRef,
  textareaResponseRef,
  savedComments,
  setResponseDescriptions,
  setShowResponseForm,
  setAlertGuestModal,
  showResponseComments,
  comment,
  setShowOptions,
  handleEllipsisClick,
  showOptions,
  optionRef,
  loading,
  setCommentNameToDelete,
  setCommentResponseIdToDelete,
  setOpenCommentResponse,
}) => {
  const t = useTranslations();
  const languageToUse = user?.language || "vi";

  const truncateName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
      return name.slice(0, maxLength) + "...";
    }
    return name;
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

  return (
    <>
      {comment.responses && comment.responses.length > 0 && (
        <>
          {showResponseComments === comment.id && (
            <ul>
              {comment.responses
                .filter((response) => response.createdAt !== undefined) // Lọc các phản hồi có createdAt hợp lệ
                .sort((a, b) => {
                  // Chuyển đổi createdAt thành Date và so sánh
                  const dateA = new Date(a.createdAt!); // Sử dụng ! để xác nhận rằng createdAt không phải là undefined
                  const dateB = new Date(b.createdAt!);
                  //Sắp xếp mới nhất sẽ nằm ở dưới.
                  return dateA.getTime() - dateB.getTime(); // Trả về hiệu số thời gian để sắp xếp
                })
                .map((response, responseIndex) => (
                  <li key={responseIndex} className="w-[90%] mx-auto">
                    {comment.user.id === response?.user.id ? (
                      <>
                        {response.commentId === comment.id && (
                          <>
                            <div
                              ref={textareaResponseRef}
                              className={`flex items-center relative ${
                                response?.user?.stream?.isLive
                                  ? "ml-8 my-4"
                                  : ""
                              }`}
                            >
                              <>
                                <CircleAvatar
                                  srcAvatar={
                                    response?.user?.imageCredential[0]?.url ||
                                    response?.user?.image
                                  }
                                  srcFrame={response?.user?.frameAvatar}
                                  role={response?.user?.role}
                                  isCitizen={response?.user?.isCitizen}
                                  isLive={response?.user?.stream?.isLive}
                                  nameuser={response?.user?.nameuser}
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
                                    response?.user?.stream?.isLive
                                      ? `/live/${response?.user?.nameuser}`
                                      : `/user/${response?.user?.nameuser}`
                                  }`}
                                >
                                  <div
                                    className={`font-bold text-gray-600 whitespace-nowrap line-clamp-1 ${
                                      response?.user?.stream?.isLive
                                        ? "ml-10"
                                        : "ml-3"
                                    }`}
                                  >
                                    <p className="md:hidden">
                                      {truncateName(response?.user?.name, 10)}
                                    </p>
                                    <p className="hidden md:block">
                                      {response?.user?.name}
                                    </p>
                                  </div>
                                </Link>
                                {response.changeReview ? (
                                  <span
                                    className={`text-sm text-gray-400 items-center font-normal line-clamp-1 whitespace-nowrap ${
                                      response?.user?.stream?.isLive
                                        ? "ml-10"
                                        : "ml-3"
                                    }`}
                                  >
                                    {(response.totalchange ?? 0) === 0
                                      ? ""
                                      : `(${t("comment.editedTimes", {
                                          totalChange: response.totalchange,
                                        })})`}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="absolute right-0 text-sm font-bold text-slate-900 dark:text-slate-200 text-opacity-60">
                                {formatDistanceToNowStrict(
                                  new Date(response.createdAt || new Date()),
                                  {
                                    locale:
                                      locales[
                                        languageToUse as keyof typeof locales
                                      ],
                                    addSuffix: true,
                                  }
                                )}
                              </div>
                            </div>
                            <div
                              className="group flex items-center justify-between bg-gray-100 mt-2 mb-2 rounded-md p-3 text-sm ml-12"
                              onMouseLeave={() => setShowOptions(null)}
                            >
                              <>
                                <div className="whitespace-pre-wrap break-words max-w-[16rem] md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
                                  <span className="text-blue-500 cursor-pointer">
                                    @{comment.user.name}
                                  </span>
                                  : <span>{response.description}</span>
                                </div>
                              </>

                              <>
                                {user && user?.id === response.user?.id && (
                                  <div
                                    onClick={() =>
                                      handleEllipsisClick(response.id || "")
                                    }
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative"
                                  >
                                    <Ellipsis className="h-5 w-5 text-slate-900 cursor-pointer" />
                                    {showOptions === response.id && (
                                      <div
                                        ref={optionRef}
                                        className="absolute z-[9999] bg-white shadow-lg rounded-md max-w-xs p-2 right-0"
                                      >
                                        <div className="flex flex-col space-y-1">
                                          <button
                                            disabled={loading}
                                            onClick={() =>
                                              handleResponseEditClick(
                                                comment.id,
                                                response.id || ""
                                              )
                                            }
                                            className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1 whitespace-nowrap"
                                          >
                                            <Pencil className="w-5 h-5" />{" "}
                                            {t("action.edit")}
                                          </button>
                                          <button
                                            disabled={loading}
                                            onClick={() => {
                                              setCommentResponseIdToDelete({
                                                commentId: comment.id,
                                                id: response.id || "",
                                              });
                                              setCommentNameToDelete(
                                                response.description
                                              );
                                              setOpenCommentResponse(true);
                                            }}
                                            className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1"
                                          >
                                            <Trash2 className="w-5 h-5" />{" "}
                                            {t("action.delete")}
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
                        {response.commentId === comment.id && (
                          <li key={responseIndex} className="w-[90%] mx-auto">
                            <div
                              ref={textareaResponseRef}
                              className={`flex justify-end items-center relative ${
                                response?.user?.stream?.isLive
                                  ? "mr-6 mt-6 mb-8"
                                  : ""
                              }`}
                            >
                              <div className="absolute left-0 text-sm font-bold text-gray-800 text-opacity-60">
                                {formatDistanceToNowStrict(
                                  new Date(response.createdAt || new Date()),
                                  {
                                    locale:
                                      locales[
                                        languageToUse as keyof typeof locales
                                      ],
                                    addSuffix: true,
                                  }
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
                                    response?.user?.stream?.isLive
                                      ? `/live/${response?.user?.nameuser}`
                                      : `/user/${response?.user?.nameuser}`
                                  }`}
                                >
                                  <div
                                    className={`text-end font-bold text-gray-600 whitespace-nowrap line-clamp-1 ${
                                      response?.user?.stream?.isLive
                                        ? "mr-8"
                                        : ""
                                    }`}
                                  >
                                    <p className="md:hidden">
                                      {truncateName(response?.user?.name, 10)}
                                    </p>
                                    <p className="hidden md:block">
                                      {response?.user?.name}
                                    </p>
                                  </div>
                                </Link>
                                {response.changeReview ? (
                                  <span
                                    className={`text-sm text-gray-400 line-clamp-1 items-center font-normal whitespace-nowrap ${
                                      response?.user?.stream?.isLive
                                        ? "mr-10"
                                        : ""
                                    }`}
                                  >
                                    {(response.totalchange ?? 0) === 0
                                      ? ""
                                      : `(${t("comment.editedTimes", {
                                          totalChange: response.totalchange,
                                        })})`}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                              <>
                                <CircleAvatar
                                  srcAvatar={
                                    response?.user?.imageCredential[0]?.url ||
                                    response?.user.image
                                  }
                                  role={response?.user?.role}
                                  isCitizen={response?.user?.isCitizen}
                                  srcFrame={response?.user?.frameAvatar}
                                  isLive={response?.user?.stream?.isLive}
                                  nameuser={response?.user?.nameuser}
                                  classAvatar="z-10"
                                />
                              </>
                            </div>
                            <div
                              className=" group flex items-center justify-between bg-gray-100 mt-2 mb-2 rounded-md p-3 text-sm"
                              onMouseLeave={() => setShowOptions(null)}
                            >
                              <>
                                <div className="whitespace-pre-wrap break-words max-w-[16rem] md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
                                  <span className="text-blue-500 cursor-pointer">
                                    @{comment.user.name}
                                  </span>
                                  : <span>{response.description}</span>
                                </div>
                              </>

                              <>
                                {user && user?.id === response.user?.id && (
                                  <div
                                    onClick={() =>
                                      handleEllipsisClick(response.id || "")
                                    }
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative"
                                  >
                                    <Ellipsis className="h-5 w-5 text-slate-900 cursor-pointer" />
                                    {showOptions === response.id && (
                                      <div
                                        ref={optionRef}
                                        className="absolute z-[9999] bg-white shadow-lg rounded-md max-w-xs p-2 right-0"
                                      >
                                        <div className="flex flex-col space-y-1">
                                          <button
                                            disabled={loading}
                                            onClick={() =>
                                              handleResponseEditClick(
                                                comment.id,
                                                response.id || ""
                                              )
                                            }
                                            className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1 whitespace-nowrap"
                                          >
                                            <Pencil className="w-5 h-5" />{" "}
                                            {t("action.edit")}
                                          </button>
                                          <button
                                            disabled={loading}
                                            onClick={() => {
                                              setCommentResponseIdToDelete({
                                                commentId: comment.id,
                                                id: response.id || "",
                                              });
                                              setCommentNameToDelete(
                                                response.description
                                              );
                                              setOpenCommentResponse(true);
                                            }}
                                            className="text-gray-900 hover:text-opacity-60 hover:text-gray-800 hover:bg-gray-500 hover:bg-opacity-10 rounded-md p-2 text-base font-semibold flex items-center gap-1"
                                          >
                                            <Trash2 className="w-5 h-5" />{" "}
                                            {t("action.delete")}
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
    </>
  );
};

export default ShowResponse;
