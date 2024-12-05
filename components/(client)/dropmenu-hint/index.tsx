"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info, SquarePen, X } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetOverlay,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import * as z from "zod";
import SocialHint from "./social/socialHint";
import FeedBack from "./feedback/feedBack";
import ChatGemini from "./AI/gemini";
import EmotionFeedBack from "./feedback/emotion-feedback";
import CategoryFeedBack from "./feedback/category-feedback";
import { ChatMessage } from "@/types/type";
import { useCurrentUser } from "@/hooks/use-current-user";
import ImageCellOne from "@/components/image-cell-one";
import { useParams } from "next/navigation";
import Translation from "./translate/translation";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  getLanguageToastSuccess,
  getMessageTranslate,
  getReloadPageDropMenuHint,
  getTitleTranslate,
  getToastError,
  translateFeedback,
  translateFeedbackContent,
  translateHelloVLXDXuanTruongAI,
  translateInformation,
  translateLeaveFeedbackBelow,
  translateLoading,
  translateMaxCharacters,
  translateMinCharacters,
  translateMyVirtualAssistantWillHelpYou,
  translateNewChat,
  translatePleaseFillYourAnswer,
  translateRequired,
  translateSelectExperienceFeedback,
  translateSelectFeedbackCategory,
  translateSubmit,
  translateThankYouForFeedback,
  translateUpdatingFeedback,
} from "@/translate/translate-client";
import { PolicyViolationModal } from "../modal/policy-violation-modal";
import { offensiveWords } from "@/vn_offensive_words";

export default function DropMenuHint() {
  const user = useCurrentUser();
  const param = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReloadm, setIsOpenReload] = useState(false);
  const [isAISheetOpen, setIsAISheetOpen] = useState(false); // State for AI Assistant Sheet
  const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false); // State for Feedback Sheet
  const [errorEmotion, setErrorEmotion] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [indexEmotion, setIndexEmotion] = useState<number | null>(null);
  const [indexCategory, setIndexCategory] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loadingLanguage, setLoadingLanguage] = useState(false);
  const [language, setLanguage] = useState("vi");
  const [isOpenConfirmLanguage, setIsConfirmLanguage] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  const [userInputAI, setUserInputAI] = useState<string>("");

  const [content, setContent] = useState("");
  const [policiViolationModal, setPoliciViolationModal] = useState(false);


  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const toastErrorMessage = getToastError(languageToUse);
  const updatingFeedBackMessage = translateUpdatingFeedback(languageToUse);
  const infomationMessage = translateInformation(languageToUse);
  const helloVLXDXuanTruongAIMessage =
    translateHelloVLXDXuanTruongAI(languageToUse);
  const myVirtualAssistantWillHelpYouMessage =
    translateMyVirtualAssistantWillHelpYou(languageToUse);
  const newChatMessage = translateNewChat(languageToUse);
  const feedBackMessage = translateFeedback(languageToUse);
  const feedBackContentMessage = translateFeedbackContent(languageToUse);
  const requiredMessage = translateRequired(languageToUse);
  const selectExperienceFeedBackMessage =
    translateSelectExperienceFeedback(languageToUse);
  const selectFeedbackCategoryMessage =
    translateSelectFeedbackCategory(languageToUse);
  const leaveFeedbackBelowMessage = translateLeaveFeedbackBelow(languageToUse);
  const pleaseFillYourAnswerMessage =
    translatePleaseFillYourAnswer(languageToUse);
  const submitMessage = translateSubmit(languageToUse);
  const loadingMessage = translateLoading(languageToUse);
  const minCharactersMessage = translateMinCharacters(languageToUse, 4);
  const maxCharacterMessage = translateMaxCharacters(languageToUse, 250);
  const reloadPageDropMenuHintMessage =
    getReloadPageDropMenuHint(languageToUse);

  const feedbackDate = user?.feedbackTimeNextResonse
    ? new Date(user.feedbackTimeNextResonse)
    : undefined;
  const now = new Date();

  const compareTime =
    feedbackDate === undefined || now.getTime() > feedbackDate.getTime();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 299);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const newChat = () => {
    setChatHistory([]);
  };

  const formSchema = z.object({
    content: z
      .string()
      .min(4, { message: minCharactersMessage })
      .max(250, { message: maxCharacterMessage }),
  });

  type FeedBackFormValues = z.infer<typeof formSchema>;

  const form = useForm<FeedBackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: FeedBackFormValues) => {
    //Check xúc phạm
    setContent(data.content);
    const containsOffensiveWord = offensiveWords.some((word) =>
      data.content.includes(word)
    );
    if (containsOffensiveWord) {
      setPoliciViolationModal(true); 
      return; 
    }

    try {
      if (indexEmotion === null) {
        setErrorEmotion(true);
      }
      if (indexCategory === null) {
        setErrorCategory(true);
        return;
      }

      setLoading(true);
      const promise = axios.post(`/api/${param.storeId}/feedback`, {
        userId: user?.id,
        content: data.content,
        emotion: indexEmotion,
        category: indexCategory,
      });

      await toast.promise(
        promise.then((response) => {
          return (
            <p>
              {translateThankYouForFeedback(
                languageToUse,
                response.data.user.email
              )}
            </p>
          );
        }),
        {
          loading: updatingFeedBackMessage,
          success: (message) => {
            setIndexEmotion(null);
            setIndexCategory(null);
            setIsFeedbackSheetOpen(false);
            form.reset();
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
              return toastErrorMessage;
            }
          },
        }
      );
    } catch (error) {
      toast.error(toastErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onCreatlanguage = async () => {
    setLoadingLanguage(true);
    try {
      // Lấy thông báo từ getLanguageToastSuccess
      const toastMessage = getLanguageToastSuccess(language);

      let apiResponse;

      if (user?.role !== "GUEST" && user?.id) {
        // Nếu có user, gọi API
        apiResponse = await axios.post("/api/translation", {
          language: language,
        });

        // Kiểm tra nếu API trả về dữ liệu thành công
        if (apiResponse?.data?.success) {
          toast.success(toastMessage);

          // Thực hiện setIsConfirmLanguage và setLoadingLanguage trước
          setIsConfirmLanguage(false);
          setLoadingLanguage(false);

          // Nếu thành công, gọi setTimeout để mở trạng thái reload sau 3s
          setTimeout(() => {
            setIsOpenReload(true);
          }, 3000);
        }
      } else {
        // Nếu không có user, lưu vào localStorage
        localStorage.setItem("language", language);
        toast.success(toastMessage);

        // Thực hiện setIsConfirmLanguage và setLoadingLanguage trước
        setIsConfirmLanguage(false);
        setLoadingLanguage(false);

        // Nếu thành công, gọi setTimeout để mở trạng thái reload sau 3s
        setTimeout(() => {
          setIsOpenReload(true);
        }, 3000); // 3000ms = 3s
      }
    } catch (error) {
      // Lấy thông báo từ getLanguageToastError
      toast.error(toastErrorMessage);

      // Dù có lỗi hay không, vẫn đảm bảo set loading thành false
      setIsConfirmLanguage(false);
      setLoadingLanguage(false);
    }
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  //Bỏ pointer-event:none khi không có isAISheetOpen
  useEffect(() => {
    if (!isAISheetOpen) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [isAISheetOpen]);

  //Bỏ pointer-event:none khi không có isFeedbackSheetOpen
  useEffect(() => {
    if (!isFeedbackSheetOpen) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [isFeedbackSheetOpen]);

  //Bỏ pointer-event:none khi không có isOpenConfirmLanguage
  useEffect(() => {
    if (!isOpenConfirmLanguage) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [isOpenConfirmLanguage]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AlertModal
        title={getTitleTranslate(language)}
        language={getMessageTranslate(language)}
        isOpen={isOpenConfirmLanguage}
        loading={loadingLanguage}
        onClose={() => setIsConfirmLanguage(false)}
        onConfirm={onCreatlanguage}
        languageToUse={languageToUse}
      />
      <AlertModal
        title={reloadPageDropMenuHintMessage.confirm}
        message={reloadPageDropMenuHintMessage.info}
        isOpen={isOpenReloadm}
        onClose={() => setIsOpenReload(false)}
        onConfirm={handleReloadPage}
        loading={loading}
        languageToUse={languageToUse}
      />
      <PolicyViolationModal
        isOpen={policiViolationModal}
        onClose={() => setPoliciViolationModal(false)}
        languageToUse={languageToUse}
        value={content || userInputAI}
        setUserInputAI={setUserInputAI}
      />
      <div>
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
          <DropdownMenuTrigger asChild className="z-[99999999]">
            <Button
              disabled={loading || loadingLanguage}
              variant="outline"
              className={`fixed right-4 ${
                isScrolled ? "bottom-32" : "bottom-28 md:bottom-8"
              } transition-all duration-300`}
            >
              <Hint label={infomationMessage}>
                {isOpen ? (
                  <X className="dark:text-white" />
                ) : (
                  <Info className="dark:text-white" />
                )}
              </Hint>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            className="relative min-w-0 overflow-visible bg-transparent shadow-none border-none"
          >
            <DropdownMenuItem className="top-[114px] -bottom-[62px] focus:outline-none focus:bg-transparent">
              <SocialHint
                loadingLanguage={loadingLanguage}
                loading={loading}
                languageToUse={languageToUse}
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${
                user?.role !== "GUEST" && user?.id
                  ? "-bottom-[62px] right-[62px] focus:outline-none focus:bg-transparent"
                  : "-bottom-[55px] right-[62px] focus:outline-none focus:bg-transparent"
              }`}
            >
              <Translation
                setLanguage={setLanguage}
                setIsConfirmLanguage={setIsConfirmLanguage}
                loadingLanguage={loadingLanguage}
                loading={loading}
                languageToUse={languageToUse}
              />
            </DropdownMenuItem>
            {user?.role !== "GUEST" && user?.id && (
              <DropdownMenuItem className="-bottom-[55px] right-[62px] focus:outline-none focus:bg-transparent">
                <FeedBack
                  setIsAISheetOpen={setIsAISheetOpen}
                  setIsFeedbackSheetOpen={setIsFeedbackSheetOpen}
                  compareTime={compareTime}
                  loadingLanguage={loadingLanguage}
                  loading={loading}
                  languageToUse={languageToUse}
                />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {user?.role !== "GUEST" && user?.id && (
          <>
            {/* AI Assistant Sheet */}
            <Sheet
              open={isAISheetOpen}
              onOpenChange={(open) => setIsAISheetOpen(open)}
            >
              <SheetOverlay className="z-[999998]" />
              <SheetContent side="bottom" className="h-5/6 z-[999999]">
                <div className="max-w-7xl mx-auto shadow-lg flex items-center justify-between p-2 rounded-md">
                  <div className="flex item-center space-x-2">
                    <ImageCellOne
                      imageUrl="/images/avatar-AI.png"
                      createdAt={""}
                      email={""}
                      isClient={true}
                      customClassFeedBack="z-[9999999]"
                      languageToUse={languageToUse}
                    />
                    <div>
                      <SheetTitle>{helloVLXDXuanTruongAIMessage}</SheetTitle>
                      <SheetDescription>
                        {myVirtualAssistantWillHelpYouMessage}
                      </SheetDescription>
                    </div>
                  </div>
                  <Hint label={newChatMessage}>
                    <Button variant="secondary" size="icon" onClick={newChat}>
                      <SquarePen />
                    </Button>
                  </Hint>
                </div>
                {/* Add any additional content for the AI Sheet */}
                <ChatGemini
                  setChatHistory={setChatHistory}
                  chatHistory={chatHistory}
                  languageToUse={languageToUse}
                  setUserInputAI={setUserInputAI}
                  userInputAI={userInputAI}
                  setPoliciViolationModal={setPoliciViolationModal}
                />
              </SheetContent>
            </Sheet>

            {/* Feedback Sheet */}
            {compareTime && (
              <Sheet
                open={isFeedbackSheetOpen}
                onOpenChange={setIsFeedbackSheetOpen}
              >
                <SheetOverlay className="z-[999998]" />
                <SheetContent className="z-[999999]">
                  <SheetHeader>
                    <SheetTitle>{feedBackMessage}</SheetTitle>
                    <SheetDescription>
                      {feedBackContentMessage}
                    </SheetDescription>
                  </SheetHeader>
                  {/* Add any additional content for the Feedback Sheet */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-sm">
                        {selectExperienceFeedBackMessage}
                      </span>
                      <Hint label={requiredMessage}>
                        <span className="text-red-600">(*)</span>
                      </Hint>
                      <EmotionFeedBack
                        setIndexEmotion={setIndexEmotion}
                        indexEmotion={indexEmotion}
                        setErrorEmotion={setErrorEmotion}
                        errorEmotion={errorEmotion}
                        languageToUse={languageToUse}
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm">
                        {selectFeedbackCategoryMessage}
                      </span>
                      <Hint label={requiredMessage}>
                        <span className="text-red-600">(*)</span>
                      </Hint>
                      <CategoryFeedBack
                        setIndexCategory={setIndexCategory}
                        indexCategory={indexCategory}
                        setErrorCategory={setErrorCategory}
                        errorCategory={errorCategory}
                        languageToUse={languageToUse}
                      />
                    </div>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                      >
                        <div>
                          <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  <span className="text-sm">
                                    {leaveFeedbackBelowMessage}
                                  </span>
                                  <Hint label={requiredMessage}>
                                    <span className="text-red-600">(*)</span>
                                  </Hint>
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    disabled={loading}
                                    placeholder={pleaseFillYourAnswerMessage}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button
                          disabled={loading}
                          className="ml-auto"
                          type="submit"
                        >
                          {loading ? loadingMessage : submitMessage}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </>
        )}
      </div>
    </>
  );
}
