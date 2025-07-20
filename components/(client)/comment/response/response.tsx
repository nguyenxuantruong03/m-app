import { Comment, User } from "@/types/type";

import { useRef } from "react";

import ShowResponseForm from "./showResponseForm";
import ShowResponse from "./showResponse";

interface CommentResponseProps {
  comment: Comment;
  showResponseComments: string | null;
  user: any;
  responseDescriptions: string;
  setPoliciViolationModal: React.Dispatch<React.SetStateAction<boolean>>;
  savedComments: Comment[];
  setErrorResponse: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  data: string;
  setSavedComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setShowResponseForm: React.Dispatch<React.SetStateAction<string | null>>;
  setResponseDescriptions: React.Dispatch<React.SetStateAction<string>>;
  setEditingResponseId: React.Dispatch<React.SetStateAction<string | null>>;
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
  editingResponseId: string | null;
  setShowOptions: React.Dispatch<React.SetStateAction<string | null>>;
  handleEllipsisClick: (commentId: string | null) => void;
  showOptions: string | null;
  optionRef: React.RefObject<HTMLDivElement>;
  loading?: boolean;
  setCommentResponseIdToDelete: React.Dispatch<
    React.SetStateAction<{ commentId: string | undefined; id: string }>
  >;
  setCommentNameToDelete: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setOpenCommentResponse: React.Dispatch<React.SetStateAction<boolean>>;
  showResponseForm?: string | null;
  errorResponse?: string;
}

const CommentResponse: React.FC<CommentResponseProps> = ({
  comment,
  showResponseComments,
  user,
  responseDescriptions,
  setPoliciViolationModal,
  savedComments,
  setErrorResponse,
  setLoading,
  data,
  setSavedComments,
  setShowResponseForm,
  setResponseDescriptions,
  setEditingResponseId,
  setAlertGuestModal,
  editingResponseId,
  setShowOptions,
  handleEllipsisClick,
  showOptions,
  optionRef,
  loading,
  setCommentResponseIdToDelete,
  setCommentNameToDelete,
  setOpenCommentResponse,
  showResponseForm,
  errorResponse,
}) => {
  const textareaResponseRef = useRef<HTMLDivElement>(null);
  const scrollPositionResponseRef = useRef<number | null>(null);

  return (
    <div>
      {comment.responses && comment.responses.length > 0 && (
        <>
          <ShowResponse
            user={user}
            comment={comment}
            loading={loading}
            setShowResponseForm={setShowResponseForm}
            setResponseDescriptions={setResponseDescriptions}
            setEditingResponseId={setEditingResponseId}
            savedComments={savedComments}
            setAlertGuestModal={setAlertGuestModal}
            scrollPositionResponseRef={scrollPositionResponseRef}
            textareaResponseRef={textareaResponseRef}
            showResponseComments={showResponseComments}
            setShowOptions={setShowOptions}
            handleEllipsisClick={handleEllipsisClick}
            showOptions={showOptions}
            optionRef={optionRef}
            setCommentResponseIdToDelete={setCommentResponseIdToDelete}
            setCommentNameToDelete={setCommentNameToDelete}
            setOpenCommentResponse={setOpenCommentResponse}
          />
        </>
      )}

      <ShowResponseForm
        user={user}
        showResponseForm={showResponseForm}
        comment={comment}
        loading={loading}
        errorResponse={errorResponse}
        responseDescriptions={responseDescriptions}
        editingResponseId={editingResponseId}
        setShowResponseForm={setShowResponseForm}
        setResponseDescriptions={setResponseDescriptions}
        setEditingResponseId={setEditingResponseId}
        setLoading={setLoading}
        setErrorResponse={setErrorResponse}
        setSavedComments={setSavedComments}
        savedComments={savedComments}
        setAlertGuestModal={setAlertGuestModal}
        setPoliciViolationModal={setPoliciViolationModal}
        scrollPositionResponseRef={scrollPositionResponseRef}
        textareaResponseRef={textareaResponseRef}
        data={data}
      />
    </div>
  );
};

export default CommentResponse;
